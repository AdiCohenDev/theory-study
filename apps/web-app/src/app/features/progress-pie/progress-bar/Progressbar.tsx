import ProgressBar from '@ramonak/react-progress-bar';
import './Progressbar.css';

interface IProps {
  pieChartData: [number, number, number];
  questionNum: number;
}

const Progressbar = ({ pieChartData, questionNum }: IProps) => {
  const percentage = (partialValue: number, totalValue: number) => {
    return (100 * partialValue) / totalValue;
  };

  const progressPercentage = (): number | void => {
    if (pieChartData) {
      const correctQuestionNum = pieChartData[2];
      console.log(pieChartData);
      const questionPercentageCalculate = percentage(correctQuestionNum, questionNum);
      const roundedNum = Math.round(questionPercentageCalculate);
      return roundedNum;
    }
  };

  return (
    <div className="progress-bar-container">
      <ProgressBar
        completed={progressPercentage() || 0}
        bgColor="#008000"
        height="2.5rem"
        width="100%"
        borderRadius="12px"
        labelAlignment="right"
        labelClassName="progress-label"
        margin="1rem 0 1rem 0"
        transitionDuration="0.5s"
        animateOnRender
      />
    </div>
  );
};

export default Progressbar;
