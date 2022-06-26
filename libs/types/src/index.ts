export interface IUserAnswer {
  answerId: number;
  expDate: string | null;
  never: boolean;
  questionId: number;
  personId: string;
  isCorrect: boolean;
}

export interface IAllQuestions {
  question: string;
  answers: Array<IAnswer>;
  id: number;
  img?: string;
  category: string;
}
export interface IAnswer {
  caption: string;
  id: number;
  isCorrect: boolean;
}

export interface IUserPracticeQuestions {
  never?: string;
  expDate?: string;
  isCorrect?: boolean;
  question: string;
  answers: Array<IAnswer>;
  id: number;
  img?: string;
  category: string;
}
