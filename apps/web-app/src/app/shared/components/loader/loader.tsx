import React from 'react';
import { useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import './loader.css';

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ffffff');

  return (
    <div className="loaderContainer">
      <div className="loader-container">
        <BeatLoader color={color} loading={loading} size={12} />
      </div>
    </div>
  );
};

export default Loader;
