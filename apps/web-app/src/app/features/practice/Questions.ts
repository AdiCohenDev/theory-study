import Axios from 'axios';
import {IAllQuestions, IUserAnswer, IUserPracticeQuestions} from '@theory-study/types';
import store from '../../../stores/Store';
import {shuffle} from 'lodash';

export const fetchQuestionForUser = async () => {
  const allQuestions: IAllQuestions[] = await fetchAllQuestions();
  const userAnswers = await fetchUserAnswersFromDB();
  const userPracticeData: IUserAnswer[] = userAnswers;

  const filteredQuestionList: IUserPracticeQuestions[] = allQuestions
    .filter((question: IAllQuestions) => {
      const searchedQuestion = userPracticeData.find(
        (practiceQuestion) => String(practiceQuestion.questionId) === question.id.toString()
      );
      const expDate = searchedQuestion?.expDate;
      const never = searchedQuestion?.never;

      if (!expDate && !never) {
        return true;
      }
      if (never) {
        return false;
      }
      return expDate && new Date(expDate).getTime() <= new Date().getTime();
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
  const response = await Axios.get(`${url}/questions`).then((res) => {
    return res.data.questions;
  });
  return response;
};

export const fetchTestQuestions = async () => {
  const allQuestions: IAllQuestions[] = await fetchAllQuestions();
  const testQuestion = shuffle(allQuestions);
  const _30testQuestion = testQuestion.slice(0, 30);
  const _30testQuestionWithShuffledAnswers = _30testQuestion.map((question: IAllQuestions) => {
    return {
      ...question,
      answers: shuffle(question.answers),
    };
  });
  return _30testQuestionWithShuffledAnswers;
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
    return 'https://smart-theory.me';
  }
};
