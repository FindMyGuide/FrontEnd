import { baseAxios } from '../Axios';

//지도 검색
export async function SearchArea(keyword) {
  try {
    const res = await baseAxios.get('tourProducts/search-keyword', { params: { keyword: keyword } }, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
