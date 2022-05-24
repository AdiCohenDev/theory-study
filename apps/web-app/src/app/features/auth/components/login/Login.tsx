import React, { ChangeEvent, useState } from 'react';
import Auth from '../../../../../../../../api/firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { UserCredential } from '@firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setUser } from '../../../../../stores/AuthStore';

interface ConfirmationResult {
  readonly verificationId: string;
  confirm(verificationCode: string): Promise<UserCredential>;
}

const Login = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>(null!);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const stateUser = useSelector((state: AuthState) => state.user);
  const dispatch = useDispatch();

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
    setConfirmationResult(confirmation);
  };

  async function confirmCode(code: string) {
    const result = await confirmationResult.confirm(code);
    const userResults = result.user;
    const user = {
      id: userResults.uid,
      phone: userResults.phoneNumber,
    };
    dispatch(setUser(user));
  }

  const handlePhoneInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(event.target.value);
  };

  if (!confirmationResult) {
    return (
      <>
        <div>
          <label htmlFor="phone">phone</label>
          <input type="text" id="phone" value={phoneNumber} onChange={handlePhoneInputChange} />
        </div>
        <label htmlFor="nickname">nickname</label>
        <input type="text" id="nickname" />
        <button onClick={() => signInWithPhoneNumbers(phoneNumber)}>
          <span>הירשם</span>
          <div id="sign-in-button"></div>
        </button>
      </>
    );
  }
  return (
    <>
      <input type="text" id="userCode" value={code} onChange={(event) => setCode(event.target.value)} />
      <button title="Confirm Code" onClick={() => confirmCode(code)}>
        Log in and confirm
        <div id="sign-in-button"></div>
      </button>
    </>
  );
};

export default Login;
