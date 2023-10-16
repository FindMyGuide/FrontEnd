import Login from 'pages/LoginPage/Login';
import MainPage from 'pages/MainPage/MainPage';
import React from 'react';

function PublicRouter() {
  const token = sessionStorage.getItem('accessToken');
  return token ? <MainPage /> : <Login />;
}

export default PublicRouter;
