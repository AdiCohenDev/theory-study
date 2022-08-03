import React, { ChangeEvent, useState } from 'react';
import Auth from '../../../../shared/firebase/Auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { UserCredential } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css';

interface IConfirmationResult {
  readonly verificationId: string;
  confirm(verificationCode: string): Promise<UserCredential>;
}

const Login = () => {
  const [confirmationResult, setConfirmationResult] = useState<IConfirmationResult>(null!);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const navigate = useNavigate();

  const signInWithPhoneNumbers = async (phone: any) => {
    const appVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response: any) => {
          // if reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      Auth
    );
    const numOfLastDigits = -9;
    const localPhoneNum = phone.slice(numOfLastDigits);
    const countryPrefix = '+972';
    const completePhoneNum = countryPrefix + localPhoneNum;

    const confirmation = await signInWithPhoneNumber(Auth, completePhoneNum, appVerifier);
    await addUserToDB(completePhoneNum);
    setConfirmationResult(confirmation);
  };

  async function confirmCode(code: string) {
    await confirmationResult.confirm(code);
    navigate('/');
  }

  const addUserToDB = async (userPhone: string) => {
    // @ts-ignore
    const response = await Axios.post('http://localhost:3000/user', {
      phone: userPhone,
    }).then((res) => console.log(res.data));
  };

  const handlePhoneInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(event.target.value);
  };

  if (!confirmationResult) {
    return (
      <div className="container">
        <div className="login-container">
          <div className="login-title">ברוכים הבאים!</div>
          <div className="input-container">
            <label htmlFor="phone">מספר טלפון: </label>
            <input type="text" id="phone" value={phoneNumber} onChange={handlePhoneInputChange} />
          </div>
          <div className="login-item">
            <button onClick={() => signInWithPhoneNumbers(phoneNumber)} className="sign-in-btn">
              <span>הירשם</span>
              <div id="sign-in-button"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="login-container">
        <div className="login-title">הרגע שלחנו לך קוד לנייד</div>
        <div className="input-container">
          <div className="code-text">מה הקוד שקיבלת?</div>
          <input type="text" id="userCode" value={code} onChange={(event) => setCode(event.target.value)} />
        </div>

        <button title="Confirm Code" onClick={() => confirmCode(code)} className="confirm-code-btn">
          אישור
          <div id="sign-in-button"></div>
        </button>
      </div>
    </div>
  );
};

export default Login;
