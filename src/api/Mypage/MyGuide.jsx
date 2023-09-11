import { baseAxios } from "../Axios";

//등록한 투어 조회
export async function MytourAll() {
  try {
    const res = await baseAxios.get(
      `v1/mypage/tour/${member_id}`,
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

//투어 예약 조회
export async function MytourReservation(props) {
  try {
    const res = await baseAxios.get(
      `v1/mypage/tour/reservation/${props}`,
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

//투어 등록
export async function MytourResister(props) {
  try {
    const res = await baseAxios.post(
      `v1/mypage/tour/create`,
      {
        tour_title: props.tour_title,
        tour_date: props.tour_date,
        tour_theme: props.tour_theme,
        tour_place: props.tour_place,
        tour_detail: props.tour_detail,
        availdate: props.availdate,
        tour_price: props.tour_price,
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

//투어 수정
export async function MytourUpdate(props) {
  try {
    const res = await baseAxios.patch(
      `v1/mypage/tour/update/${props.tour_id}`,
      {
        tour_title: props.tour_title,
        tour_date: props.tour_date,
        tour_theme: props.tour_theme,
        tour_place: props.tour_place,
        tour_detail: props.tour_detail,
        availdate: props.availdate,
        tour_price: props.tour_price,
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

//투어 삭제
export async function MytourDelete(props) {
  try {
    const res = await baseAxios.delete(
      `v1/mypage/tour/delete/${props}`,
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

//투어 기간 연장
export async function MytourExtend(props) {
  try {
    const res = await baseAxios.delete(
      `v1/tour/extend/${props}`,
      { tour_date: props.tour_date },
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
