import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { getUserPieData } from './Functions';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './ProgressPie.css';

ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(ChartDataLabels);

const ProgressPie = () => {
  const [pieData, setPieData] = useState<[]>(null!);

  useEffect(() => {
    getUserPieData()
      .then((results) => {
        console.log(results);
        setPieData(results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const data = {
    labels: ['שאלות חדשות', 'שאלות שבהן טעית', 'שאלות שבהן צדקת'],
    datasets: [
      {
        label: '# of Votes',
        data: pieData,
        backgroundColor: ['rgba(255,176,0,0.2)', 'rgba(235,54,75,0.2)', 'rgba(92,255,86,0.2)'],
        borderColor: ['rgb(255,176,0)', 'rgb(235,54,69)', 'rgb(92,255,86)'],
        borderWidth: 1,
      },
    ],
    plugins: [ChartDataLabels],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 14,
            family: "'Fredoka', 'sans-serif'",
            lineHeight: 1.2,
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <div className="pie-title">ההתקדמות שלי: </div>
      <div className="pie-chart">{pieData ? <Pie data={data} options={options} /> : <div>loading</div>}</div>
    </div>
  );
};

export default ProgressPie;
