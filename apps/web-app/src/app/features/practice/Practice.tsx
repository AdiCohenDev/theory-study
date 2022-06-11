import React, { useEffect, useState } from 'react';
import AnswerBox from '../../shared/components/AnswerBox/AnswerBox';
import './Practice.css';
import { fetchQuestionForUser } from './questions';
import type { IUserPracticeQuestions } from './questions';

interface CurrentQuestion {
  question: string;
  answers: Array<Answer>;
  id: number;
  img: string;
  category: string;
  never?: string;
  expDate?: string;
}

interface Answer {
  caption: string;
  id: number;
  isCorrect: boolean;
}

interface userAnswer {
  answerId?: number;
  expDate?: string;
  never?: boolean;
}

export type UserAnswers = Record<number, userAnswer>;

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(null!);
  const [allQuestions, setAllQuestions] = useState<IUserPracticeQuestions[]>([]);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [userAnswerId, setUserAnswerId] = useState<number | undefined>(null!);

  useEffect(() => {
    fetchQuestionForUser()
      .then((results) => {
        setAllQuestions(results);
        setCurrentQuestion(results[questionNum]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setCurrentQuestion(allQuestions[questionNum]);
  }, [questionNum]);

  const saveUserProgress = (event: any) => {
    userAnswers[currentQuestion.id] = {};
    userAnswers[currentQuestion.id].answerId = event.id;
    const userAnswerId = userAnswers[currentQuestion.id].answerId;
    setUserAnswerId(userAnswerId);

    setUserAnswers({
      ...userAnswers,
    });

    setShowCorrectAnswer(true);
  };
  const prevQuestion = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
    }

    if (showCorrectAnswer) {
      setShowCorrectAnswer(false);
    }
  };
  const nextQuestion = () => {
    if (questionNum < allQuestions.length - 1) {
      setQuestionNum(questionNum + 1);
    }

    if (showCorrectAnswer) {
      setShowCorrectAnswer(false);
    }
  };
  const correctAnswerReveal = () => {
    setShowCorrectAnswer(true);
    const userAnswerId = userAnswers[currentQuestion.id].answerId;

    setUserAnswerId(userAnswerId);
  };

  const easy = 'קל';
  const middle = 'בינוני';
  const hard = 'קשה';
  const hide = 'תסתיר שאלה זו';

  const questionLevel = (e: any) => {
    const userChoice = e.target.innerText;
    let seconds = 60;
    const _2MinuteInSeconds = 120;
    const _1HourInSeconds = 3600;
    const _7DaysInSeconds = 604800;
    let never = false;
    if (userChoice === easy) {
      seconds = _7DaysInSeconds;
    }
    if (userChoice === middle) {
      seconds = _1HourInSeconds;
    }
    if (userChoice === hard) {
      seconds = _2MinuteInSeconds;
    }
    if (userChoice === hide) {
      never = true;
    }
    if (never) {
      userAnswers[currentQuestion.id].never = true;
    } else {
      const expDate = new Date(new Date().getTime() + seconds * 1000).toISOString();
      userAnswers[currentQuestion.id].expDate = expDate;
    }
    nextQuestion();
  };

  const finishPractice = () => {
    //update the db
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
        <span onClick={() => prevQuestion()} className="question-navigation">
          לשאלה הקודמת
        </span>
        <span onClick={() => nextQuestion()} className="question-navigation">
          לשאלה הבאה
        </span>
      </div>
      <button className="show-right-answer-btn" onClick={correctAnswerReveal}>
        הצג תשובה נכונה
      </button>
      <div>
        <button className="level-btn" onClick={questionLevel}>
          {hide}
        </button>
        <button className="level-btn" onClick={questionLevel}>
          {easy}
        </button>
        <button className="level-btn" onClick={questionLevel}>
          {middle}
        </button>
        <button className="level-btn" onClick={questionLevel}>
          {hard}
        </button>
        {/*<button onClick={fetchAllQuestions}>fetch</button>*/}
      </div>
      <button className="finish-practice-btn" onClick={finishPractice}>
        סיים תרגול
      </button>
    </div>
  );
};

export default Practice;
