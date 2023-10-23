import { baseAxios } from '../Axios';

//등록한 투어 조회
export async function MyTour() {
  try {
    const res = await baseAxios.get('my-page/tour', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken')
      }
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
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

//투어 등록
export async function MytourResister(formData) {
  for (let [key, value] of formData.entries()) {
  }
  try {
    const res = await baseAxios.post(`tourProduct/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        charset: 'utf-8',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });

    return res;
  } catch (e) {
    console.error('오류', e);
  }
}

// //투어 수정
// export async function MytourUpdate(props) {
//   try {
//     const res = await baseAxios.patch(
//       `v1/mypage/tour/update/${props.tour_id}`,
//       {
//         tour_title: props.tour_title,
//         tour_date: props.tour_date,
//         tour_theme: props.tour_theme,
//         tour_place: props.tour_place,
//         tour_detail: props.tour_detail,
//         availdate: props.availdate,
//         tour_price: props.tour_price,
//       },
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

//투어 삭제
export async function MytourDelete(props) {
  try {
    const res = await baseAxios.delete(`tourProduct/delete/${props}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

// //투어 기간 연장
// export async function MytourExtend(props) {
//   try {
//     const res = await baseAxios.delete(
//       `v1/tour/extend/${props}`,
//       { tour_date: props.tour_date },
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

// 원해요 매칭
export async function WantTourGuide(props) {
  try {
    const res = await baseAxios.get(`tourProduct/all-reserved-wantTour/by-guide`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}
