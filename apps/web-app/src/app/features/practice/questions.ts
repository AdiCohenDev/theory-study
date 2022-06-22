import type { UserAnswers } from './Practice';
import Axios from 'axios';
import { IUserAnswer } from '@theory-study/types';
import store from '../../../stores/store';

interface IAllQuestions {
  question: string;
  answers: Array<IAnswer>;
  id: number;
  img: string;
  category: string;
}

interface IAnswer {
  caption: string;
  id: number;
  isCorrect: boolean;
}

export interface IUserPracticeQuestions {
  never?: string;
  expDate?: string;
  question: string;
  answers: Array<IAnswer>;
  id: number;
  img: string;
  category: string;
}

export const fetchQuestionForUser = async () => {
  const allQuestions: IAllQuestions[] = await fetchAllQuestions();
  const userAnswers = await fetchUserAnswersFromDB();
  const userPracticeData: UserAnswers = userAnswers;

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

const fetchUserAnswersFromDB = async () => {
  const personId = store.getState().auth.user.uid;
  const response = await Axios.get('http://localhost:3000/user-progress', {
    params: {
      personId,
    },
  }).then((res) => {
    return res.data.result.rows;
  });
  return response;
};

export const saveUserAnswersInDB = async (userData: IUserAnswer) => {
  const response = await Axios.post('http://localhost:3000/user-progress', userData);
  return response;
};
