import React, { useState } from "react";
import SignupImage from "./Signup.png";
import styles from "./Signup.module.css";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { Stack } from "react-bootstrap";

import { useForm } from "react-hook-form";
import {
  UserEmailcheck,
  UserNicknamecheck,
  UserPhonecheck,
  UserSignup,
  UserSignupEmail,
} from "../../api/user/User";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const languageList = [
  { title: "한국어", value: "KOREAN" },
  { title: "영어", value: "ENGLISH" },
  { title: "스페인어", value: "SPANISH" },
  { title: "일본어", value: "JAPANESE" },
  { title: "중국어", value: "CHINESE" },
  { title: "베트남어", value: "KKK" },
  { title: "프랑스어", value: "FRENCH" },
  { title: "러시아어", value: "RUSSIAN" },
  { title: "이탈리아어", value: "ITALIAN" },
];

function Signup() {
  const navigate = useNavigate();

  const nameRex = /^[가-힣]{2,6}$/;
  const emailRex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const pwdRex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;
  const phoneRex = /^010-\d{3,4}-\d{4}$/;

  const [checkEmail, setEmail] = useState(false);
  const [checkNick, setNick] = useState(false);
  const [checkPhone, setPhone] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);
  const [nickLoading, setNickLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);

  const [mode, setMode] = useState(1);
  const [nationality, setNationality] = useState("");
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const signupHandler = async (e) => {
    setLoading(true);
    const data = { ...e, nationality: nationality, languages: languages };
    const res = await UserSignup(data);
    console.log(res);
    if (res !== undefined) {
      setLoading(false);
      setMode(3);
    } else {
      setLoading(false);
      window.alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const changeEmail = async (e) => {
    const res = await UserEmailcheck(watch("email"));
    setEmailLoading(false);
    if (watch("email") && res.data === true) {
      setEmail(true);
    } else {
      setEmail(false);
    }
  };

  const changeNickname = async (e) => {
    const res = await UserNicknamecheck(watch("nickname"));
    setNickLoading(false);
    if (watch("nickname") && res.data === true) {
      setNick(true);
    } else {
      setNick(false);
    }
  };

  const changePhone = async (e) => {
    const res = await UserPhonecheck(watch("phoneNumber"));
    setPhoneLoading(false);
    if (watch("phoneNumber") && res.data === true) {
      setPhone(true);
    } else {
      setPhone(false);
    }
  };

  const checkCode = async (e) => {
    const data = {
      code: watch("code"),
      email: watch("email"),
    };
    const res = await UserSignupEmail(data);
    if (res.data != null) {
      window.alert("인증이 완료되었습니다.로그인 페이지로 이동합니다.");
      navigate("/login");
    } else {
      window.alert("인증번호가 틀립니다.");
    }
  };

  const changeNationality = (e) => {
    setNationality(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(signupHandler)} className={styles.formBox}>
          <div className={styles.imgBox}>
            <img src={SignupImage} alt="" className={styles.signupImage} />
            {/* <h1 className={styles.welcome}>
              Welcome to
              <br />
              Find My Guide!
            </h1> */}
          </div>
          {mode === 1 && (
            <>
              <div className={styles.inputBox}>
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
                    watch("email") &&
                    (emailRex.test(watch("email"))
                      ? !emailLoading &&
                        (checkEmail
                          ? "사용가능한 이메일입니다."
                          : "중복된 이메일입니다.")
                      : "이메일 형식이 아닙니다.")
                  }
                  onFocus={() => {
                    setEmailLoading(true);
                    setEmail(false);
                  }}
                  onBlur={changeEmail}
                ></TextField>
                <TextField
                  required
                  fullWidth
                  className={styles.margin}
                  label="비밀번호"
                  type="password"
                  sx={{ whiteSpace: "pre-line" }}
                  {...register("password")}
                  helperText={
                    !pwdRex.test(watch("password")) &&
                    watch("password") &&
                    `영문,숫자,특수기호를 포함한 8자리 이상,\n 15자리 이하`
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
                  onBlur={changeNickname}
                  onFocus={() => {
                    setNickLoading(true);
                    setNick(false);
                  }}
                  helperText={
                    !nickLoading &&
                    watch("nickname") &&
                    (checkNick
                      ? "사용가능한 닉네임입니다."
                      : "중복된 닉네임입니다.")
                  }
                ></TextField>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">국적</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    value={nationality}
                    label="국적"
                    onChange={changeNationality}
                  >
                    <MenuItem value="대한민국">대한민국</MenuItem>
                    <MenuItem value="중국">중국</MenuItem>
                    <MenuItem value="일본">일본</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  required
                  className={styles.margin}
                  label="핸드폰번호"
                  {...register("phoneNumber")}
                  helperText={
                    watch("phoneNumber") &&
                    (phoneRex.test(watch("phoneNumber"))
                      ? !phoneLoading &&
                        (checkPhone
                          ? "사용가능한 번호입니다."
                          : "중복된 번호입니다.")
                      : "번호 형식이 아닙니다.")
                  }
                  onFocus={() => {
                    setPhoneLoading(true);
                    setPhone(false);
                  }}
                  onBlur={changePhone}
                ></TextField>
                {nameRex.test(watch("name")) &&
                emailRex.test(watch("email")) &&
                pwdRex.test(watch("password")) &&
                watch("password") === watch("passwordCheck") &&
                checkEmail &&
                checkNick &&
                checkPhone &&
                phoneRex.test(watch("phoneNumber")) ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setMode(2);
                    }}
                  >
                    다음단계
                  </Button>
                ) : (
                  <Button variant="contained" disabled>
                    다음단계
                  </Button>
                )}
                <h5 style={{ marginTop: "30px" }}>
                  Are you a member? <a href="/login">Login now</a>
                </h5>
              </div>
            </>
          )}
          {mode === 2 && (
            <>
              <div className={styles.inputBox}>
                <FormControl required fullWidth>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    성별
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      {...register("gender")}
                      value="MALE"
                      control={<Radio />}
                      label="남자"
                    />
                    <FormControlLabel
                      {...register("gender")}
                      value="FEMALE"
                      control={<Radio />}
                      label="여자"
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  required
                  fullWidth
                  focused
                  type="date"
                  label="생년월일"
                  {...register("birthDate")}
                ></TextField>

                <FormControl required fullWidth>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    가이드 자격증 여부
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      {...register("nationalCertificationOfGuideYn")}
                      value="Y"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      {...register("nationalCertificationOfGuideYn")}
                      value="N"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                {watch("nationalCertificationOfGuideYn") === "Y" && (
                  <>
                    <TextField
                      fullWidth
                      type="number"
                      label="(추가사항)가이드 경력(년)"
                      {...register("guideExperience")}
                    ></TextField>

                    <TextField
                      fullWidth
                      label="(추가사항)가이드 소개"
                      {...register("guideIntroduction")}
                    ></TextField>

                    <div>
                      <Stack spacing={3}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          sx={{ width: 300 }}
                          options={languageList}
                          getOptionLabel={(option) => option.title}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                placeholder:
                                  languages.length > 0 ? "" : "언어 검색",
                              }}
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                          }
                          onChange={(event, value) => {
                            const selectedLanguageTitles = value.map(
                              (language) => language.value
                            );
                            setLanguages(selectedLanguageTitles);
                          }}
                        />
                      </Stack>
                    </div>
                  </>
                )}

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setMode(1);
                    }}
                    sx={{ marginRight: 5 }}
                  >
                    이전단계
                  </Button>
                  {nameRex.test(watch("name")) &&
                  emailRex.test(watch("email")) &&
                  pwdRex.test(watch("password")) &&
                  watch("password") === watch("passwordCheck") &&
                  watch("nationalCertificationOfGuideYn") &&
                  watch("gender") &&
                  checkEmail &&
                  checkNick &&
                  checkPhone &&
                  phoneRex.test(watch("phoneNumber")) ? (
                    <>
                      {/* <Box sx={{ m: 1, position: "relative" }}> */}
                      <Button
                        variant="contained"
                        disabled={loading}
                        type="submit"
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
                        이메일 인증
                      </Button>

                      {/* </Box> */}
                    </>
                  ) : (
                    <Button variant="contained" disabled>
                      이메일 인증
                    </Button>
                  )}
                </div>

                <h5 style={{ marginTop: "30px" }}>
                  Are you a member? <a href="/login">Login now</a>
                </h5>
              </div>
            </>
          )}

          {mode === 3 && (
            <>
              <div className={styles.inputBox}>
                <p style={{ width: "100%", textAlign: "start" }}>
                  인증코드가 전송되었습니다.
                </p>
                <TextField
                  fullWidth
                  className={styles.margin}
                  label="인증번호"
                  {...register("code")}
                ></TextField>
                <Button variant="contained" onClick={checkCode}>
                  이메일 인증완료
                </Button>
                <h5 style={{ marginTop: "30px" }}>
                  Are you a member? <a href="/login">Login now</a>
                </h5>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
