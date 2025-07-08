import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { email } = useParams() || null;
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const otp = form.otp.value.trim();
    if (otp.length == 0) {
      toast.error("Enter OTP");
    } else if (email == null) {
      toast.error("Email is required");
    } else {
      setLoading(true);
      axios
        .post("https://purchase-dispatch-excel.vercel.app/api/v1/user/verify-otp", { email, otp })
        .then((res) => {
          setLoading(false);
          navigate(`/reset-password/${encodeURIComponent(email)}`);
          toast.success("OTP Verified");
        })
        .catch((err) => {
          let errorMessage = "Something Went Wrong";
          if (err.status == 400 || err.status == 404) {
            errorMessage = err.response.data.message;
          }
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }

  return email == null ? (
    <div>Can't access this Page Directly</div>
  ) : (
    <div className="min-h-screen bg-pink-400 flex items-center justify-center">
      <div className="custom-container text-center py-6 flex flex-col gap-8 ">
        <form
          className="mx-auto max-w-[600px] min-w-[300px] w-4/5 flex flex-col gap-4 py-6 px-4 bg-white rounded-sm shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold text-pink-600">Reset OTP</h1>
          <p>Enter the 4 digit otp, sent to you on your email</p>
          <input
            type="number"
            className="border outline-none border-slate-400 px-4 py-2 rounded-md"
            required
            placeholder="Enter Your Registered Mail ..."
            name="otp"
          />
          <Link
            to="/reset-password"
            className="text-left underline text-pink-400 w-fit"
          >
            Change Email?
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
              <p className="text-center mx-auto">Verify OTP</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
