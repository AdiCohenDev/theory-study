import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDDqwJ9P7R7tId8oVL9DP-9AduCUvVj4UQ',
  authDomain: 'theory-study.firebaseapp.com',
  projectId: 'theory-study',
  storageBucket: 'theory-study.appspot.com',
  messagingSenderId: '125907374091',
  appId: '1:125907374091:web:f9f8d6609505e6587e370e',
  measurementId: 'G-J48WTP4414',
};

const App = initializeApp(firebaseConfig);
const analytics = getAnalytics(App);

export default App;
