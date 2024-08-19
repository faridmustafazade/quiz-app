import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const CheckPopUp = ({ isOpen, setIsOpen, answers }) => {
  return (
    <div
      className={`w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-25
  ${isOpen === true ? "" : "hidden"}
  `}
    >
      <div className="relative bg-white flex flex-col justify-center items-center w-[45%] h-96 py-10 rounded-md">
        <MdOutlineCancel
          onClick={setIsOpen}
          className="absolute top-2 right-2 text-3xl text-blue-400 cursor-pointer"
        />
        <p className="text-3xl">Your Result</p>
        <div className="mt-10">
          <ul className="flex flex-col gap-5">
            {Object.entries(answers).map(([questionId, answer]) => (
              <li key={questionId}>
                {answer?.variant?.isTrue === true ? (
                  <>
                    <span className="italic text-lg">
                      "{answer?.question?.name}"
                    </span>{" "}
                    sualına sənin cavabın :{" "}
                    {answer.index !== undefined
                      ? String.fromCharCode(65 + answer.index)
                      : "N/A"}{" "}
                    <span className="text-green-500">Cavab doğrudur</span>
                  </>
                ) : (
                  <>
                    <span className="italic text-lg">
                      "{answer?.question?.name}"
                    </span>{" "}
                    sualına sənin cavabın :{" "}
                    {answer.index !== undefined
                      ? String.fromCharCode(65 + answer.index)
                      : "N/A"}{" "}
                    <span className="text-red-600">
                      Cavab yanlışdır. Doğru cavab :{" "}
                      {String.fromCharCode(
                        65 +
                          answer?.question?.variants?.findIndex(
                            (variant) => variant?.isTrue === true
                          )
                      )}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckPopUp;
