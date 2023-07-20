import React, { useEffect, useState } from "react";
// import { wordsArr } from "props";
import axios from "axios";
const List = (props) => {
  const wordsArr = props.wordsArr;
  const sortedArr = wordsArr.sort((a, b) => a.learned - b.learned);
  return (
    <ul>
      {sortedArr.map((unknownWord) => {
        // if (!unknownWord.learned) {
        return (
          <div className="wordlist-contain">
            <li
              style={{
                listStyleType: "none",
              }}
            >
              <div className="box-align">
                <h5
                  style={
                    unknownWord.learned
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                  key={unknownWord.word}
                  onClick={() => {
                    props.lineTrough(unknownWord);
                  }}
                >
                  <input type="checkbox" />
                  {unknownWord.word} - {unknownWord.translate}
                </h5>
                {/* // <button>remove</button> */}
              </div>
            </li>
          </div>
        );
        // }
        // else {
        //   return (
        //     <div className="wordlist-contain">
        //       <li
        //         style={{
        //           listStyleType: "none",
        //         }}
        //       >
        //         <div className="box-align">
        //           <h5
        //             key={unknownWord.word}
        //             onClick={() => {
        //               props.lineTrough(unknownWord);
        //             }}
        //           >
        //             <input type="checkbox" />
        //             {unknownWord.word} - {unknownWord.translate}
        //           </h5>
        //           {/* <button>remove</button> */}
        //         </div>
        //       </li>
        //     </div>
        //   );
        // }
      })}
    </ul>
  );
};

export default List;
