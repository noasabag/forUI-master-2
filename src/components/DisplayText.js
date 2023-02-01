import React, { useCallback, useEffect, useState } from "react";
import "../pages/text.css";
import axios from "axios";
import WordComponent from "./WordComponent";
const DisplayText = (props) => {
  const [nativeWord, setNativeWord] = useState();
  const [translate, setTranslate] = useState();

  const [text, setText] = useState("");
  const { title } = props;

  const [textTitle, setTextTitle] = useState(
    (prevState) => console.log("kk" + prevState)
    //props.title ? props.title : ""
  );

  const sendWordToTranslator = useCallback(async (word) => {
    const option = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    await axios(
      `https://pem-backend-376512.oa.r.appspot.com/word/translate/${word}`,
      option
    )
      .then((response) => {
        setNativeWord(word);
        setTranslate(response.data);
      })
      .catch((e) => {
        console.log("ee" + e);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "POST",
      url: "https://pem-backend-376512.oa.r.appspot.com/text/getTextByTitle",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { title },
    })
      .then((response) => {
        //.log(textTitle);
        setText(response.data.text);
        setTextTitle(response.data.title);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [title]);

  const splitedText = text.split(" ");

  return (
    <div>
      <h1 className="title-text">{textTitle}</h1>
      <p className="text">
        {splitedText.map((word) => (
          <span
            onClick={() => {
              sendWordToTranslator(word, title);
            }}
          >
            {word}{" "}
          </span>
        ))}
      </p>
      <WordComponent
        title={title}
        nativeWord={nativeWord}
        translate={translate}
      />
    </div>
  );
};
export default DisplayText;
