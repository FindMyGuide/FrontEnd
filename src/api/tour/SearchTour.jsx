import { baseAxios } from '../Axios';

export async function SearchTour(searchKeyword) {
  try {
    const res = await baseAxios.get(`tourProducts/search-keyword`, { params: { keyword: searchKeyword } });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
