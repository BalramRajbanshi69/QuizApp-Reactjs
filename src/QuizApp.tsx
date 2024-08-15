import { useState } from "react";
import "./Quiz.css";

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    id: 2,
    question: "What is the largest planet in our Solar System?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: 1,
  },
  {
    id: 3,
    question: "Which is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Annapurna"],
    answer: 0,
  },
  {
    id: 4,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: 2,
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    answer: 0,
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleOptionClick = (index: number) => {
    if (!answered) {
      setSelectedOption(index);
      if (index === questions[currentQuestion].answer) {
        setScore((prevScore) => prevScore + 1);
      }
      setAnswered(true);
      setShowAlert(false);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      setShowAlert(true);
    } else {
      if (currentQuestion < questions.length - 1) {
        setSelectedOption(null);
        setAnswered(false);
        setShowAlert(false);
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleGoToQuizApp = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const isCorrect = (index: number) =>
    questions[currentQuestion].answer === index;
  const isSelected = (index: number) => selectedOption === index;

  return (
    <div className="quiz-wrapper">
      {showResult ? (
        <div className="result-card">
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button className="go-to-quiz-button" onClick={handleGoToQuizApp}>
            Go to Quiz App
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <h2>Question {currentQuestion + 1}</h2> <hr />
          <p>{questions[currentQuestion].question}</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option 
                  ${isSelected(index) ? "selected" : ""} 
                  ${answered && isCorrect(index) ? "correct" : ""} 
                  ${
                    answered && !isCorrect(index) && index === selectedOption
                      ? "wrong"
                      : ""
                  } 
                  ${
                    answered &&
                    !isCorrect(index) &&
                    index === questions[currentQuestion].answer
                      ? "correct"
                      : ""
                  }
                `}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </div>
            ))}
          </div>
          {showAlert && (
            <div className="alert-message">Select any one option</div>
          )}
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            Next
          </button>
          <div className="question-number">
            Questions: {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      )}
    </div>
  );
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
}
