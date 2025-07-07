import { useEffect } from "react";

const NavbarAnimation = () => {
  useEffect(()=>{
    const ham = document.querySelector("#hamburger");
    const mobileNav = document.querySelector("#mobilenav");
    const closeMobileNav = document.querySelector("#closemobilenav");
    ham.addEventListener("click",()=>{
      mobileNav.classList.remove("-translate-x-full");
    });
    closeMobileNav.addEventListener("click",()=>{
      mobileNav.classList.add("-translate-x-full");
    })
  },[])
  return null;
};

export default NavbarAnimation;
