import { NavLink } from "react-router-dom";
import NavbarAnimation from "./NavbarAnimation";

const Navbar = ({setIsLogedIn}) => {
  
  const logout = ()=>{
     setIsLogedIn(false);
     localStorage.clear();
  }

  return (
    <div className="w-full py-3 relative">
      <div className="custom-container flex gap-6 items-center justify-between">
        <h1 className="text-xl text-green-600 font-bold drop-shadow drop-shadow-black">
          Vardaan Farms
        </h1>
        <div className="gap-6 hidden md:flex">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold border-b-2" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/purchase"}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold border-b-2" : ""
            }
          >
            Purchase
          </NavLink>
          <NavLink
            to={"/dispatch"}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold border-b-2" : ""
            }
          >
            Dispatch
          </NavLink>
        </div>
        <button onClick={logout} className="bg-black text-white px-3 py-2 rounded-xl hover:scale-95 transition cursor-pointer hidden md:block">
          Logout
        </button>
        <div className="md:hidden cursor-pointer hover:scale-95 transition">
          <i className="text-3xl fa-solid fa-bars" id="hamburger"></i>
        </div>
      </div>

      {/* mobile nav */}
      <div
        id="mobilenav"
        className="-translate-x-full fixed bg-slate-100 min-w-[300px] max-w-[500px] w-4/5 left-0 top-0 min-h-screen overflow-auto p-6 flex flex-col gap-4 transition md:hidden"
      >
        <i
          className="fa-solid fa-cow text-2xl text-red-600 self-end hover:scale-90 transition cursor-pointer"
          id="closemobilenav"
        ></i>
        <div className="flex flex-col gap-6 grow">
          <NavLink to="/" className={({isActive})=>(isActive? 'text-green-600 font-semibold text-xl':'text-xl')}>Home</NavLink>
          <NavLink to="/purchase" className={({isActive})=>(isActive? 'text-green-600 font-semibold text-xl':'text-xl')}>Purchase</NavLink>
          <NavLink to="/dispatch" className={({isActive})=>(isActive? 'text-green-600 font-semibold text-xl':'text-xl')}>Dispatch</NavLink>
        </div>
        <button className="bg-red-600  py-2 hover:scale-90 cursor-pointer rounded-full font-semibold" onClick={logout}>Log Out</button>
      </div>
      <NavbarAnimation />
    </div>
  );
};

export default Navbar;
