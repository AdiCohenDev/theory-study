import type { UserAnswers } from './Practice';
import Axios from 'axios';
import { IAllQuestions, IUserAnswer, IUserPracticeQuestions } from '@theory-study/types';
import store from '../../../stores/Store';

export const fetchQuestionForUser = async () => {
  const allQuestions: IAllQuestions[] = await fetchAllQuestions();
  const userAnswers = await fetchUserAnswersFromDB();
  const userPracticeData: UserAnswers = userAnswers;

  const filteredQuestionList: IUserPracticeQuestions[] = allQuestions
    .filter((question) => {
      // @ts-ignore
      const serchedQuestion = userPracticeData.find(
        (practiceQuestion: any) => practiceQuestion.questionId === question.id.toString()
      );
      const expDate = serchedQuestion?.expDate;
      const never = serchedQuestion?.never;
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

export const fetchAllQuestions = async () => {
  const url = getAPIURL();
  /*
    1. Add new api service, with a function called getAPIURL
    2. Change existing APIs to work like this `${getAPIURL()/qustions}`
   */

  const response = await Axios.get(`${url}/questions`).then((res) => {
    return res.data.questions;
  });
  return response;
};

export const fetchUserAnswersFromDB = async () => {
  const url = getAPIURL();

  const personId = store.getState().auth.user.uid;
  const response = await Axios.get(`${url}/user-answers`, {
    params: {
      personId,
    },
  }).then((res) => {
    return res.data.result;
  });
  return response;
};

export const saveUserAnswersInDB = async (userData: IUserAnswer) => {
  const url = getAPIURL();
  const response = await Axios.post(`${url}/user-answers`, userData);
  return response;
};

export const getAPIURL = () => {
  if (process.env['NODE_ENV'] === 'development') {
    return 'http://localhost:3000';
  } else {
    return 'http://ec2-15-184-54-55.me-south-1.compute.amazonaws.com:3000';
  }
};
