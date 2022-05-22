import React, { useEffect, useState } from 'react';
import AnswerBox from '../../shared/ui/AnswerBox';
import './Practice.css';

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

type UserAnswers = Record<number, number>;

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(null!);
  const [questionNum, setQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [userAnswerId, setUserAnswerId] = useState<number>(null!);

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
  }, [questionNum]);

  const saveUserProgress = (event: any) => {
    console.log(event.id);
    userAnswers[currentQuestion.num] = event.id;

    setUserAnswers({
      ...userAnswers,
    });
    console.log(userAnswers);
  };
  const prevQuestion = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
    }
  };
  const nextQuestion = () => {
    if (questionNum < questions.length - 1) {
      setQuestionNum(questionNum + 1);
    }
  };
  const correctAnswerReveal = () => {
    setShowCorrectAnswer(true);
    const userAnswerId = userAnswers[currentQuestion.num];
    setUserAnswerId(userAnswerId);
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
              key={answer?.id}
              id={answer?.id}
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
      </div>
      <button className="finish-practice-btn">סיים תרגול</button>
    </div>
  );
};

export default Practice;
