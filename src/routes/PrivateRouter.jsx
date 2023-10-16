import Login from 'pages/LoginPage/Login';
import MainPage from 'pages/MainPage/MainPage';
import React from 'react';

function PrivateRouter() {
  const token = sessionStorage.getItem('accessToken');
  return token ? <Login /> : <MainPage />;
}
export default PrivateRouter;
