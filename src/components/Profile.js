import profileStyle1 from '../pages/profile.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const getUserDetils = () => {
  //     axios(option)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  useEffect(() => {
    const option = {
      url: "http://localhost:3001/user/getme",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios(option)
      .then((response) => {
        setFirstName(response.data.firstname);
        setSurname(response.data.lastname);
        setEmail(response.data.email);
        setPassword(response.data.password);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <form className="signIn">
        <p style={{textAlign:'center'}}>Account Deatails</p>
        <div>
        <label>First Name</label>
        </div>
        <div>
        <input
          className='input-text'
          value={firstName}
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
        className='input-text'
          value={surname}
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
        className='input-text'
          value={email}
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
       className='input-text'
       ></input>
       </div>
       <div>
       <button className='savebtn' type="submit">Save changes</button>
       </div>
      </form>
    </div>
  );
};
export default Profile;
