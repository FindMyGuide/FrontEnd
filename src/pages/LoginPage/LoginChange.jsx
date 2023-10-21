import React, { useState } from "react";
import LoginImage from "./Login.png";
import styles from "./Login.module.css";
import { Button, CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import { UserFindId, UserFindPassword, UserLogin } from "../../api/user/User";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function LoginChange() {
  let { token } = useParams();
  const navigate = useNavigate();
  const { register, watch, handleSubmit } = useForm();
  const [mode, setMode] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [findemail, setFindemail] = useState("");

  const loginHandler = async (e) => {
    setLoading(true);
    const userEmail = e.email;
    const res = await UserLogin(e);
    if (res != null) {
      await signInWithEmailAndPassword(auth, e.email, e.password);
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/");
    } else {
      window.alert("아이디나 비밀번호가 틀립니다.");
      setLoading(false);
    }
  };

  const findEmail = async (e) => {
    console.log(e);
    const res = await UserFindId(e.findEmail);
    if (res !== undefined) {
      setEmail(res.data.email);
    } else {
      window.alert("일치하는 이메일이 없습니다.");
    }
  };

  const findPassword = async (e) => {
    const res = await UserFindPassword(e);
    console.log(res);
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

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                fullWidth
              >
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
                Login
              </Button>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  onClick={() => {
                    setMode(2);
                  }}
                >
                  이메일 찾기asdgasd
                </Button>
                <Button
                  onClick={() => {
                    setMode(3);
                  }}
                >
                  비밀번호 찾기
                </Button>
              </div>
              <p style={{ marginTop: "30px" }}>
                아이디가 없으신가요?{" "}
                <a href="/signup" style={{ textDecoration: "none" }}>
                  회원가입
                </a>
              </p>
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

              <Button type="submit" variant="contained" fullWidth>
                이메일 확인
              </Button>
              <Button
                onClick={() => {
                  setMode(1);
                }}
              >
                이전으로 돌아가기
              </Button>
              <p style={{ marginTop: "30px" }}>
                아이디가 없으신가요?{" "}
                <a href="/signup" style={{ textDecoration: "none" }}>
                  회원가입
                </a>
              </p>
            </div>
          </form>
        </>
      )}
      {mode === 3 && (
        <>
          <form
            onSubmit={handleSubmit(findPassword)}
            className={styles.formBox}
          >
            <div className={styles.imgBox}>
              <img src={LoginImage} alt="" className={styles.loginImage} />
            </div>

            <div className={styles.inputBox}>
              <p>비밀번호를 찾기위해 이메일을 입력해주세요.</p>
              <TextField
                required
                fullWidth
                className={styles.margin}
                label="이메일"
                {...register("findEmail")}
              ></TextField>

              <Button type="submit" variant="contained" fullWidth>
                인증메일 전송
              </Button>
              <Button
                onClick={() => {
                  setMode(1);
                }}
              >
                이전으로 돌아가기
              </Button>
              <p style={{ marginTop: "30px" }}>
                아이디가 없으신가요?{" "}
                <a href="/signup" style={{ textDecoration: "none" }}>
                  회원가입
                </a>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default LoginChange;
