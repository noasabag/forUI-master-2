import React, { useCallback, useEffect, useState } from "react";
import "../pages/text.css";
import axios from "axios";
import WordComponent from "./WordComponent";
const DisplayText = (props) => {
  const [nativeWord, setNativeWord] = useState();
  const [translate, setTranslate] = useState();

  const [text, setText] = useState([]);
  const { title } = props;
  //const title = "Absolute Success is Luck. Relative Success is Hard Work.";

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

    await axios(`${process.env.REACT_APP_URL}/word/translate/${word}`, option)
      .then((response) => {
        setNativeWord(word);
        console.log(response.data + word);
        setTranslate(response.data);
      })
      .catch((e) => {
        console.log("ee" + e);
      });
  }, []);
  useEffect(() => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/text/getTextByTitle`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { title },
    })
      .then((response) => {
        setText(response.data.text);
        setTextTitle(response.data.title);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [title]);

  //onst splitedText = text.map((textParagraph) => textParagraph.split(" "));

  return (
    <div>
      <h1 className="title-text">{textTitle}</h1>
      <p className="text">
        {text.map((textParagraph) => (
          <p>
            {textParagraph.split(" ").map((word) => (
              <span
                onClick={() => {
                  sendWordToTranslator(word);
                }}
              >
                {word}{" "}
              </span>
            ))}
            <br />
          </p>
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
