import './Home.css';
import { useNavigate } from 'react-router-dom';
import UserProgress from '../../../progress-pie/UserProgress';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="home-container">
          <div className="home-title">בואו נלמד לתיאוריה</div>
          <div>
            <div className="home-practice-title">שנתרגל?</div>
            <button onClick={() => navigate('/practice')}>לתרגול השאלות</button>
          </div>
          {/*<div>*/}
          {/*  <div>שננסה להיבחן?</div>*/}
          {/*  <button>קח אותי למבחן!</button>*/}
          {/*</div>*/}
        </div>
        <hr />
        <UserProgress />
      </div>
    </>
  );
};

export default Home;
