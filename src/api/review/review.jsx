import { baseAxios } from '../Axios';

// 최신 리뷰 10개 조회
export async function ReviewRecent(props) {
  try {
    const res = await baseAxios.get('tour-product-review/recent-reviews', {}, {});
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
