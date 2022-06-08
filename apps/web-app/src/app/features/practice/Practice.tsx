import React, { useEffect, useState } from 'react';
import AnswerBox from '../../shared/components/AnswerBox/AnswerBox';
import './Practice.css';
import { fetchQuestionForUser } from './questions';

interface CurrentQuestion {
  question: string;
  answers: Array<Answer>;
  num: number;
}

interface Answer {
  answer: string;
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
  const [questionNum, setQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [userAnswerId, setUserAnswerId] = useState<number | undefined>(null!);

  const questions = [
    {
      question: ' איזו חובה מוטלת על נהג המתקרב למפגש מסילת ברזל המוגן במחסום ומוצב בו רמזור?',
      num: 1,
      answers: [
        { answer: 'חובה עליו להאט תמיד', id: 1, isCorrect: false },
        { answer: 'עליו להתנהג כרגיל. נהיגה זהירה מחויבת רק כאשר נראית באו נשמעת רכבת מתקרבת', id: 2, isCorrect: true },
        { answer: 'רק לכבות רדיו המותקן ברכב.', id: 3, isCorrect: false },
        { answer: 'עליו להתנהג כרגיל. במפגש שיש בו מחסום ניתן להיות פחות עירניים', id: 4, isCorrect: false },
      ],
    },
    {
      question: 'מה פירוש התמרור?',
      num: 2,
      answers: [
        { answer: 'זהירות! ילדים בקרבת מקום', id: 1, isCorrect: false },
        { answer: 'זהירות!שביל להולכי רגל', id: 2, isCorrect: false },
        { answer: 'מעבר חצייה לילדים בלבד.', id: 3, isCorrect: false },
        { answer: 'מעבר חצייה להולכי רגל לפנייך.', id: 4, isCorrect: true },
      ],
    },
    {
      question: 'האם חובה לציית להוראות שוטר שהזדהה בתעודת מינוי?',
      num: 3,
      answers: [
        { answer: 'לא. חייבים לציית רק לשוטר תנועה בהכוונת תנועה בצומת.', id: 1, isCorrect: false },
        { answer: 'בדרך כלל לא.', id: 2, isCorrect: false },
        { answer: 'כן. לעניין הכוונת תנועה בצומת בלבד.', id: 3, isCorrect: false },
        { answer: 'כן. אף אם ההוראות מנוגדות להוראות התמרור', id: 4, isCorrect: true },
      ],
    },
  ];

  useEffect(() => {
    setCurrentQuestion(questions[questionNum]);
    fetchQuestionForUser();
  }, [questionNum]);

  const saveUserProgress = (event: any) => {
    userAnswers[currentQuestion.num] = {};
    userAnswers[currentQuestion.num].answerId = event.id;
    const userAnswerId = userAnswers[currentQuestion.num].answerId;
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
    if (questionNum < questions.length - 1) {
      setQuestionNum(questionNum + 1);
    }
    if (showCorrectAnswer) {
      setShowCorrectAnswer(false);
    }
  };
  const correctAnswerReveal = () => {
    setShowCorrectAnswer(true);
    const userAnswerId = userAnswers[currentQuestion.num].answerId;
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
      userAnswers[currentQuestion.num].never = true;
    } else {
      const expDate = new Date(new Date().getTime() + seconds * 1000).toISOString();
      userAnswers[currentQuestion.num].expDate = expDate;
    }
    nextQuestion();
  };

  const finishPractice = () => {
    //update the db
  };
  return (
    <div className="practice-container">
      <div className="question">{currentQuestion?.question}</div>
      <div className="answers-container">
        {currentQuestion?.answers.map((answer) => {
          return (
            <AnswerBox
              saveUserProgress={() => saveUserProgress(answer)}
              text={answer.answer}
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
      </div>
      <button className="finish-practice-btn" onClick={finishPractice}>
        סיים תרגול
      </button>
    </div>
  );
};

export default Practice;
