import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const WordList = () => {
  const [wordsArr, setWordsArr] = useState([]);
  const navigate = useNavigate();
  const [dbText, setDbText] = useState([{}]);
  const [selectedText, setselectedText] = useState();

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
      });
  }, []);
  const markUsKnown = (word) => {
    axios("http://localhost:3001/word/markWordUsKnown", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  };
  useEffect(() => {
    axios("http://localhost:3001/word/wordslist", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { selectedText },
    })
      .then((res) => {
        setWordsArr(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedText]);

  return (
    <div>
      <div className="wordlist-cont">
        <h3 style={{ textAlign: "center" }}> Dictonary Management</h3>
        <select
          name="text"
          style={{ margin: "0 auto" }}
          onChange={(e) => {
            setselectedText(e.target.value);
          }}

          //  defaultChecked={textTitle}
          // defaultValue={textTitle}
          // value={textTitle}
        >
          <option disabled selected value>
            Filter By text
          </option>
          {dbText.map((textObj) => {
            return <option value={textObj.title}>{textObj.title}</option>;
          })}
        </select>
        <ul>
          {wordsArr.map((unknownWord) => {
            if (!unknownWord.learned) {
              return (
                <div className="wordlist-contain">
                  <li>
                    <div className="box-align">
                      <h5> {unknownWord.word}</h5>
                      <p className="box-align">{unknownWord.translate}</p>
                      <button
                        onClick={() => {
                          markUsKnown(unknownWord.word);
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </li>
                </div>
              );
            }
          })}
        </ul>
      </div>
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
