import signinStyle from "../pages/signin.css";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const signinHandler = useCallback(() => {
    const option = {
      method: "post",
      url: "https://pem-backend-1605.uc.r.appspot.com/user/login",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      data: {
        email,
        password,
      },
    };

    axios(option)
      .then(function (response) {
        const { token } = response.data;

        if (response.status === 200) {
          console.log(response.status);
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
        } else {
          console.log(response.data);
          setIsLoggedIn(false);
        }
        // console.log(response.data + "  " + isLoggedIn + response.status);
      })
      .catch((error) => {
        localStorage.setItem("token", "");

        setIsLoggedIn(false);

        //console.log(error + " " + isLoggedIn);
      });
  }, [email, password]);
  useEffect(() => {
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/text");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <h1 className="title">Privte English Mentor</h1>
      <form
        className="signIn"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign in</h2>
        <p style={{ textAlign: "center" }}>
          Enter your email and password to sign in
        </p>
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            className="input-text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
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
        <div>
          <button className="signin-btn" type="submit" onClick={signinHandler}>
            Sign in
          </button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <input type="checkbox" name="loggedin" />{" "}
          <label>Keep me logged in</label>
        </div>

        <p style={{ textAlign: "center" }}>
          Don't have an account?
          <button
            className="signup-link"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </button>{" "}
        </p>
      </form>
    </div>
  );
};
export default SigninScreen;
