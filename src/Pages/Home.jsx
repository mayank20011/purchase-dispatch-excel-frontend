import React from "react";
import Navbar from "../Components/Navbar";

const Home = ({setIsLogedIn}) => {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Navbar setIsLogedIn={setIsLogedIn}/>
      <div className="grow">

      </div>
    </div>
  );
};

export default Home;
