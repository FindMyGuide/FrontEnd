import { baseAxios } from "../Axios";

//예약한 투어 조회
export async function FutureReservation() {
  try {
    const res = await baseAxios.get(
      "v1/mypage/reservation/future",
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

//지난 투어 조회
export async function CompletedTours() {
  try {
    const res = await baseAxios.get("my-page/reservation/completed-tours", {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//투어 리뷰 등록
export async function ReviewResister(props) {
  try {
    const res = await baseAxios.post(
      `tour-product-review/register/${props.tour_id}`,
      {
        content: props.content,
        rating: props.rating,
        image: props.image,
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

//좋아요한 투어 조회
export async function LikeTour(props) {
  try {
    const res = await baseAxios.get(
      `v1/mypage/like/tour`,
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

//좋아요한 관광지 조회
export async function LikeLocation(props) {
  try {
    const res = await baseAxios.get(
      `v1/mypage/like/location`,
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

//좋아요한 가이드 조회
export async function LikeGuide(props) {
  try {
    const res = await baseAxios.get(
      `v1/mypage/like/guide`,
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

//가이드 자격증 등록
export async function CertificationResister(props) {
  try {
    const res = await baseAxios.post(
      `v1/mypage/like/guide`,
      {
        certification: props.certification,
        language: props.language,
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

//가이드등록 여부 확인
export async function CheckCertification(props) {
  try {
    const res = await baseAxios.get(
      `v1/mypage/${props}`,
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

//가이드 등록
export async function GuideResister(props) {
  try {
    const res = await baseAxios.post(
      `v1/mypage/${props}`,
      { detail: props.detail },
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

//개인정보 조회
export async function UserInfo(props) {
  try {
    const res = await baseAxios.get("find-my-guide/member/detail", {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    });
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
