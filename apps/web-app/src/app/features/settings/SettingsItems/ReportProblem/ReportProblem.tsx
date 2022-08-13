import React, { ChangeEvent, MouseEvent, FormEvent, useRef, useState } from 'react';
import './ReportProblem.css';
import store from '../../../../../stores/Store';
import { EmailJSResponseStatus } from '@emailjs/browser/es/models/EmailJSResponseStatus';
import { sendEmail } from '../email.service';

const ReportProblem = () => {
  const [userProblem, setUserProblem] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef<null | HTMLFormElement>(null);

  const sendUserProblem = async (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      sendEmail(form.current).then(
        (result: EmailJSResponseStatus) => {
          setMessage('הודעתך נשלחה בהצלחה.');
          setUserProblem('');
        },
        (error) => {
          setMessage('אירעה בעיה אנא נסה שנית.');
        }
      );
    }
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    setUserProblem(event.target.value);
  };

  const userPhoneNumber = store.getState().auth.user.phoneNumber;

  return (
    <div className="container">
      <div className="report-problem-container">
        <h2 className="report-title">מה תרצה לדווח לנו?</h2>
        <form ref={form} onSubmit={sendUserProblem}>
          <input
            type="text"
            name="userPhoneNumber"
            id="userPhoneNumber"
            value={userPhoneNumber}
            className="user-phone-input"
          />
          <textarea
            id="message"
            name="message"
            rows={6}
            cols={40}
            placeholder="כתוב כאן"
            value={userProblem}
            onChange={handleMessageChange}
          ></textarea>
          {message ? <div>{message}</div> : ''}

          <button type="submit" className="send-problem-btn" onClick={sendUserProblem}>
            שלח
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportProblem;
