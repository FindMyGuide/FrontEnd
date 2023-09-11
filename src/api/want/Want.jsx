import axios from "axios";

//글 목록 조회
export async function WantAll() {
  try {
    const res = await axios.get("v1/wanttour", {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//내가 쓴 글 목록 조회
export async function MyArticle() {
  try {
    const res = await axios.get(
      "v1/wanttour/me",
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

//대기 상태 글 목록 조회
export async function WaitAll() {
  try {
    const res = await axios.get("v1/wanttour/wait", {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//글작성
export async function CreateArticle(props) {
  try {
    const res = await axios.get(
      "v1/wanttour/create",
      {
        title: props.title,
        tour_date: props.tour_date,
        theme: props.theme,
        wish: props.wish,
        detail: props.detail,
        persons: props.persons,
        price: props.price,
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

//글수정
export async function UpdateArticle(props) {
  try {
    const res = await axios.patch(
      `v1/wanttour/update/${props.want_id}`,
      {
        title: props.title,
        tour_date: props.tour_date,
        theme: props.theme,
        wish: props.wish,
        detail: props.detail,
        persons: props.persons,
        price: props.price,
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

//글삭제
export async function DeleteArticle(props) {
  try {
    const res = await axios.delete(
      `v1/wanttour/update/${props}`,
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

//글 상세 조회

export async function DetailArticle(props) {
  try {
    const res = await axios.get(
      `v1/wanttour/update/${props}`,
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
