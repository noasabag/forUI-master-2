import { stripBasename } from "@remix-run/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [Authorization, setAuthorization] = useState("");
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(children);
  useEffect(() => {
    if (token !== null) {
      setAuthorization(token);
      console.log(Authorization);
    }
  }, []);

  useEffect(() => {
    var myHeaders = new Headers();
    console.log(Authorization);

    myHeaders.append("Authorization", Authorization);
    console.log(myHeaders.get("Authorization"));
    const a = myHeaders.get("Authorization");

    const options = {
      method: "get",
      headers: {
        Authorization: a,
      },
    };

    axios(`${process.env.REACT_APP_URL}/user/getme`, options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return children;
        } else {
          navigate("/signin");
        }
      })
      .catch((error) => navigate("/signin"));
  }, [Authorization]);
};
export default ProtectedRoute;
