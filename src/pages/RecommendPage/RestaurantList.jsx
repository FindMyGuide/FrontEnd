import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FestivalSearch } from 'api/recommend/Recommend';
import SideBar from 'components/Recommend/SideBar';
import styles from './Recommend.module.css';

function RestaurantList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState([]);
  // 1: 축제, 2: 관광지, 3: 맛집
  const [category, setCategory] = useState(1);

  useEffect(() => {
    async function fetchRecommendList() {
      const response = await FestivalSearch();
      setList(response.data);
      console.log(response.data);
    }

    fetchRecommendList();
  }, []);

  const onDetailHandler = (id) => {
    navigate(`/festival/${id}`);
  };

  return (
    <div className={styles.background}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.title}>다양한 축제를 둘러보세요</span>
          <div>음악, 먹거리 등 </div>
        </header>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <SideBar />
          </div>
          <div className={styles.content}>내용</div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantList;
