import { baseAxios } from '../Axios';

//맛집목록 조회
export async function ReviewRecent(props) {
  try {
    const res = await baseAxios.get(``, {}, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}
