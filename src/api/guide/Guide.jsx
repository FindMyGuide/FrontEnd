import { baseAxios } from '../Axios';

//인기 가이드 조회
export async function GuidePopular() {
  try {
    const res = await baseAxios.get('find-my-guide/guide/popular-guide', {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//가이드 전체 목록 조회
export async function GuideAll() {
  try {
    const res = await baseAxios.get('find-my-guide/guides', {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//가이드 필터링
export async function GuideFilter(props) {
  console.log(props);
  try {
    const res = await baseAxios.get(`find-my-guide/guide/search`, {
      params: {
        gender: props.gender,
        age: `${props.age[0]}-${props.age[1]}`,
        languages: props.languages
      }
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//가이드 상세조회
export async function GuideDetail(props) {
  try {
    const res = await baseAxios.get(`find-my-guide/guide/guides/detail/${props}`, {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//가이드 투어후기
export async function GuideTourReview(guideId) {
  try {
    const res = await baseAxios.get(`find-my-guide/guide/reviews/${guideId}`, {}, {});
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
