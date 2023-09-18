import React from "react";
import SignupImage from "./Signup.png";
import styles from "./Signup.module.css";
import { styled } from "styled-components";
import { FormControlLabel, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Input = styled.input`
  width: 100%;
  height: 40px;
  background: #eaf0f7;
  border-radius: 12px;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  background: #4461f2;
  border-radius: 12px;
  color: white;
  border: none;
`;

function Signup() {
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

      <form action="" className={styles.formBox}>
        <TextField fullWidth className={styles.margin} label="이름"></TextField>
        <TextField
          fullWidth
          className={styles.margin}
          label="이메일"
        ></TextField>
        <TextField
          fullWidth
          className={styles.margin}
          label="비밀번호"
        ></TextField>
        <TextField
          fullWidth
          className={styles.margin}
          label="비밀번호 확인"
        ></TextField>
        <TextField
          fullWidth
          className={styles.margin}
          label="닉네임"
        ></TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">국적</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="국적"
          >
            <MenuItem value={10}>대한민국</MenuItem>
            <MenuItem value={20}>중국</MenuItem>
            <MenuItem value={30}>일본</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="남자" />
            <FormControlLabel value="male" control={<Radio />} label="여자" />
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ width: "318px" }} label="생년월일" />
        </LocalizationProvider>
        <FormControl fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">
            가이드 자격증 여부
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Yes" />
            <FormControlLabel value="male" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          className={styles.margin}
          label="핸드폰번호"
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
