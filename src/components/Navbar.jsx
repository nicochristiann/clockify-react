import React from "react";
import logo from "../assets/Clockify/Logo.png";
import { NavLink } from "react-router";

const Navbar = () => {
  const linkStyle = "text-white flex text-lg font-thin cursor-pointer";
  return (
    <>
      <nav className="bg-[#25367B]">
        <div className="flex justify-between items-center px-[12vw] py-9">
          <NavLink className="flex-none items-center mr-4" to="/">
            <img className="h-9 w-60" src={logo} alt="React Jobs" />
          </NavLink>
          <div>
            <div className="flex gap-[10vw]">
              <NavLink to="/timer" className={linkStyle}>
                TIMER
              </NavLink>
              <NavLink to="/activity" className={linkStyle}>
                ACTIVITY
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
