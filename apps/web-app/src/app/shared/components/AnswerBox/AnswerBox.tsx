import React from 'react';
import './AnswerBox.css';
import classNames from 'classnames';

interface IProps {
  text: string;
  id: number;
  showIfCorrect: boolean;
  isCorrect: boolean;
  userAnswerId: number | undefined;
  saveUserProgress(): void;
}

const AnswerBox = ({ text, id, userAnswerId, saveUserProgress, showIfCorrect, isCorrect }: IProps) => {
  const showCorrectAnswerClasses = classNames('answer-container', {
    'user-answer': userAnswerId === id && !showIfCorrect,
    'right-answer': showIfCorrect && isCorrect,
    'wrong-answer': showIfCorrect && !isCorrect && userAnswerId === id,
  });

  return (
    <div onClick={saveUserProgress} className={showCorrectAnswerClasses}>
      <p>{text}</p>
    </div>
  );
};

export default AnswerBox;
