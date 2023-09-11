import { baseAxios } from "../Axios";

//맛집목록 조회
export async function TastySearch(props) {
  try {
    const res = await baseAxios.get(`v1/recommend/restaurant`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//맛집상세 조회
export async function TastyDetail(props) {
  try {
    const res = await baseAxios.get(`v1/recommend/restaurant/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//관광지목록 조회
export async function TravelSearch(props) {
  try {
    const res = await baseAxios.get(`v1/recommend/department`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//관광지상세 조회
export async function TravelDetail(props) {
  try {
    const res = await baseAxios.get(`v1/recommend/department/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//축제목록 조회
export async function FestivalSearch(props) {
  try {
    const res = await baseAxios.get(`v1/recommend/festival`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

//축제상세 조회
export async function FestivalDetail(props) {
  try {
    const res = await baseAxios.get(`v1/recommend/festival/${props}`, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}
