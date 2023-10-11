import React, { useState } from "react";
import LoginImage from "./Login.png";
import styles from "./Login.module.css";
import { styled } from "styled-components";
import { TextField } from "@mui/material";
import { UserLogin } from "../../api/user/User";

const Input = styled.input`
  width: 100%;
  height: 60px;
  background: #eaf0f7;
  border-radius: 12px;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  background: #4461f2;
  border-radius: 12px;
  color: white;
  border: none;
`;

function Login() {
  const loginSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      email: e.target[0].value,
      password: e.target[2].value,
    };
    const res = await UserLogin(sendData);
  };
  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src={LoginImage} alt="" className={styles.loginImage} />
        <h1 className={styles.welcome}>
          Welcome to
          <br />
          Find My Guide!
        </h1>
      </div>

      <form onSubmit={loginSubmit} className={styles.formBox}>
        <TextField fullWidth label="이메일"></TextField>
        <TextField fullWidth label="비밀번호" type="password"></TextField>
        <Button type="submit">Login</Button>
        <h5>
          Not a member? <a href="/signup">Sign up now</a>
        </h5>
      </form>
    </div>
  );
}

export default Login;
