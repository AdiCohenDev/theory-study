import React, { useRef, useState } from 'react';
import './ReportProblem.css';
// @ts-ignore
import emailjs from '@emailjs/browser';
import store from '../../../../../stores/Store';

const ReportProblem = () => {
  const [userProblem, setUserProblem] = useState('');
  const [message, setMessage] = useState('');
  const form: any = useRef();

  const sendUserProblem = async (e: any) => {
    e.preventDefault();
    emailjs.sendForm('service_uif8xef', 'template_19pli5i', form.current, 'u6-3LEVQRHWt7qLvU').then(
      (result: any) => {
        setMessage('הודעתך נשלחה בהצלחה.');
        setUserProblem('');
      },
      (error: any) => {
        setMessage('אירעה בעיה אנא נסה שנית.');
      }
    );
  };

  const handleMessageChange = (event: any): void => {
    console.log(event);
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
