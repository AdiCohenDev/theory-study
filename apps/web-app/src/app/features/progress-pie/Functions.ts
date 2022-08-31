import store from '../../../stores/Store';
import Axios from 'axios';
import { getAPIURL } from '../practice/Questions';

export const getUserPieData = async () => {
  const personId = store.getState().auth.user.uid;
  const url = getAPIURL();
  const response = await Axios.get(`${url}/statistics`, {
    params: {
      personId,
    },
  }).then((res) => {
    return res.data.pieData;
  });
  return response;
};
