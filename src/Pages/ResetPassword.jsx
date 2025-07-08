import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { email } = useParams() || null;
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    if (password == "" || confirmPassword == "") {
      toast.error("Password and confirm password both required");
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password is not matching");
    } else {
      setLoading(true);
      axios
        .post(`https://purchase-dispatch-excel.vercel.app/api/v1/user/reset-password`, {
          email,
          password,
        })
        .then((res) => {
          setLoading(false);
          toast.success("Password Reset Successfully");
          navigate("/login");
        })
        .catch((err) => {
          setLoading(false);
          let errorMessage = "Something Went Wrong";
          console.log(err);
          if (err.status == 400 || err.status == 404 || err.status == 500) {
            errorMessage = err.response.data.message;
          }
          toast.error(errorMessage);
        });
    }
  }

  return email == null ? (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-500">
      <h1 className="text-center text-white text-2xl text-semibold">
        Cant access this page
      </h1>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-pink-400 py-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="container max-w-[400px] bg-white p-6 shadow-2xl flex flex-col gap-4 rounded-2xl"
      >
        <h1 className="text-2xl font-semibold text-pink-400">
          Change Your Password
        </h1>
        <input
          type="password"
          className="border outline-none border-slate-400 px-4 py-2 rounded-md"
          required
          placeholder="Enter new Password ..."
          name="password"
        />
        <input
          type="password"
          className="border outline-none border-slate-400 px-4 py-2 rounded-md"
          required
          placeholder="Confirm New Password ..."
          name="confirmPassword"
        />
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
  );
};

export default ResetPassword;
