import React from "react";
import SignupImage from "./Signup.png";
import styles from "./Signup.module.css";
import { styled } from "styled-components";
import { FormControlLabel, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { useForm } from "react-hook-form";
import { UserSignup } from "../../api/user/User";

const Button = styled.button`
  width: 100%;
  height: 60px;
  background: #4461f2;
  border-radius: 12px;
  color: white;
  border: none;
`;

function Signup() {
  const nameRex = /^[가-힣]{2,6}$/;
  const emailRex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const pwdRex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;
  const phoneRex = /^010-\d{3,4}-\d{4}$/;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const signupHandler = async (e) => {
    const data = e;
    data.birthDate = data.birthDate.replace(/-/g, "");
    const res = await UserSignup(e);
    console.log(res);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src={SignupImage} alt="" className={styles.signupImage} />
        <h1 className={styles.welcome}>
          Welcome to
          <br />
          Find My Guide!
        </h1>
      </div>

      <form onSubmit={handleSubmit(signupHandler)} className={styles.formBox}>
        <TextField
          {...register("name")}
          required
          fullWidth
          className={styles.margin}
          label="이름"
          error={!!errors.name}
          helperText={
            !nameRex.test(watch("name")) &&
            watch("name") &&
            "이름형식이 아닙니다."
          }
        ></TextField>

        <TextField
          required
          fullWidth
          className={styles.margin}
          label="이메일"
          {...register("email")}
          helperText={
            !emailRex.test(watch("email")) &&
            watch("email") &&
            "이메일형식이 아닙니다."
          }
        ></TextField>

        <TextField
          required
          fullWidth
          className={styles.margin}
          label="비밀번호"
          type="password"
          {...register("password")}
          helperText={
            !pwdRex.test(watch("password")) &&
            watch("password") &&
            "영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하"
          }
        ></TextField>

        <TextField
          required
          fullWidth
          className={styles.margin}
          label="비밀번호 확인"
          {...register("passwordCheck")}
          type="password"
          helperText={
            watch("passwordCheck") &&
            watch("password") !== watch("passwordCheck") &&
            "비밀번호가 다릅니다."
          }
        ></TextField>

        <TextField
          required
          fullWidth
          className={styles.margin}
          label="닉네임"
          {...register("nickname")}
        ></TextField>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">국적</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="국적"
            {...register("nationality")}
          >
            <MenuItem value="Korea">대한민국</MenuItem>
            <MenuItem value="China">중국</MenuItem>
            <MenuItem value="Japan">일본</MenuItem>
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            {...register("gender")}
          >
            <FormControlLabel value="FEMALE" control={<Radio />} label="남자" />
            <FormControlLabel value="MALE" control={<Radio />} label="여자" />
          </RadioGroup>
        </FormControl>

        <TextField
          required
          fullWidth
          type="date"
          {...register("birthDate")}
        ></TextField>
        <FormControl fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">
            가이드 자격증 여부
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            {...register("nationalCertificationOfGuideYn")}
          >
            <FormControlLabel value="Y" control={<Radio />} label="Y" />
            <FormControlLabel value="N" control={<Radio />} label="N" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          required
          className={styles.margin}
          label="핸드폰번호"
          {...register("phoneNumber")}
          helperText={
            !phoneRex.test(watch("phoneNumber")) &&
            watch("phoneNumber") &&
            "-를 넣어 작성해주세요."
          }
        ></TextField>

        <div className={styles.inputBox}>
          <Button>Sign up</Button>
        </div>
        <h5>
          Are you a member? <a href="/login">Login now</a>
        </h5>
      </form>
    </div>
  );
}

export default Signup;
