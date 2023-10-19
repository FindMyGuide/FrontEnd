import { baseAxios } from '../Axios';

//글 목록 조회
export async function WantAll() {
  try {
    const res = await baseAxios.get('want-tourProducts', {}, {});
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
    return null;
  }
}

//글 수정
export async function UpdateArticle(props) {
  try {
    const res = await baseAxios.post(
      `/want-tourProduct/update`,
      {
        wantTourProductId: props.id,
        vehicle: props.vehicle,
        title: props.title,
        wantDates: props.wantDates,
        themeIds: props.themeIds,
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
    console.log({
      wantTourProductId: props.id,
      vehicle: props.vehicle,
      title: props.title,
      wantDates: props.wantDates,
      themeIds: props.themeIds,
      location: props.location,
      content: props.content,
      price: props.price,
      totalPeople: props.totalPeople
    });
    console.error(e);
    return null;
  }
}

//글 삭제
export async function DeleteArticle(id) {
  try {
    const res = await baseAxios.delete(`/want-tourProduct/delete`, {
      data: { wantTourProductId: id },
      headers: {
        Authorization: sessionStorage.getItem('accessToken')
      }
    });
    return res;
  } catch (e) {
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
