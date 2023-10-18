import { baseAxios } from "../Axios";

//등록한 투어 조회
export async function MyTour() {
  try {
    const res = await baseAxios.get("my-page/tour", {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//투어 예약 조회
export async function MytourReservation(props) {
  try {
    const res = await baseAxios.get(`tourProduct/all-reserved-tour/by-guide`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//투어 삭제
export async function MytourDelete(props) {
  try {
    const res = await baseAxios.post(
      `tourProduct/delete-reserved-tour/${props}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("accessToken"),
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 원해요 매칭
export async function WantTourGuide(props) {
  try {
    const res = await baseAxios.get(
      `tourProduct/all-reserved-wantTour/by-guide`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("accessToken"),
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
  console.log(props);
  try {
    const res = await baseAxios.post(
      `tourProduct/register`,
      {
        title: props.title,
        content: props.content,
        price: props.price,
        languages: props.languages,
        howManyDay: props.howmanydays,
        location: props.location,
        themeIds: props.themeIds,
        availableDates: props.availableDates,
        // images: props.images
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (res.status === 200) {
      console.log("ok");
    } else {
      console.log("no");
    }
    return res;
  } catch (e) {
    console.error("오류", e);
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
// export async function MytourDelete(props) {
//   try {
//     const res = await baseAxios.delete(
//       `v1/mypage/tour/delete/${props}`,
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: sessionStorage.getItem("token"),
//         },
//       }
//     );
//     return res;
//   } catch (e) {
//     console.error(e);
//   }
// }

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
