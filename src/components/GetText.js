import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayText from "./DisplayText";
import { useNavigate } from "react-router-dom";
const GetText = () => {
  const [dbText, setDbText] = useState([{}]);
  const [textTitle, setTextTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: "http://localhost:3001/text/getText",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((text) => {
        setDbText(text.data);
      })
      .catch((e) => {
        console.log(e);
        navigate("/signin");
      });
  }, []);

  return (
    <div>
      <div className="gettext-wrapper">
        <div className="getText-cont">
          <div>
            <select
              name="text"
              style={{ margin: "0 auto" }}
              onChange={(e) => {
                setTextTitle(e.target.value);
              }}
            >
              <option disabled selected value>
                select text
              </option>
              {dbText.map((textObj) => {
                return <option value={textObj.title}>{textObj.title}</option>;
              })}

              {/* <optgroup label="level 1"> */}
            </select>

            <DisplayText title={textTitle} />
          </div>
        </div>
      </div>

      <div>
        <p style={{ textAlign: "center" }}> See the word you saved</p>
        <div className="flex">
          <button
            onClick={() => {
              navigate("/wordlist");
            }}
            className=" display-text"
          >
            My word
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetText;
