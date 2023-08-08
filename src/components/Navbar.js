import { Outlet, useNavigate } from "react-router-dom";
import navbarStyle from "../pages/navbar.css";
import React from "react";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const option = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/user/logout`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const logout = () => {
    axios(option)
      .then(() => {
        localStorage.removeItem("token");
        navigate("signin");
      })
      .catch((e) => {
        console.log("error accrued" + e);
      });
  };
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
          <button className="btn" onClick={logout}>
            logout
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Navbar;
