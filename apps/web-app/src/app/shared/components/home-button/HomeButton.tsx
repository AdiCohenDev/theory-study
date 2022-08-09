import React from 'react';
import { IoHome } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css';
const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button className="home-btn" onClick={() => navigate('/')}>
      <IoHome size={26} color={'var(--blue)'} />
    </button>
  );
};

export default HomeButton;
