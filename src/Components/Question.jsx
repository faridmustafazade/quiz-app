import React from "react";

const Question = ({ question, index, answers, setAnswers }) => {
  console.log(answers);
  const handleClick = (variant, question, index) => {
    setAnswers((prevAnswers) => {
      if (prevAnswers[question.id]?.index === index) {
        const { [question.id]: _, ...rest } = prevAnswers;
        return rest;
      } else {
        return {
          ...prevAnswers,
          [question.id]: { variant, question, index },
        };
      }
    });
  };

  return (
    <div
      key={question.id}
      className="w-[40%] border border-green-300 rounded-2xl p-5"
    >
      <p className="text-xl">
        {index + 1}. {question.name}
      </p>
      <ul className="px-10 flex flex-col gap-5 mt-5">
        {question.variants.map((variant, variantIndex) => (
          <li
            onClick={() => handleClick(variant, question, variantIndex)}
            key={variantIndex}
            className={`bg-white rounded-md border flex items-center px-5 py-3 cursor-pointer hover:bg-blue-400 hover:text-white duration-200
       ${
         answers[question.id]?.index === variantIndex
           ? "bg-blue-400 text-white"
           : ""
       }
       `}
          >
            <div className="rounded-md border w-8 h-8 flex justify-center items-center text-lg">
              {String.fromCharCode(65 + variantIndex)}
            </div>
            <p className="ml-5 text-lg">{variant.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
