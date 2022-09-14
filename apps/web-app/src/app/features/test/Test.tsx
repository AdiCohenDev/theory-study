import { useEffect, useState } from 'react';
import AnswerBox from '../../shared/components/AnswerBox/AnswerBox';
import '../practice/Practice.css';
import './Test.css';
import { IAnswer, IUserAnswer, IUserPracticeQuestions } from '@theory-study/types';
import { fetchTestQuestions } from '../practice/Questions';
import store from '../../../stores/Store';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import Timer from './timer/Timer';
import TestOver from './TestOver';
import { useNavigate } from 'react-router-dom';

interface ICurrentQuestion {
  question: string;
  answers: Array<IAnswer>;
  id: number;
  img?: string;
  category: string;
  never?: string;
  expDate?: string;
}

type IUserTestAnswers = Record<number, ITestUserAnswer>;

interface ITestUserAnswer {
  answerId: number;
  questionId: number;
  isCorrect: boolean;
}

const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>(null!);
  const [allTestQuestions, setAllTestQuestions] = useState<IUserPracticeQuestions[]>([]);
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer | null>(null);
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswers>({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [userAnswerId, setUserAnswerId] = useState<number>(null!);
  const [correctAnswersNum, setCorrectAnswersNum] = useState<number>(null!);
  const [testIsOver, setTestIsOver] = useState<boolean>(false);
  const navigate = useNavigate();
  const personId = store.getState().auth.user.uid;

  useEffect(() => {
    fetchQuestionForTest();
  }, []);

  useEffect(() => {
    setCurrentQuestion(allTestQuestions[questionNum]);

    if (showCorrectAnswer && questionNum === 0) {
      const questionId: number = allTestQuestions[0].id;
      const userAnswerId: number | undefined = userAnswers[questionId].answerId;
      setUserAnswerId(userAnswerId);
    }
  }, [questionNum]);

  const fetchQuestionForTest = (resetTest?: boolean) => {
    fetchTestQuestions()
      .then((results) => {
        setAllTestQuestions(results);
        setCurrentQuestion(results[questionNum]);
      })
      .catch((err) => {
        console.error(err);
      });
    if (resetTest) {
      setQuestionNum(0);
      setUserAnswerId(null!);
      setUserAnswer(null);
      setTestIsOver(false);
    }
  };
  const saveUserAnswer = (event: IAnswer) => {
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
    const hasUserAnsweredCorrectly = (): number | void => {
      for (const answer of currentQuestion.answers) {
        if (answer.isCorrect) {
          return answer.id;
        }
      }
    };
    const isCorrect: boolean = answerId === hasUserAnsweredCorrectly();
    const fullUserAnswer: ITestUserAnswer = {
      answerId,
      questionId: currentQuestion.id,
      isCorrect,
    };
    userAnswers[allTestQuestions[questionNum].id] = fullUserAnswer;
    nextQuestion();
  };

  const prevQuestion = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
    }
  };
  const nextQuestion = () => {
    if (!showCorrectAnswer) {
      setUserAnswer(null);
      setUserAnswerId(null!);
    }

    if (questionNum < allTestQuestions.length - 1) {
      setQuestionNum(questionNum + 1);
    }
  };
  const startNewTest = () => {
    setTestIsOver(false);
    setShowCorrectAnswer(false);
    fetchQuestionForTest(true);
  };

  const finishTest = () => {
    setTestIsOver(true);
    const testDate = new Date().toISOString();

    const correctAnswerNum = Object.values(userAnswers).reduce((correctAnswer, answer) => {
      if (answer.isCorrect) {
        correctAnswer++;
      }
      return correctAnswer;
    }, 0);

    setCorrectAnswersNum(correctAnswerNum);
    const userTest = {
      userAnswers,
      testDate,
      personId,
      correctAnswerNum,
    };

    // todo: save user test in the DB
  };

  const testReveal = () => {
    setQuestionNum(0);
    setShowCorrectAnswer(true);
    setTestIsOver(false);
  };

  return (
    <div className="section-container">
      <Timer finishTest={() => finishTest()} testIsOver={testIsOver} showCorrectAnswer={showCorrectAnswer} />
      <div className="question-number">
        {' '}
        <span>
          {allTestQuestions.length} / {questionNum + 1}
        </span>
      </div>

      <div className="question">{currentQuestion?.question}</div>
      {currentQuestion?.img ? (
        <img src={currentQuestion.img} className="question-img" alt={currentQuestion.category} />
      ) : null}
      <div className="answers-container">
        {currentQuestion?.answers.map((answer) => {
          return (
            <AnswerBox
              saveUserProgress={() => saveUserAnswer(answer)}
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

      <div className="options-btns">
        {!showCorrectAnswer ? (
          <button className="finish-test-btn" onClick={finishTest}>
            סיימתי מבחן
          </button>
        ) : (
          <>
            <button className="btn" onClick={startNewTest}>
              למבחן חדש
            </button>
            <button className="btn" onClick={() => navigate('/')}>
              לעמוד הבית
            </button>
          </>
        )}
      </div>
      {testIsOver ? (
        <TestOver
          testResult={`${correctAnswersNum}/${allTestQuestions.length}`}
          testReveal={() => testReveal()}
          startNewTest={() => startNewTest()}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Test;
