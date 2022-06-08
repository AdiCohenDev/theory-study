import React, { useEffect, useState } from 'react';
import AnswerBox from '../../shared/components/AnswerBox/AnswerBox';
import './Practice.css';
import Axios from 'axios';

interface CurrentQuestion {
  question: string;
  answers: Array<Answer>;
  id: number;
  img: string;
  category: string;
}

interface Answer {
  caption: string;
  id: number;
  isCorrect: boolean;
}

type UserAnswers = Record<number, number>;

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(null!);
  const [questionNum, setQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [userAnswerId, setUserAnswerId] = useState<number>(null!);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    setCurrentQuestion(allQuestions[questionNum]);
  }, [questionNum]);

  const fetchAllQuestions = async () => {
    const response = await Axios.post('http://localhost:3000/questions').then((res) => {
      return res.data.questions;
    });
    setAllQuestions(response);
  };
  const saveUserProgress = (event: any) => {
    console.log(event.id);
    userAnswers[currentQuestion.id] = event.id;

    setUserAnswers({
      ...userAnswers,
    });
    console.log(userAnswers);
    setShowCorrectAnswer(true);
  };
  const prevQuestion = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
    }
    setShowCorrectAnswer(false);
  };
  const nextQuestion = () => {
    if (questionNum < allQuestions.length - 1) {
      setQuestionNum(questionNum + 1);
    }
    setShowCorrectAnswer(false);
  };
  const correctAnswerReveal = () => {
    setShowCorrectAnswer(true);
    const userAnswerId = userAnswers[currentQuestion.id];
    setUserAnswerId(userAnswerId);
  };
  return (
    <div className="practice-container">
      <div className="question">{currentQuestion?.question}</div>
      {currentQuestion?.img ? (
        <img src={currentQuestion.img} width="300" height="300" alt={currentQuestion.category} />
      ) : null}
      <div className="answers-container">
        {currentQuestion?.answers.map((answer) => {
          return (
            <AnswerBox
              saveUserProgress={() => saveUserProgress(answer)}
              text={answer.caption}
              isCorrect={answer.isCorrect}
              key={answer.id}
              id={answer.id}
              showIfCorrect={showCorrectAnswer}
              userAnswerId={userAnswerId}
            />
          );
        })}
      </div>
      <div className="navigate-questions">
        <span onClick={() => prevQuestion()}>לשאלה הקודמת</span>
        <span onClick={() => nextQuestion()}>לשאלה הבאה</span>
      </div>
      <button className="show-right-answer-btn" onClick={correctAnswerReveal}>
        הצג תשובה נכונה
      </button>
      <div>
        <button className="level-btn">תסתיר שאלה זו</button>
        <button className="level-btn">קל</button>
        <button className="level-btn">בינוני</button>
        <button className="level-btn">קשה</button>
        <button onClick={fetchAllQuestions}>fetch</button>
      </div>
      <button className="finish-practice-btn">סיים תרגול</button>
    </div>
  );
};

export default Practice;
