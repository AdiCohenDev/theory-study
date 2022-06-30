import { getAuth } from 'firebase/auth';
import App from './App';

const Auth = getAuth(App);
Auth.languageCode = 'he';

export default Auth;
