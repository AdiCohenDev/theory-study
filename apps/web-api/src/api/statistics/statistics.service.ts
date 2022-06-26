import { getQuestionsAPI } from '../questions/all-questions/theory-questions.service';
import { getUserAnswersFromDB } from '../questions/user-answers/user-answers.service';
import { IAllQuestions, IUserPracticeQuestions } from '@theory-study/types';

interface IPieData {
  allQuestions: IAllQuestions[];
  allUserAnswers: IUserPracticeQuestions[];
}
export const getUserProgressData = async (id: any) => {
  const allQuestions = await getQuestionsAPI();
  const allUserAnswers = await getUserAnswersFromDB(id);
  const data = { allQuestions: allQuestions, allUserAnswers: allUserAnswers.rows };
  const pieData = calculatePieData(data);
  return pieData;
};

const calculatePieData = (data: IPieData) => {
  const newQuestions = data.allQuestions.length - data.allUserAnswers.length;
  const userRightQuestions = [];
  const userWrongQuestions = [];
  for (const answer of data.allUserAnswers) {
    if (answer.never || answer.isCorrect) {
      userRightQuestions.push(answer);
    } else {
      userWrongQuestions.push(answer);
    }
  }
  const pieData = [newQuestions, userWrongQuestions.length, userWrongQuestions.length];

  return pieData;
};
