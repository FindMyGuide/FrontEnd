import { baseAxios } from '../Axios';

//회원가입
export async function UserSignup(props) {
  try {
    const res = await baseAxios.post(
      'find-my-guide/member/initiate-sign-up',
      {
        name: props.name,
        email: props.email,
        password: props.password,
        nickname: props.nickname,
        nationality: props.nationality,
        gender: props.gender,
        birthDate: props.birthDate,
        phoneNumber: props.phoneNumber,
        nationalCertificationOfGuideYn: props.nationalCertificationOfGuideYn,
        guideExperience: Number(props.guideExperience),
        guideIntroduction: props.guideIntroduction,
        guideProfilePicture: '',
        languages: props.languages
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//회원가입-이메일 인증
export async function UserSignupEmail(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/complete-sign-up', {
      email: props.email,
      code: props.code
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//이메일 중복확인
export async function UserEmailcheck(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/check-duplicate', {
      email: props
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//닉네임 중복확인
export async function UserNicknamecheck(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/check-nickname', {
      nickname: props
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//핸드폰 중복확인
export async function UserPhonecheck(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/check-phoneNumber', {
      phoneNumber: props
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//로그인
export async function UserLogin(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/sign-in', {
      email: props.email,
      password: props.password
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//로그아웃
export async function UserLogout(props) {
  try {
    const res = await baseAxios.get(
      'find-my-guide/member/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('token')
        }
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//아이디 찾기
export async function UserFindId(props) {
  try {
    const res = await baseAxios.post(
      'find-my-guide/member/find-email',
      {
        name: props.name,
        phoneNumber: props.phoneNumber
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//비밀번호 찾기
export async function UserFindPassword(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/initiate-change-password', { email: props }, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//비밀번호 변경
export async function UserChangePassword(props) {
  try {
    const res = await baseAxios.post('find-my-guide/member/reset-password', {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}
