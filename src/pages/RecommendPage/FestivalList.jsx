import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FestivalSearch } from 'api/recommend/Recommend';
// import SideBar from 'components/Recommend/SideBar';
import FestivalCard from 'components/Card/FestivalCard';
import styles from './Recommend.module.css';
import SideBar from 'components/Recommend/SideBar';

function FestivalList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchFestivalList() {
      const festivalList = await FestivalSearch();
      console.log(festivalList);
      setList(festivalList);
    }

    fetchFestivalList();
  }, []);

  const onDetailHandler = (id) => {
    navigate(`/recommend/festival/${id}`);
  };

  return (
    <div className={styles.background}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.title}>부산을 즐겨보세요</span>
          <SideBar />
        </header>
        <div className={styles.container}>
          {/* <div className={styles.sidebar}>
            <SideBar />
          </div> */}
          <div className={styles.content}>
            <div className={styles.length}>
              # 총 <span className="color">{list.length}</span>개의 축제가 있습니다
            </div>
            <div className={styles.cardContainer}>
              {list?.map((festival, index) => (
                <div key={index} onClick={() => onDetailHandler(festival.id)} className={styles.cardItem}>
                  <FestivalCard festival={festival} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FestivalList;
