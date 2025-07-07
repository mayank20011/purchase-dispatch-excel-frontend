import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    setLoading(true);

    if (password.length < 6 || confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const dataToSend = { name, email, password };

    axios
      .post("http://localhost:5000/api/v1/user/signup", dataToSend)
      .then((res) => {
        toast.success("Account created successfully!");
        setLoading(false);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        let errMessage = "Something went wrong";
        if (err.status == 409 || err.status == 400 || err.status == 403) {
          errMessage = err.response.data.message;
        }
        toast.error(errMessage);
        setLoading(false);
      });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-300"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-pink-300"></div>
      <div className="border z-2 border-slate-100 w-9/10 sm:w-4/5 md:w-4/5 lg:w-7/10 p-6 md:p-12 bg-white shadow-2xl flex gap-12 items-center justify-between">
        <img
          src="./signup-img.webp"
          alt="Cartoon Cow Grazing"
          className="aspect-[16/9] w-1/2 hidden md:block"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <h1 className="text-center font-bold text-pink-500 text-2xl">
            <span className="text-6xl">C</span>reate Your Account Now
          </h1>
          <p className="text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repudiandae, voluptas.
          </p>
          <div className="flex flex-col gap-4">
            <div className="bg-white border-b-1 border-slate-400 flex gap-2 p-4 items-center">
              <i className="fa-solid fa-user text-slate-400 text-lg"></i>
              <input
                type="text"
                placeholder="Enter Full Name ..."
                className="outline-none grow"
                name="name"
                required
              />
            </div>
            <div className="bg-white border-b-1 border-slate-400 flex gap-2 p-4 items-center">
              <i className="fa-solid fa-envelope text-slate-400 text-lg"></i>
              <input
                type="email"
                placeholder="Enter Email ..."
                className="outline-none grow"
                name="email"
                required
              />
            </div>
            <div className="bg-white border-b-1 border-slate-400 flex gap-2 p-4 items-center">
              <i className="fa-solid fa-lock text-slate-400 text-lg"></i>
              <input
                type="password"
                placeholder="Enter Password ..."
                className="outline-none grow"
                name="password"
                required
              />
            </div>
            <div className="bg-white border-b-1 border-slate-400 flex gap-2 p-4 items-center">
              <i className="fa-solid fa-lock text-slate-400 text-lg"></i>
              <input
                type="password"
                placeholder="Confirm Password ..."
                className="outline-none grow"
                name="confirmPassword"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`group w-fit px-6 py-2 bg-pink-500 text-white font-semibold rounded-full mx-auto flex gap-2 items-center shadow-[3px_3px_2px_black] hover:scale-95 transition ${
              loading ? "opacity-[50%] cursor-not-allowed" : "cursor-pointer "
            }`}
          >
            {loading ? (
              <span className="mx-6 p-2 rounded-full border-2 border-black border-t-0 border-l-0 animate-spin"></span>
            ) : (
              <>
                <span className="">SignUp</span>
                <i className="fa-solid fa-arrow-right group-hover:rotate-[-45deg] transition"></i>
              </>
            )}
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 cursor-pointer font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
