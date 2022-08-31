import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import Auth from '../../../../shared/firebase/Auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { UserCredential } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Authentication.css';
import { errorMappings } from './AuthErrors';
import firebase from 'firebase/compat';
import { getAPIURL } from '../../../practice/Questions';

interface IConfirmationResult {
  readonly verificationId: string;
  confirm(verificationCode: string): Promise<UserCredential>;
}

interface IProps {
  authTitle: string;
  buttonText: string;
  noAccount?: boolean;
}

const Authentication = ({ authTitle, buttonText, noAccount }: IProps) => {
  const [confirmationResult, setConfirmationResult] = useState<IConfirmationResult>(null!);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [completePhoneNumber, setCompletePhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [pageRefresh, setPageRefresh] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (pageRefresh) {
      window.location.reload();
    }
    setPageRefresh(false);
  }, [pageRefresh]);

  const signInWithPhoneNumbers = async (phone: string) => {
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
    setCompletePhoneNumber(completePhoneNum);
    const confirmation = await signInWithPhoneNumber(Auth, completePhoneNum, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        return confirmationResult;
      })
      .catch((error): void => {
        if (error?.code) {
          setMessage(errorMappings[error.code]);
          return;
        }
        setMessage('אירעה שגיאה. רענן ונסה שנית.');
        return;
      });
    console.log(confirmation);
    if (confirmation) {
      setConfirmationResult(confirmation);
    }
  };

  async function confirmCode(code: string) {
    await confirmationResult
      .confirm(code)
      .then(async (result) => {
        await addUserToDB(completePhoneNumber);
        // User signed in successfully.
        navigate('/');
      })
      .catch((error) => {
        if (error?.code) {
          setMessage(errorMappings[error.code]);
        }
      });
  }

  const addUserToDB = async (userPhone: string) => {
    const url = getAPIURL();
    const response = await Axios.post(`${url}/user`, {
      phone: userPhone,
    }).then((res) => console.log(res.data));
    return response;
  };

  const handlePhoneInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(event.target.value);
  };

  const refreshPage = () => {
    setPageRefresh(true);
  };
  if (!confirmationResult) {
    return (
      <div className="container">
        <div className="login-container">
          <div className="login-title">{authTitle}</div>
          <div className="input-container">
            <label htmlFor="phone">מספר טלפון: </label>
            <input type="text" id="phone" value={phoneNumber} onChange={handlePhoneInputChange} />
          </div>
          {message ? (
            <div className="message">
              {message}
              <span onClick={refreshPage}>רענן</span>
            </div>
          ) : (
            ''
          )}
          <div className="login-item">
            <button onClick={() => signInWithPhoneNumbers(phoneNumber)} className="sign-in-btn">
              <span>{buttonText}</span>

              <div id="sign-in-button"></div>
            </button>
          </div>
          {noAccount ? (
            <div className="navigate-option">
              אין לך עדיין חשבון?
              <span onClick={() => navigate('/sign-up')}>הירשם</span>
            </div>
          ) : (
            <div className="navigate-option">
              יש לך כבר חשבון?<span onClick={() => navigate('/login')}>התחבר</span>
            </div>
          )}
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
        {message ? <div className="message">{message}</div> : ''}

        <button title="Confirm Code" onClick={() => confirmCode(code)} className="confirm-code-btn">
          אישור
          <div id="sign-in-button"></div>
          <></>
        </button>
      </div>
    </div>
  );
};

export default Authentication;
