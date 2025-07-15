import Navbar from "../Components/Navbar";
import { comapnies } from "../pageData/DispatchData";
import { useRef, useState } from "react";
import { clientName } from "../pageData/DispatchData";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "../Components/Modal.jsx";

const Dispatch = ({ setIsLogedIn }) => {
  const [extractedFormData, setExtractedFormData] = useState({});
  const [extractedfilledProduct, setExtractedfilledProduct] = useState({});
  let data = {};
  let filledproduct = {};
  const form = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [companySelected, setCompanySelected] = useState("Vardaan");
  const [productsList, setProductsList] = useState(comapnies[0].products);
  const [loading, setLoading] = useState(false);

  function handleCompanySelection(e) {
    setCompanySelected(e.target.value);
    comapnies.forEach((company) => {
      if (company.name == e.target.value) {
        setProductsList(company.products);
      }
    });
  }

  function sendDataToSheet(){
    console.log(extractedFormData);
    console.log(extractedfilledProduct);
   setLoading(true);
      axios
        .post(
          "https://purchase-dispatch-excel.vercel.app/api/v1/sendDataToSheet/dispatch-sheet",
          {
            Date: new Date().toLocaleDateString("en-GB"),
            client: extractedFormData.client,
            company: extractedFormData.company,
            products: extractedfilledProduct,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          toast.success("Created Successfully");
          setLoading(false);
          setOpenModal(false);
          form.current.reset();
        })
        .catch((err) => {
          let errorMessage = "Something went wrong";
          if (err.status == 400 || err.status == 500) {
            errorMessage = err.response.data.message;
          }
          setLoading(false);
          toast.error(errorMessage);
        });
  }

  function handleFormSubmitButtonClick() {
    const formData = new FormData(form.current);
    data = Object.fromEntries(formData);
    for (const key in data) {
      if (key != "client" && key != "company") {
        if (data[key].length != 0) {
          filledproduct[key] = data[key];
        }
      }
    }
    if (data.client == "" || data.company == "") {
      toast.error("Client name or comapny name cant be empty");
    } else if (Object.keys(filledproduct).length == 0) {
      toast.error("Enter Atleast 1 Product");
    } else {
      setExtractedFormData(data);
      setExtractedfilledProduct(filledproduct);
      setOpenModal(true);
    }
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Navbar setIsLogedIn={setIsLogedIn} />
      <div className="grow custom-container py-6 flex items-center justify-center">
        <div className="flex w-full rounded-2xl overflow-hidden">
          <div className="none lg:w-2/5 bg-pink-400"></div>
          <form
            className="w-full lg:w-3/5 p-6 flex flex-col bg-slate-200 gap-6"
            ref={form}
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-center">
              Dispatch products
            </h1>
            <div className="flex flex-col ga-2">
              <label htmlFor="company">Select Company :-</label>
              <select
                onChange={handleCompanySelection}
                name="company"
                id="company selection"
                className="border outline-none px-2 py-2 rounded-md"
              >
                {comapnies.map((obj) => (
                  <option key={obj.name} value={obj.name}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Select Client :-</h1>
              <select
                name="client"
                id="company selection"
                className="border outline-none px-2 py-2 rounded-md"
              >
                {clientName.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <h1 className="text-xl sm:text-3xl font-semibold">
              Products of {companySelected} :-
            </h1>
            <div className="grid md:grid-cols-2 gap-4">
              {productsList.map((product) => (
                <div className="flex flex-col gap-2" key={product}>
                  <label htmlFor={product} className="uppercase">
                    {product}
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Quantity"
                    name={product}
                    className="border outline-none px-2 py-2 rounded-md"
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                  />
                </div>
              ))}
            </div>
            {/* <button
              type="submit"
              className={`rounded-2xl hover:scale-95 transition py-2 ${
                loading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-pink-400 text-white cursor-pointer shadow-[4px_3px_2px_black]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <p className="border-2 border-black w-fit mx-auto p-3 rounded-full border-t-0 border-l-0 animate-spin"></p>
              ) : (
                <p className="mx-auto">Dispatch</p>
              )}
            </button> */}
            <button
              type="button"
              onClick={() => {
                handleFormSubmitButtonClick();
              }}
              className="rounded-2xl hover:scale-95 transition py-2 bg-pink-400 text-white cursor-pointer shadow-[4px_3px_2px_black]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* for confirmation modal */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <div className="flex flex-col gap-4 text-center">
          <i className="fa-solid fa-check text-6xl text-green-600 mx-auto"></i>
          <h3 className="text-3xl font-bold">Confirm Dispatch</h3>
          <div className="text-left flex w-full flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Name:{" "}
              <span className="text-green-600">
                {extractedFormData?.client}
              </span>
            </h3>
            <h3 className="text-xl font-semibold">
              Company: <span className="text-green-600">{companySelected}</span>
            </h3>
          </div>
          <p className="text-left text-xl font-semibold">Products: </p>
          <div className="flex flex-col gap-2 max-h-[300px] overflow-auto text-left">
            {Object.entries(extractedfilledProduct).map(([key, value]) => (
              <p key={key} className="bg-slate-100 p-2 rounded-md">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
          <div className="w-full grid gap-4 grid-cols-2">
            <button
              className={`px-4 py-3 rounded-2xl transition flex items-center gap-2 justify-center ${
                loading
                  ? "text-black/50 bg-slate-200 cursor-not-allowed"
                  : "cursor-pointer hover:scale-95 text-white bg-red-600"
              }`}
              disabled={loading}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <p className="font-semibold -mt-1">Cancel</p>
              <i className="fa-solid fa-xmark text-lg" />
            </button>
            <button
              className={`px-4 py-3 rounded-2xl  transition flex items-center gap-2 justify-center ${
                loading
                  ? "text-black/50 bg-slate-200 cursor-not-allowed"
                  : "cursor-pointer hover:scale-95 text-white bg-green-600 "
              }`}
              disabled={loading}
              onClick={sendDataToSheet}
            >
              {loading ? (
                <p className="p-2 rounded-full border-2 border-t-0 border-l-0 animate-spin"></p>
              ) : (
                <>
                  <p className="font-semibold -mt-1">Save</p>
                  <i className="fa-solid fa-check text-lg" />
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dispatch;
