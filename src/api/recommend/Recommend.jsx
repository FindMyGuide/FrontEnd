import { baseAxios } from '../Axios';

//맛집목록 조회
export async function TastySearch(props) {
  try {
    const res = await baseAxios.get(`/restaurants`, {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//맛집상세 조회
export async function TastyInfo(id) {
  try {
    const res = await baseAxios.get(`/restaurant/${id}`, {}, {});
    console.log(res.data, '맛집');
    return res.data;
  } catch (e) {
    console.log(id, '맛집');
    console.error(e);
  }
}

//관광지목록 조회
export async function TravelSearch(props) {
  try {
    const res = await baseAxios.get(`/tour-location`, {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//관광지상세 조회
export async function TravelInfo(id) {
  try {
    const res = await baseAxios.get(`/tourLocationDetail/${id}`, {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//축제목록 조회
export async function FestivalSearch(props) {
  try {
    const res = await baseAxios.get(`/festival/recommend/`, {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//축제상세 조회
export async function FestivalInfo(id) {
  try {
    const res = await baseAxios.get(`/festivalDetail/${id}`, {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
