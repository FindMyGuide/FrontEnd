import React from "react";
import LoginImage from "./Login.png";
import styles from "./Login.module.css";
import { styled } from "styled-components";
import { TextField } from "@mui/material";
import { UserLogin } from "../../api/user/User";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 100%;
  height: 56px;
  background: #4461f2;
  border-radius: 12px;
  color: white;
  border: none;
`;

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const loginHandler = async (e) => {
    const res = await UserLogin(e);
    console.log(res);
    if (res != null) {
      sessionStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      window.alert("로그인 성공! 메인페이지로 이동합니다.");
      navigate("/");
    } else {
      window.alert("아이디나 비밀번호가 틀립니다.");
    }
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

      <form onSubmit={handleSubmit(loginHandler)} className={styles.formBox}>
        <TextField
          required
          fullWidth
          className={styles.margin}
          label="이메일"
          {...register("email")}
        ></TextField>
        <TextField
          required
          fullWidth
          className={styles.margin}
          label="비밀번호"
          type="password"
          {...register("password")}
        ></TextField>

        <Button type="submit">Login</Button>
        <h5>
          Not a member? <a href="/signup">Sign up now</a>
        </h5>
      </form>
    </div>
  );
}

export default Login;
