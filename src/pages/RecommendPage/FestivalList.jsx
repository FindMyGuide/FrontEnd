import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FestivalSearch } from 'api/recommend/Recommend';
import SideBar from 'components/Recommend/SideBar';
import styles from './Recommend.module.css';

function RecommendList() {
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
        <div className={styles.header}>여러 축제를 둘러보세요</div>
        <SideBar />
      </div>
    </div>
  );
}

export default RecommendList;
