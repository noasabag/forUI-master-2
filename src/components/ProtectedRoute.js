import { stripBasename } from "@remix-run/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [Authorization, setAuthorization] = useState();
  //console.log(token);
  //
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    setAuthorization(token);
  }, [token]);

  useEffect(() => {
    const fetch = async () => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "eyJhbGciOiJIUzI1NiJ9.NjM3MDEyN2M2ZDhjOWEwZTllNDFiMWM3.5ehy_y9oqvcBVfhfIXTZag6ob--Lzt7hESjKwzDUMMw"
      );

      var raw = "";

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://pem-backend-376512.oa.r.appspot.com/user/getme",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result.Authorization) {
            navigate("/text");
          } else {
            navigate("/signin");
          }
        })
        .catch((error) => navigate("/signin"));

      //     .then((response) => {
      //       console.log(response);

      //       if (response.status !== 400) {
      //         console.log("token=>>>" + token);
      //         console.log(response);
      //         navigate("/text");
      //       } else {
      //         throw new Error();
      //       }
      //     })
      //     .catch((e) => {
      //       navigate("/signin");
      //     });
    };
    fetch();
  }, [Authorization]);
};
export default ProtectedRoute;
