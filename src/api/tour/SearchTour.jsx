import { baseAxios } from '../Axios';

//지도 검색
export async function SearchTour(searchKeyword) {
  console.log('type은?', typeof searchKeyword);
  try {
    const res = await baseAxios.get(`tourProducts/search-keyword`, { params: { keyword: searchKeyword } });
    console.log('과연', res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
