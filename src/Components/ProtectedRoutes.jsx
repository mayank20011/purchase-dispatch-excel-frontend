import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ()=>{
  return (
    localStorage.getItem('isLogedIn') == 'true' ? <Outlet/> : <Navigate to="/login"/>
  );
}

export default ProtectedRoutes;