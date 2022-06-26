import store from '../../../stores/Store';
import Axios from 'axios';

export const getUserPieData = async () => {
  const personId = store.getState().auth.user.uid;

  const response = await Axios.get('http://localhost:3000/statistics', {
    params: {
      personId,
    },
  }).then((res) => {
    return res.data.pieData;
  });
  return response;
};
