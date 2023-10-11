import React, { useState, useEffect } from 'react';
import { TourPopular } from 'api/tour/Tour';
import { GuidePopular } from 'api/guide/Guide';
import Carousel from 'components/Carousel/Carousel';
import SearchBar from 'components/SearchBar/SearchBar';
import styles from './MainPage.module.css';
import { Fade } from 'react-awesome-reveal';

function MainPage() {
  const [tourList, setTourList] = useState([]);
  const [guideList, setGuideList] = useState([]);

  useEffect(() => {
    async function fetchTourList() {
      const tourPopular = await TourPopular();
      const guidePopular = await GuidePopular();
      setTourList(tourPopular);
      setGuideList(guidePopular);
    }

    fetchTourList();
  }, []);

  return (
    <div className={styles.background}>
      <div className="container">
        <Fade cascade damping={0.1}>
          <header className={styles.header}>
            <span className={styles.title}>당신이 가고싶은 여행을 검색하세요</span>
            <SearchBar />
          </header>
          <div className={styles.subtitle}>인기 투어를 구경해보세요</div>
          {/* <Carousel list={tourList}></Carousel> */}
          <div className={styles.subtitle}>인기 가이드를 구경해보세요</div>
          <div className={styles.subtitle}>여러가지 축제가 진행중입니다</div>
          <div className={styles.subtitle}>인기 여행지를 구경해보세요</div>
          <Carousel></Carousel>
          <div className={styles.subtitle}>실제 이용자들의 후기를 둘러보세요</div>
        </Fade>
      </div>
    </div>
  );
}

export default MainPage;
