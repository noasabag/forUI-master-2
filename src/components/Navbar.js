import { Outlet, useNavigate } from "react-router-dom";
import navbarStyle from "../pages/navbar.css";
import React from "react";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <h4>Privte English Mentor</h4>
        <div>
          <button
            className="btn"
            onClick={() => {
              navigate("text");
            }}
          >
            Display text
          </button>
          <button
            className="btn"
            onClick={() => {
              navigate("wordlist");
            }}
          >
            Dictionary Management
          </button>
          <button
            className="btn"
            onClick={() => {
              navigate("profile");
            }}
          >
            profile
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Navbar;
