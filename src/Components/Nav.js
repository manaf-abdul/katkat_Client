import React, { useEffect, useState } from "react";
import "../style/Nav.css";
// import Logo from '../assets/logo.png'
import UserLogo from '../assets/user.webp'

const Nav = () => {
  const [show, handleShow] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      // window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        alt="Netflix Logo"
      />
      <img
        className="nav_avtar"
        src={UserLogo}
        alt="netflix logo Avtar"
      />
    </div>
  );
};

export default Nav;
