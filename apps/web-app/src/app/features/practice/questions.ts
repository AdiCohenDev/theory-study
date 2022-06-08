import type { UserAnswers } from './Practice';

interface IAllQuestions {
  question: string;
  num: number;
  answers: answersArr[];
}

interface answersArr {
  answer: string;
  id: number;
  isCorrect: boolean;
}

export const fetchQuestionForUser = () => {
  const allQuestions: IAllQuestions[] = [
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
  const userPracticeData: UserAnswers = {
    1: { answerId: 1, expDate: '2022-06-07T17:17:20.549Z' },
    2: { answerId: 2, never: true },
    0: { answerId: 4, expDate: '2022-06-14T17:43:40.478Z' },
  };

  const filteredQuestionList = allQuestions
    .filter((question) => {
      const expDate = userPracticeData[question.num]?.expDate;
      const never = userPracticeData[question.num]?.never;
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
      const aExpDate = userPracticeData[a.num]?.expDate || now;
      const bExpDate = userPracticeData[b.num]?.expDate || now;

      if (new Date(aExpDate).getTime() > new Date(bExpDate).getTime()) {
        return 1;
      }
      return -1;
    });
  return filteredQuestionList;
};
