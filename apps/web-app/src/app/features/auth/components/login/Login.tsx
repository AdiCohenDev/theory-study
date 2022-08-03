import React from 'react';
import Authentication from '../../shared/components/Authentication';

const Login = () => {
  return (
    <>
      <Authentication authTitle="ברוכים השבים!" buttonText="התחבר" noAccount={true} />
    </>
  );
};

export default Login;
