import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setconfirmpasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleconfirmPassword = () => {
    setconfirmpasswordShown(!confirmpasswordShown);
  };
  const option = {
    method: "post",
    url: "https://pem-backend-1605.uc.r.appspot.com/user/newUser",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    data: {
      email,
      password,
      firstname: firstName,
      lastname: surname,
      confirmpassword: confirmPassword,
    },
  };
  const onsubmitHandler = (e) => {
    e.preventDefault();

    axios(option)
      .then((response) => {
        console.log(response.status);
        navigate("/text");
        localStorage.setItem("token", response.data.token);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <h1 className="title">Privte English Mentor</h1>
      <form
        className="signIn"
        onSubmit={(e) => {
          onsubmitHandler(e);
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create An Account</h2>
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <button
            className="signin-link"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign in
          </button>{" "}
        </p>
        <div>
          {" "}
          <label>First Name</label>{" "}
        </div>
        <div>
          <input
            className="input-text"
            placeholder="Enter your first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label> Surname</label>
        </div>

        <div>
          <input
            className="input-text"
            placeholder="Enter your surname"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label>Email</label>
        </div>

        <div>
          <input
            className="input-text"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <label>Password</label>
        </div>
        <div>
          <input
            className="input-text"
            id="password"
            type={passwordShown ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
          />
          <input
            id="toggle-password"
            type="checkbox"
            onClick={togglePassword}
          />
          <label htmlFor="toggle-password">Show Password</label> <br />
        </div>
        {/* ********** */}
        <div>
          <label>Confirm Password</label>
        </div>
        <div>
          <input
            className="input-text"
            id="password"
            type={confirmpasswordShown ? "text" : "password"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm your password"
          />
          <input
            id="toggle-confirm-password"
            type="checkbox"
            onClick={toggleconfirmPassword}
          />
          <label htmlFor="toggle-confirm-password">
            Show Confirmed Password
          </label>
          <br />
        </div>

        <div>
          <button className="signup-btn" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
