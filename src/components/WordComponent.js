import "../pages/word.css";
import React, { useCallback, useState } from "react";
import "../pages/text.css";
import axios from "axios";
const WordComponent = (props) => {
  const { nativeWord, translate, title } = props;
  const onclickHandler = useCallback(async () => {
    const option = {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { nativeWord, translate, title },
    };

    await axios(
      `https://pem-backend-376512.oa.r.appspot.com/addWordToTheList`,
      option
    )
      .then((response) => {})
      .catch((e) => {
        console.log("whhattt" + e);
      });
  }, [nativeWord, translate]);
  return (
    <div className="textpage-cont">
      <div className="word-box">
        <div>
          <p>
            {nativeWord} : {translate}
          </p>
          <div className="flex">
            <button onClick={onclickHandler} className="display-text save-word">
              Save word
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WordComponent;
