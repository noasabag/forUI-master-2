// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// const ProtectedRoute = (props, { children }) => {
//   const navigate = useNavigate();
//   const [Authorization, setAuthorization] = useState("");
//   const token = localStorage.getItem("token");
//   const path = props.path;
//   useEffect(() => {
//     if (token !== null) {
//       setAuthorization(token);
//     }
//   }, []);
//   useEffect(() => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", Authorization);
//     const a = myHeaders.get("Authorization");
//     const options = {
//       method: "get",
//       headers: {
//         Authorization:
//           "eyJhbGciOiJIUzI1NiJ9.NjM2Yjk3NjNjOGFlOGY4YmJiNjExYjli.oVMVjqO3rwGTaTIZreSp9pVmSGfnAWwZLJfNY1Ae6cA",
//       },
//     };
//     axios(`${process.env.REACT_APP_URL}/user/getme`, options)
//       .then((response) => {
//         if (response.status === 200) {
//           return children;
//         } else {
//           navigate("/signin");
//         }
//       })
//       .catch((error) => {
//         navigate("/signin");
//       });
//   }, [Authorization]);
// };
// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(isAuthenticated, "isAuthenticated before");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${process.env.REACT_APP_URL}/user/getme`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) return <h2>Loading...</h2>;

  return isAuthenticated ? children : navigate("/signin");
};

export default ProtectedRoute;
