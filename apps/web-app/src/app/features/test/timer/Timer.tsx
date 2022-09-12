import { useState, useRef, useEffect } from 'react';

interface IProps {
  finishTest(): void;
  testIsOver: boolean;
  showCorrectAnswer: boolean;
}
const Timer = ({ finishTest, testIsOver, showCorrectAnswer }: IProps) => {
  const [timer, setTimer] = useState('40:00');
  const Ref = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (testIsOver || showCorrectAnswer) {
      clearTimer();
    } else {
      resetTimer();
    }
  }, [testIsOver, showCorrectAnswer]);

  const startTimer = (e: string) => {
    clearTimer();
    const id = setInterval(() => {
      startRunningTimer(e);
    }, 1000);

    Ref.current = id;
  };

  const startRunningTimer = (e: string) => {
    const { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds));
    }
  };

  const getTimeRemaining = (e: string) => {
    const total = Date.parse(e) - Date.parse(String(new Date()));
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const clearTimer = () => {
    setTimer('40:00');
    if (Ref.current) clearInterval(Ref.current);
  };

  const getDeadTime = () => {
    let deadline: string | Date = new Date();

    deadline.setSeconds(deadline.getSeconds());
    deadline.setMinutes(deadline.getMinutes() + 40);
    deadline = String(deadline);
    return deadline;
  };

  const resetTimer = () => {
    startTimer(getDeadTime());
  };

  if (timer === '00:00') {
    finishTest();
  }
  return (
    <div className="timer">
      <span>זמן לסיום המבחן</span>
      <h2>{testIsOver || showCorrectAnswer ? '00:00' : timer}</h2>
    </div>
  );
};

export default Timer;
