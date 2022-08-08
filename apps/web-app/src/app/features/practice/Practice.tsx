import React, { useEffect, useState } from 'react';
import AnswerBox from '../../shared/components/AnswerBox/AnswerBox';
import './Practice.css';
import { IAnswer, IUserPracticeQuestions } from '@theory-study/types';
import { fetchQuestionForUser, saveUserAnswersInDB } from './Questions';
import store from '../../../stores/Store';
import { IUserAnswer } from '@theory-study/types';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import { IconContext } from 'react-icons';

interface ICurrentQuestion {
  question: string;
  answers: Array<IAnswer>;
  id: number;
  img?: string;
  category: string;
  never?: string;
  expDate?: string;
}

export type UserAnswers = Record<number, IUserAnswer>;

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>(null!);
  const [allQuestions, setAllQuestions] = useState<IUserPracticeQuestions[]>([]);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer | null>(null);
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

  const saveUserProgress = (event: IAnswer) => {
    if (showCorrectAnswer) {
      return;
    }
    const answer = userAnswer || ({} as IUserAnswer);
    const answerId = event.id;
    const newUser: IUserAnswer = {
      ...answer,
      answerId,
    };
    setUserAnswer(newUser);
    setUserAnswerId(answerId);
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
    setUserAnswer(null);
    setUserAnswerId(null!);
    if (questionNum < allQuestions.length - 1) {
      setQuestionNum(questionNum + 1);
    }

    if (showCorrectAnswer) {
      setShowCorrectAnswer(false);
    }
  };
  const correctAnswerReveal = () => {
    setShowCorrectAnswer(true);
  };

  const easy = 'קל';
  const middle = 'בינוני';
  const hard = 'קשה';
  const hide = 'תסתיר שאלה זו';

  const personId = store.getState().auth.user.uid;

  const questionLevel = async (e: React.MouseEvent<HTMLElement>) => {
    const userChoice = (e.target as HTMLElement).innerText;
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
    const hasUserAnsweredCorrectly = (): number | void => {
      for (const answer of currentQuestion.answers) {
        if (answer.isCorrect) {
          return answer.id;
        }
      }
    };
    const isCorrect: boolean = userAnswerId === hasUserAnsweredCorrectly();
    const expDate = never ? null : new Date(new Date().getTime() + seconds * 1000).toISOString();
    const userAnswer: IUserAnswer = {
      answerId: userAnswerId as number,
      never,
      questionId: currentQuestion.id,
      expDate,
      personId,
      isCorrect,
    };
    setUserAnswer(userAnswer);
    await saveUserAnswersInDB(userAnswer);

    nextQuestion();
  };
  return (
    <div className="container practice-container">
      <div className="question">{currentQuestion?.question}</div>
      {currentQuestion?.img ? (
        <img src={currentQuestion.img} className="question-img" alt={currentQuestion.category} />
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
          <GrLinkNext size={20} />
          <span>לשאלה הקודמת</span>
        </span>
        <span onClick={() => nextQuestion()} className="question-navigation">
          <span>לשאלה הבאה</span>
          <GrLinkPrevious size={20} />
        </span>
      </div>
      {!showCorrectAnswer ? (
        <button className="show-right-answer-btn" onClick={correctAnswerReveal}>
          הצג תשובה נכונה
        </button>
      ) : (
        ''
      )}

      <div className="level-btns-container">
        <div>
          <button className="level-btn" onClick={questionLevel}>
            {easy}
          </button>
          <span>+1w</span>
        </div>
        <div>
          <button className="level-btn" onClick={questionLevel}>
            {middle}
          </button>
          <span>+2d</span>
        </div>
        <div>
          <button className="level-btn" onClick={questionLevel}>
            {hard}
          </button>
          <span>+1h</span>
        </div>
        <div>
          <button className="level-btn" onClick={questionLevel}>
            {hide}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
