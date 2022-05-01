import { getAuth } from 'firebase/auth';
import App from './app';

const Auth = getAuth(App);
Auth.languageCode = 'he';

export default Auth;
