import store from '../../../stores/Store';
import Axios from 'axios';
import { getAPIURL } from '../practice/Questions';

export const getUserProgressData = async () => {
  const personId = store.getState().auth.user.uid;
  const url = getAPIURL();
  const response = await Axios.get(`${url}/statistics`, {
    params: {
      personId,
    },
  }).then((res) => {
    const progressData = {
      pieData: res.data.pieData,
      allQuestions: res.data.allQuestions,
    };
    return progressData;
  });

  return response;
};
