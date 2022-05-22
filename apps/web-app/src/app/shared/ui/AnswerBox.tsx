import React from 'react';
import './AnswerBox.css';
import classNames from 'classnames';

interface Props {
  text: string;
  id: number;
  showIfCorrect: boolean;
  isCorrect: boolean;
  userAnswerId: number;
  saveUserProgress(event: any): void;
}

const AnswerBox = ({ text, id, userAnswerId, saveUserProgress, showIfCorrect, isCorrect }: Props) => {
  const showCorrectAnswerClasses = classNames('answer-container', {
    'right-answer': showIfCorrect === true && isCorrect === true,
    'wrong-answer': showIfCorrect === true && !isCorrect && userAnswerId === id,
  });

  return (
    <div onClick={saveUserProgress} className={showCorrectAnswerClasses}>
      <p>{text}</p>
    </div>
  );
};

export default AnswerBox;
