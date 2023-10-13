import { baseAxios } from "../Axios";

//비밀번호 변경
export async function UserChangePassword(props) {
  try {
    const res = await baseAxios.post(
      "find-my-guide/member/reset-password",
      {},
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//개인정보 조회
export async function UserInfo(props) {
  try {
    const res = await baseAxios.get(
      "find-my-guide/member/detail",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//개인정보 수정
export async function UserInfoChange(props) {
  try {
    const res = await baseAxios.get(
      "find-my-guide/member/update",
      {
        nickname: props.nickname,
        phoneNumber: props.phoneNumber,
        national_certification_of_quide_yn:
          props.national_certification_of_quide_yn,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//회원 탈퇴
export async function UserDelete() {
  try {
    const res = await baseAxios.delete(
      "find-my-guide/member/delete",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}
