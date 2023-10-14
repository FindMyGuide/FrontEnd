import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TastySearch } from 'api/recommend/Recommend';
import TastyCard from 'components/Card/Recommend/TastyCard';
import SideBar from 'components/Recommend/SideBar';
import styles from './Recommend.module.css';

function TastyList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchRecommendList() {
      const tastyList = await TastySearch();
      setList(tastyList);
      console.log(tastyList);
    }

    fetchRecommendList();
  }, []);

  const onDetailHandler = (id) => {
    navigate(`/recommend/tasty/${id}`);
  };

  return (
    <div className={styles.background}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.title}>부산을 즐겨보세요</span>
          <SideBar />
        </header>

        <div className={styles.length}>
          # 총 <span className="color">{list.length}</span>개의 맛집이 있습니다
        </div>
        <div className={styles.explain}>
          &nbsp;부산광역시가 제공하는 맛집 중 {list.length}개를 랜덤으로 골라 보여드립니다
        </div>
        <div className={styles.cardContainer2}>
          {list?.map((tasty, index) => (
            <div key={index} onClick={() => onDetailHandler(tasty.id)} className={styles.cardItem}>
              <TastyCard tasty={tasty} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TastyList;
