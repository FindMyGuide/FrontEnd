import { baseAxios } from '../Axios';

//예약한 투어 조회
export async function UpcomingTours() {
  try {
    const res = await baseAxios.get('my-page/reservation/upcoming-tours', {
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

//지난 투어 조회
export async function CompletedTours() {
  try {
    const res = await baseAxios.get('my-page/reservation/completed-tours', {
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

//좋아요한 투어 조회
export async function LikeTour(props) {
  try {
    const res = await baseAxios.get(`my-page/like/tour`, {
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

//좋아요한 가이드 조회
export async function LikeGuide(props) {
  try {
    const res = await baseAxios.get(`guide-like/guide-list`, {
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

//회원이 쓴 원해요 글 목록
export async function MemberWantTour(props) {
  try {
    const res = await baseAxios.get(`want-tourProduct/login-user`, {
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

//개인정보 조회
export async function UserInfo(props) {
  try {
    const res = await baseAxios.get('find-my-guide/member/detail', {
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

//개인정보 수정
export async function UserInfoChange(formData) {
  try {
    const res = await baseAxios.post('find-my-guide/member/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 비밀번호 변경
export async function PassWordChange(props) {
  try {
    const res = await baseAxios.post(
      'find-my-guide/member/change-password',
      {
        password: props.password,
        newPassword: props.newPassword,
        newPasswordAgain: props.newPasswordAgain
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('accessToken')
        }
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 리뷰 등록
export async function PostReview({ tour_id, content, rating, image }) {
  try {
    let formData = new FormData();

    // 이미지 파일을 File 객체로 추가
    if (image) {
      formData.append('file', image);
    }

    // 나머지 데이터를 JSON 형태로 변환 후 Blob으로 추가
    const data = {
      content: content,
      rating: rating
    };

    formData.append(
      'tourProductReviewRequest',
      new Blob([JSON.stringify(data)], {
        type: 'application/json; charset=UTF-8'
      })
    );

    const res = await baseAxios.post(`tour-product-review/register/${tour_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });

    return res;
  } catch (e) {
    console.error(e);
  }
}
// 내가 쓴 리뷰 리스트
export async function GetReview(props) {
  try {
    const res = await baseAxios.get('tour-product-review/all/by-member', {
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

// 리뷰 삭제
export async function ReviewDelete(props) {
  try {
    const res = await baseAxios.delete(`tour-product-review/delete/${props}`, {
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

// 자격증 등록
export async function CertificationRegistration(props) {
  try {
    let formData = new FormData();
    formData.append('image', props.image);

    const res = await baseAxios.post(`find-my-guide/guide/register-guide-certification`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}
