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
          <span className={styles.title}>부산을 즐겨보세요</span>
          <SideBar />
        </header>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.length}>
              # 총 <span className="color">{list.length}</span>개의 축제가 있습니다
            </div>
            <div className={styles.cardContainer}>
              {/* {list?.map((festival, index) => (
                <div key={index} onClick={() => onDetailHandler(festival.id)} className={styles.cardItem}>
                  <FestivalCard festival={festival} />
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantList;
