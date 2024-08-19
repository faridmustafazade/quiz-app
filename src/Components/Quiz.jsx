import axios from "axios";
import React, { useEffect, useState } from "react";
import Question from "./Question";
import CheckPopUp from "./CheckPopUp";
import CheckButton from "./CheckButton";

const Quiz = () => {
  const [quizes, setQuizes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchQuizes = async () => {
      const { data } = await axios.get("http://localhost:1000/api/quiz");
      setQuizes(data);
    };

    fetchQuizes();
  }, []);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen === true) {
      setQuestions([]);
      setQuizId(null);
      setAnswers({});
    }
  };
  const handleClick = async (id) => {
    const { data } = await axios.get(
      `http://localhost:1000/api/question/quiz/${id}`
    );

    const shuffleArray = (array) => {
      let shuffled = array.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledQuestions = data.map((question) => ({
      ...question,
      variants: shuffleArray(question.variants),
    }));
    setQuestions(shuffledQuestions);
  };

  return (
    <>
      <div className="w-full flex items-center justify-around">
        {quizes.map((quiz, index) => (
          <div
            onClick={() => {
              handleClick(quiz.id);
              setQuizId(quiz.id);
            }}
            key={quiz._id}
            className={`cursor-pointer border rounded-2xl w-[45%] h-[200px] flex justify-center items-center hover:bg-blue-400 hover:text-white duration-200
            ${quiz.id === quizId ? "bg-blue-400 text-white" : null}
            `}
          >
            <p className="text-2xl">
              {index + 1}. {quiz.name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="w-full flex items-start justify-around mt-20">
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              index={index}
              answers={answers}
              setAnswers={setAnswers}
            />
          ))}
        </div>
        <CheckButton questions={questions} handleOpen={handleOpen} answers={answers}/>
      </div>
      <CheckPopUp isOpen={isOpen} setIsOpen={handleOpen} answers={answers} />
    </>
  );
};

export default Quiz;
