import React, { useState } from "react";
import LoginImage from "./Login.png";
import styles from "./Login.module.css";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { UserFindId, UserLogin } from "../../api/user/User";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { register, watch, handleSubmit } = useForm();
  const [mode, setMode] = useState(1);
  const [email, setEmail] = useState("");

  const loginHandler = async (e) => {
    const userEmail = e.email;
    const res = await UserLogin(e);
    console.log(res);
    if (res != null) {
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      window.alert("로그인 성공! 메인페이지로 이동합니다.");
      navigate("/");
    } else {
      window.alert("아이디나 비밀번호가 틀립니다.");
    }
  };

  const findEmail = async (e) => {
    const data = {
      name: watch("name"),
      phoneNumber: watch("phoneNumber"),
    };

    const res = await UserFindId(data);
    if (res !== undefined) {
      setEmail(res.data.email);
    } else {
      window.alert("일치하는 이메일이 없습니다.");
    }
  };
  return (
    <div className="container">
      {mode === 1 && (
        <>
          <form
            onSubmit={handleSubmit(loginHandler)}
            className={styles.formBox}
          >
            <div className={styles.imgBox}>
              <img src={LoginImage} alt="" className={styles.loginImage} />
            </div>

            <div className={styles.inputBox}>
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

              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
              <Button
                onClick={() => {
                  setMode(2);
                }}
              >
                이메일 찾기
              </Button>
              <h5 style={{ marginTop: "30px" }}>
                Are you a member? <a href="/signup">Signup now</a>
              </h5>
            </div>
          </form>
        </>
      )}
      {mode === 2 && (
        <>
          <form onSubmit={handleSubmit(findEmail)} className={styles.formBox}>
            <div className={styles.imgBox}>
              <img src={LoginImage} alt="" className={styles.loginImage} />
            </div>

            <div className={styles.inputBox}>
              <p>이메일을 찾기위해 정보를 입력해주세요.</p>
              <p>나의 이메일 : {email}</p>
              <TextField
                required
                fullWidth
                className={styles.margin}
                label="이름"
                {...register("name")}
              ></TextField>
              <TextField
                required
                fullWidth
                className={styles.margin}
                label="핸드폰 번호"
                {...register("phoneNumber")}
              ></TextField>

              <Button onClick={findEmail} variant="contained" fullWidth>
                이메일 확인
              </Button>
              <Button
                onClick={() => {
                  setMode(1);
                }}
              >
                이전으로 돌아가기
              </Button>
              <h5 style={{ marginTop: "30px" }}>
                Are you a member? <a href="/signup">Signup now</a>
              </h5>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
