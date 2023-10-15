import { baseAxios } from '../Axios';

//글 목록 조회
export async function WantAll() {
  try {
    const res = await baseAxios.get('want-tourProducts', {}, {});
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//내가 쓴 글 목록 조회
export async function MyArticle() {
  try {
    const res = await baseAxios.get(
      'v1/wanttour/me',
      {},
      {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('accessToken')
        }
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//대기 상태 글 목록 조회
export async function WaitAll() {
  try {
    const res = await baseAxios.get('v1/wanttour/wait', {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//글 작성
export async function CreateArticle(props) {
  try {
    const res = await baseAxios.post(
      '/want-tourProduct/register',
      {
        vehicle: props.vehicle,
        title: props.title,
        wantDates: props.wantDates,
        themeId: props.themeId,
        location: props.location,
        content: props.content,
        price: props.price,
        totalPeople: props.totalPeople
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

//글 수정
export async function UpdateArticle(props) {
  try {
    const res = await baseAxios.patch(
      `v1/wanttour/update/${props.want_id}`,
      {
        title: props.title,
        tour_date: props.tour_date,
        theme: props.theme,
        wish: props.wish,
        detail: props.detail,
        persons: props.persons,
        price: props.price
      },
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

//글 삭제
export async function DeleteArticle(id) {
  console.log(id);
  // const obj = { wantTourProductId: id };
  try {
    const res = await baseAxios.delete(`/want-tourProduct/delete`, {
      data: { wantTourProductId: id },
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    console.log(id);
    return res;
  } catch (e) {
    console.log(id);
    console.error(e);
  }
}

//글 상세 조회

export async function DetailArticle(id) {
  try {
    const res = await baseAxios.get(`/want-tourProduct/${id}`, {}, {});
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
