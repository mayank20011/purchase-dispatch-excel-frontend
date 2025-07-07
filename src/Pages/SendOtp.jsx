import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SendOtp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    if (!email) {
      toast.error("Enter Email First");
      return;
    }
    setLoading(true);
    axios
      .post(`http://localhost:5000/api/v1/user/send-otp`, { email })
      .then(() => {
        setLoading(false);
        toast.success("OTP sent successfully");
        navigate(`/verify-otp/${encodeURIComponent(email)}`)
      })
      .catch((err) => {
        let errorMessage = "Something Went Wrong";
        console.log(err);
        setLoading(false);
        if(err.status == 404){
          errorMessage = err.response.data.message
        }
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-screen bg-pink-400 flex items-center justify-center">
      <div className="custom-container text-center py-6 flex flex-col gap-8 ">
        <h1 className="text-3xl sm:text-5xl font-[800] text-white">
          Reset Password Form
        </h1>
        <form
          className="mx-auto max-w-[600px] min-w-[300px] w-4/5 flex flex-col gap-4 py-6 px-4 bg-white rounded-sm shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold text-pink-600">
            Forget Password
          </h1>
          <p>
            Enter Your Email and we will Send you otp to your registered emain for reseting password         
          </p>
          <input
            type="email"
            className="border outline-none border-slate-400 px-4 py-2 rounded-md"
            required
            placeholder="Enter Your Registered Mail ..."
            name="email"
          />
          <Link to="/login" className="text-left underline text-pink-400 w-fit">
            Back To Login?
          </Link>
          <button
            className={`bg-pink-400 px-4 py-2 text-white rounded-md hover:scale-95 transition shadow-[3px_3px_2px_black] ${
              loading ? "cursor-not-allowed bg-slate-300" : "cursor-pointer"
            }`}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <p className="mx-auto p-3 h-fit w-fit border border-black rounded-full border-t-0 border-l-0 animate-spin"></p>
            ) : (
              <p className="text-center mx-auto">Send OTP</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendOtp;
