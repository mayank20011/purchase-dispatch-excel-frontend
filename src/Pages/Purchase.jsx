import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import { purchasingFrom } from "../pageData/PurchaseData";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

const Purchase = ({ setIsLogedIn }) => {
  const form = useRef();
  const [formDataToSend, setFormDataToSend] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fat, setFat] = useState("");
  const [clr, setClr] = useState("");
  const [snf, setSnf] = useState(0);
  const calculateSNF = () => {
    const snfValue = clr / 4 + fat * 0.2 + 0.66;
    setSnf(snfValue);
  };

  useEffect(() => {
    calculateSNF();
  }, [fat, clr]);

  const handleSubmit = () => {
    const formData = new FormData(form.current);
    if (
      formData.get("purchasingFrom") == "" ||
      formData.get("volume") == 0 ||
      fat == 0 ||
      snf == 0 ||
      clr == 0
    ) {
      toast.error("All Fields are required");
    } else {
      const data = {
        Date: new Date().toLocaleDateString("en-GB"),
        Volume: formData.get("volume"),
        FAT: fat,
        SNF: snf,
        CLR: clr,
        sheet: formData.get("purchasingFrom"),
      };
      setFormDataToSend(data);
      setOpenModal(true);
    }
  };

  const sendDataToSheet = () => {
    setLoading(true);
    axios
      .post(
        "https://purchase-dispatch-excel.vercel.app/api/v1/sendDataToSheet",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setOpenModal(false);
        setFormDataToSend({});
        toast.success("Data Saved Successfully");
        form.current.reset();
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "Something went wrong";
        if (err.status == 400 || err.status == 500 || err.status == 403) {
          errorMessage = err.response.data.message;
          if (err.status == 403) {
            localStorage.clear();
            navigate("/login");
          }
        }
        setLoading(false);
        toast.error(errorMessage);
      });
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Navbar setIsLogedIn={setIsLogedIn} />
      <div className="grow container mx-auto flex items-center justify-center">
        {/* pasting here */}
        <form
          className="max-w-[500px] min-w-[300px] w-4/5 p-6 border rounded-2xl flex flex-col gap-4"
          onSubmit={handleSubmit}
          ref={form}
        >
          <h1 className="text-2xl font-semibold  text-center">
            Purchasing Form
          </h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="purchasingFrom">Purchasing From</label>
            <select
              name="purchasingFrom"
              id="listOfVendors"
              className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
              required
            >
              {purchasingFrom.map((user) => (
                <option value={user.name} key={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="volume">Enter Milk Volume (ltrs):</label>
            <input
              name="volume"
              type="number"
              min="0"
              step="any"
              placeholder="Enter Volume of Milk You are Purchasing ..."
              className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fat">Enter Fat (%) :</label>
            <input
              name="fat"
              type="number"
              min="0"
              max="10"
              step="any"
              placeholder="Fat Percent in milk is  ..."
              className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
              required
              value={fat}
              onChange={(e) => {
                setFat(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="clr">Enter CLR Value :</label>
            <input
              name="clr"
              type="number"
              min="0"
              step="any"
              placeholder="What is the CLR value of milk ..."
              className="bg-slate-200 p-2 px-4 rounded-sm outline-none"
              required
              value={clr}
              onChange={(e) => {
                setClr(e.target.value);
              }}
            />
          </div>
          <p>
            {`SNF Value is: `}{" "}
            <span className="p-2 bg-red-600 px-4 font-semibold rounded-lg">
              {snf}
            </span>
          </p>
          <button
            type="button"
            className="px-4 py-2  text-white rounded-2xl hover:scale-95 transition font-semibold bg bg-orange-600 cursor-pointer"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
          {/* <button
            type="submit"
            className={`px-4 py-2  text-white rounded-2xl hover:scale-95 transition font-semibold ${
              loading
                ? "bg-slate-200 cursor-not-allowed"
                : "bg-orange-400 cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? (
              <p className="p-3 w-fit border-2 mx-auto rounded-full border-black border-t-0 border-l-0 animate-spin"></p>
            ) : (
              <p>Submit</p>
            )}
          </button> */}
        </form>
      </div>
      {/* for modal */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <div className="flex flex-col gap-2">
          <i className="fa-solid fa-cart-shopping text-6xl text-center text-green-600"></i>
          <h1 className="text-2xl font-bold text-center">Confirm Purchase</h1>
          <h2 className="text-lg">
            Name: <span className="text-green-600">{formDataToSend.sheet}</span>
          </h2>
          <h2 className="text-lg">
            Milk Volume:{" "}
            <span className="text-green-600">{formDataToSend.Volume}</span>
          </h2>
          <h2 className="text-lg">
            Fat: <span className="text-green-600">{formDataToSend.FAT}</span>
          </h2>
          <h2 className="text-lg">
            SNF: <span className="text-green-600">{formDataToSend.SNF}</span>
          </h2>
          <h2 className="text-lg">
            CLR: <span className="text-green-600">{formDataToSend.CLR}</span>
          </h2>
          <div className="flex gap-4">
            <button
              className={`w-1/2 px-4 py-2 rounded-2xl ${
                loading
                  ? "bg-slate-200 text-black/50 cursor-not-allowed"
                  : "bg-red-600 text-white cursor-pointer hover:scale-95 transition"
              }`}
              disabled={loading}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className={`w-1/2 px-4 py-2 rounded-2xl ${
                loading
                  ? "bg-slate-200 text-black/50 cursor-not-allowed"
                  : "bg-green-600 text-white cursor-pointer hover:scale-95 transition"
              }`}
              disabled={loading}
              onClick={() => {
                sendDataToSheet();
              }}
            >
              {loading ? (
                <p className="p-2 border-2 w-fit mx-auto rounded-full border-t-0 border-l-0 animate-spin"></p>
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Purchase;
