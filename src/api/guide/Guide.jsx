import { baseAxios } from "../Axios";

//인기 가이드 조회
export async function GuidePopular() {
  try {
    const res = await baseAxios.get(
      "find-my-guide/guides/popular-guide",
      {},
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//가이드 전체 목록 조회
export async function GuideAll() {
  try {
    const res = await baseAxios.get("find-my-guide/guides", {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//가이드 필터링
export async function GuideFilter(props) {
  try {
    const res = await baseAxios.post(
      "find-my-guide/guides",
      {
        gender: props.gender,
        age: props.age,
        language: props.language,
        date: props.date,
      },
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//가이드 상세조회
export async function GuideDetail(props) {
  try {
    const res = await baseAxios.get(
      `find-my-guide/guides/detail/${props}`,
      {},
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

//가이드 투어후기
export async function GuideTourReview(props) {
  try {
    const res = await baseAxios.get(
      `find-my-guide/guides/all/${props}`,
      {},
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}
