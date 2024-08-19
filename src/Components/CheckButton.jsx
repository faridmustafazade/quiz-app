import React from "react";

const CheckButton = ({ questions, handleOpen, answers }) => {
  return (
    <div
      className={`w-full flex justify-center 
        ${questions && questions.length === 0 ? "hidden" : ""}
        
        `}
    >
      <button
        disabled={Object.keys(answers).length === 0}
        onClick={Object.keys(answers).length !== 0 ? handleOpen : undefined}
        className={`mt-10 px-16 py-4 rounded-md text-white border duration-200
        ${
          Object.keys(answers).length !== 0
            ? "bg-blue-400 hover:bg-white border border-blue-400 hover:text-blue-400 cursor-pointer"
            : "bg-red-400 hover:bg-red-300 border border-red-400 hover:text-white cursor-not-allowed"
        }
        `}
      >
        Submit
      </button>
    </div>
  );
};

export default CheckButton;
