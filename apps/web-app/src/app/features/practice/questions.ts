import type { UserAnswers } from './Practice';
import Axios from 'axios';

interface IAllQuestions {
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

export interface IUserPracticeQuestions {
  never?: string;
  expDate?: string;
  question: string;
  answers: Array<Answer>;
  id: number;
  img: string;
  category: string;
}

export const fetchQuestionForUser = async () => {
  const allQuestions: IAllQuestions[] = await fetchAllQuestions();
  const userPracticeData: UserAnswers = {
    1: { answerId: 1, expDate: '2022-06-07T17:17:20.549Z' },
    2: { answerId: 2, never: true },
    0: { answerId: 4, expDate: '2022-06-14T17:43:40.478Z' },
  };

  const filteredQuestionList: IUserPracticeQuestions[] = allQuestions
    .filter((question) => {
      const expDate = userPracticeData[question.id]?.expDate;
      const never = userPracticeData[question.id]?.never;
      if (!expDate) {
        return true;
      }
      if (never) {
        return false;
      }
      return new Date(expDate).getTime() <= new Date().getTime();
    })
    .sort((a, b) => {
      const now = new Date().toISOString();
      const aExpDate = userPracticeData[a.id]?.expDate || now;
      const bExpDate = userPracticeData[b.id]?.expDate || now;

      if (new Date(aExpDate).getTime() > new Date(bExpDate).getTime()) {
        return 1;
      }
      return -1;
    });
  return filteredQuestionList;
};

const fetchAllQuestions = async () => {
  const response = await Axios.get('http://localhost:3000/questions').then((res) => {
    return res.data.questions;
  });
  return response;
};
