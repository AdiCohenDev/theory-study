import PieChart from './pie-chart/PieChart';
import Progressbar from './progress-bar/Progressbar';
import React, { useEffect, useState } from 'react';
import { getUserProgressData } from './Functions';

const UserProgress = () => {
  const [pieData, setPieData] = useState<[number, number, number]>(null!);
  const [allQuestionsNum, setAllQuestionsNum] = useState<number>(null!);

  useEffect(() => {
    getUserProgressData()
      .then((results) => {
        setPieData(results.pieData);
        console.log(results.allQuestions);
        setAllQuestionsNum(results.allQuestions.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="pie-title">ההתקדמות שלי בתרגול:</div>
      <Progressbar questionNum={allQuestionsNum} pieChartData={pieData} />
      <PieChart pieChartData={pieData} />
    </>
  );
};

export default UserProgress;
