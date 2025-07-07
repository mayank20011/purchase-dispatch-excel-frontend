import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { useState } from "react";
import Purchase from "./Pages/Purchase";
import Dispatch from "./Pages/Dispatch";
import SendOtp from "./Pages/SendOtp";
import VerifyOTP from "./Pages/VerifyOTP";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem("isLogedIn"));
  localStorage.setItem("isLogedIn", isLogedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home setIsLogedIn={setIsLogedIn} />} />
          <Route
            path="/purchase"
            element={<Purchase setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/dispatch"
            element={<Dispatch setIsLogedIn={setIsLogedIn} />}
          />
        </Route>
        <Route path="/login" element={<Login setIsLogedIn={setIsLogedIn} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/Send-otp" element={<SendOtp />} />
        <Route path="/verify-otp/:email" element={<VerifyOTP/>} />
        <Route path="/reset-password/:email" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
