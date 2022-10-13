import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(ChartDataLabels);
Chart.defaults.font.size = 14;
Chart.defaults.font.family = "'Fredoka', sans-serif";

interface IProps {
  pieChartData: [number, number, number];
}

const PieChart = ({ pieChartData }: IProps) => {
  const data = {
    labels: ['שאלות חדשות', 'שאלות שבהן טעית', 'שאלות שבהן צדקת'],
    datasets: [
      {
        label: '# of Votes',
        data: pieChartData,
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
            size: 16,
            family: "'Fredoka', 'sans-serif'",
            lineHeight: 1.2,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="pie-chart">{pieChartData ? <Pie data={data} options={options} /> : ''}</div>
    </>
  );
};

export default PieChart;
