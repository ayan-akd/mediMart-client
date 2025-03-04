import React from "react";
import "../../app/spinner.css";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loading;
