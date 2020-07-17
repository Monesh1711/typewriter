import React from "react";

export default ({ text, userInput }) => {
  const txt = text.split("");
  const usrInput = userInput.split("");
  return (
    <div>
      {txt.map((s, i) => {
        let color;
        if (i < userInput.length) {
          color = s === usrInput[i] ? "#dfffa0" : "fcbea4";
        }
        return (
          <span key={i} style={{ backgroundColor: color }}>
            {s}
          </span>
        );
      })}
    </div>
  );
};
