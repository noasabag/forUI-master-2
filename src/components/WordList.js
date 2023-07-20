import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "./List";
const WordList = () => {
  const navigate = useNavigate();
  const [dbText, setDbText] = useState([{}]);
  const [lineTroughState, setLineTroughState] = useState(true);

  const [selectedText, setselectedText] = useState("");
  const [wordsArr, setWordsArr] = useState([]);

  useEffect(() => {
    axios(`${process.env.REACT_APP_URL}/word/wordslist`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { selectedText },
    })
      .then((res) => {
        console.log(selectedText);

        setWordsArr(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedText, lineTroughState]);
  const lineTrough = (unknownWord) => {
    setLineTroughState(!lineTroughState);
    console.log(lineTroughState);

    axios(`${process.env.REACT_APP_URL}/word/markWordUsKnown`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { unknownWord },
    });
  };

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_URL}/text/getText`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((text) => {
        console.log("markWordUsKnown88");

        setDbText(text.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  // const markUsKnown = (word) => {
  //   console.log("markWordUsKnown");
  //   axios(`${process.env.REACT_APP_URL}/word/markWordUsKnown`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: localStorage.getItem("token"),
  //     },
  //     data: { word },
  //   });
  // };

  return (
    <div>
      <div className="wordlist-cont">
        <h3 style={{ textAlign: "center" }}> Dictonary Management</h3>
        <select
          name="text"
          style={{ margin: "0 auto" }}
          onChange={(e) => {
            setselectedText(e.target.value);
            console.log(selectedText);
          }}

          //  defaultChecked={textTitle}
          // defaultValue={textTitle}
          // value={textTitle}
        >
          <option disabled selected value>
            Filter By text
          </option>
          {dbText.map((textObj) => {
            return (
              <option key={textObj.title} value={textObj.title}>
                {textObj.title}
              </option>
            );
          })}
        </select>
      </div>
      <List lineTrough={lineTrough} wordsArr={wordsArr} />
      <div>
        <p style={{ textAlign: "center" }}> Learn new words</p>
        <div className="flex">
          <button
            onClick={() => {
              navigate("/text");
            }}
            className=" display-text"
          >
            Display text
          </button>
        </div>
      </div>
    </div>
  );
};
export default WordList;
