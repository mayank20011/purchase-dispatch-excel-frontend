import Navbar from "../Components/Navbar";
import { comapnies } from "../pageData/DispatchData";
import { useState } from "react";
import { clientName } from "../pageData/DispatchData";
import { toast } from "react-toastify";
import axios from "axios";

const Dispatch = ({ setIsLogedIn }) => {
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

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let filledproduct = {};
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
      setLoading(true);
      axios
        .post(
          "https://purchase-dispatch-excel.vercel.app/api/v1/sendDataToSheet/dispatch-sheet",
          {
            Date: new Date().toLocaleDateString("en-GB"),
            client: data.client,
            company: data.company,
            products: filledproduct,
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
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Navbar setIsLogedIn={setIsLogedIn} />
      <div className="grow custom-container py-6 flex items-center justify-center">
        <div className="flex w-full rounded-2xl overflow-hidden">
          <div className="none lg:w-2/5 bg-pink-400"></div>
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-3/5 p-6 flex flex-col bg-slate-200 gap-6"
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
                    onWheel={(e)=>{e.target.blur()}}
                  />
                </div>
              ))}
            </div>
            <button
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
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
