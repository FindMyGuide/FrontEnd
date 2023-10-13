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
    const res = await baseAxios.get(
      'wantTourProduct/register',
      {
        title: props.title,
        date: props.date,
        themes: props.themes,
        locations: props.locations,
        content: props.content,
        persons: props.persons
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
export async function DeleteArticle(props) {
  try {
    const res = await baseAxios.delete(
      `v1/wanttour/update/${props}`,
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

//글 상세 조회

export async function DetailArticle(props) {
  try {
    const res = await baseAxios.get(
      `v1/wanttour/update/${props}`,
      {}
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: sessionStorage.getItem('token')
      //   }
      // }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}
