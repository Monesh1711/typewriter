import React from "react";

export default ({ symbols, sec }) => {
  if (symbols !== 0 && sec !== 0) {
    const wpm = symbols / 5 / (sec / 60);
    return <div>{Math.round(wpm)} wpm</div>;
  }
  return null;
};
