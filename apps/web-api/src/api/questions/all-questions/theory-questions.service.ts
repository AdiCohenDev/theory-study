import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import axios from 'axios';
import NodeCache from 'node-cache';
import { IAllQuestions } from '@theory-study/types';

const nodeCache = new NodeCache();

export const getQuestionsAPI = async (): Promise<IAllQuestions[]> => {
  const CACHE_KEY = 'theory_questions';
  let theoryQuestions = nodeCache.get<IAllQuestions[]>(CACHE_KEY);
  if (!theoryQuestions) {
    theoryQuestions = await getQuestionsFromGov();
    nodeCache.set(CACHE_KEY, theoryQuestions);
  }
  return theoryQuestions;
  //res.set('Cache-Control', 'public, max-age=604800'); // one week
};

const getQuestionsFromGov = async () => {
  const dom = new JSDOM(`<!DOCTYPE html><body><div class="container"></div></body>`);
  const container = dom.window.document.querySelector('.container');
  const limit = 5000;
  const URL = `https://data.gov.il/api/3/action/datastore_search?resource_id=bf7cb748-f220-474b-a4d5-2d59f93db28d&limit=${limit}`;

  try {
    const URLResponse = await axios.get(URL);
    const theoryQuestions = URLResponse.data;
    const newDiv = dom.window.document.createElement('div');
    const allRecords: IAllQuestions[] = [];
    const records = theoryQuestions.result.records;
    for (const record of records) {
      const htmlText = record.description4;
      const question = record.title2;
      newDiv.innerHTML = htmlText;

      const questionRgx = /\d+\./g;
      const newQuestion = question.replace(questionRgx, '');
      const answersEl = newDiv.querySelectorAll('li span');
      const imgEl = newDiv.querySelector('img');
      const answers = [];
      const id = record._id;
      const category = record.category;
      for (let i = 0; i < answersEl.length; i++) {
        const answer = answersEl[i];
        const correctAnswerRgx = /correctAnswer\d+/m;
        const isCorrect = !!answer.id.match(correctAnswerRgx);
        const answersObj = {
          caption: answer.textContent,
          isCorrect: isCorrect,
          id: i,
        };
        answers.push(answersObj);
      }
      if (imgEl) {
        const recordObj = {
          id: id,
          question: newQuestion,
          answers,
          category: category,
          img: imgEl.src,
        };
        allRecords.push(recordObj);
      } else if (!imgEl) {
        const recordObj = {
          id: id,
          question: newQuestion,
          answers,
          category: category,
        };
        allRecords.push(recordObj);
      }
    }
    return allRecords;
  } catch (error) {
    console.error(error);
  }
};
