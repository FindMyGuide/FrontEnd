import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelSearch } from 'api/recommend/Recommend';
import LocationCard from 'components/Card/Recommend/LocationCard';
import SideBar from 'components/Recommend/SideBar';
import styles from './Recommend.module.css';

function LocationList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchRecommendList() {
      const travelList = await TravelSearch();
      console.log(travelList);
      setList(travelList);
    }

    fetchRecommendList();
  }, []);

  const onDetailHandler = (id) => {
    navigate(`/recommend/location/${id}`);
  };

  return (
    <div className={styles.background}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.title}>부산을 즐겨보세요</span>
          <SideBar />
        </header>

        <div className={styles.length}>
          # 총 <span className="color">{list.length}</span>개의 관광지가 있습니다
        </div>
        <div className={styles.explain}>
          &nbsp;한국관광공사가 제공하는 관광지 중 {list.length}개를 랜덤으로 골라 보여드립니다
        </div>
        <div className={styles.cardContainer2}>
          {list?.map((location, index) => (
            <div key={index} onClick={() => onDetailHandler(location.id)} className={styles.cardItem}>
              <LocationCard location={location} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationList;
