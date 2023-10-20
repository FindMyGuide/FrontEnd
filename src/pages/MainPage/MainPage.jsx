import React, { useState, useEffect } from 'react';
import { TourPopular } from 'api/tour/Tour';
import { GuidePopular } from 'api/guide/Guide';
import { ReviewRecent } from 'api/review/review';
import Carousel from 'components/Carousel/Carousel';
import VerticalCarousel from 'components/Carousel/VerticalCarousel';
import FestCarousel from 'components/Carousel/FestCarousel';
import SearchBar from 'components/SearchBar/SearchBar';
import GuideCards from 'components/Card/GuideCards';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';
import styles from './MainPage.module.css';
import { Fade } from 'react-awesome-reveal';

function MainPage() {
  const [tourList, setTourList] = useState(null);
  const [guideList, setGuideList] = useState(null);
  const [reviewList, setReviewList] = useState(null);

  useEffect(() => {
    async function fetchTourList() {
      const tourPopular = await TourPopular();
      const guidePopular = await GuidePopular();
      const reviewRecent = await ReviewRecent();
      setTourList(tourPopular);
      setReviewList(reviewRecent);
      if (guidePopular && guidePopular.length >= 6) {
        setGuideList(guidePopular.slice(0, 6));
      } else {
        setGuideList(guidePopular);
      }
    }
    fetchTourList();
  }, []);

  return (
    <div className={styles.background}>
      <div className="container" style={{ paddingBottom: '100px' }}>
        <Fade cascade damping={0.1}>
          <header className={styles.header}>
            <span className={styles.title}>당신이 가고싶은 여행을 검색하세요</span>
            <SearchBar />
          </header>
        </Fade>
        {tourList !== null && guideList !== null && reviewList !== null ? (
          <>
            <Fade cascade damping={0.1}>
              <div className={styles.content}>
                <div className={styles.subtitle}>인기 투어를 구경해보세요</div>
                <Carousel list={tourList} />
              </div>
              <div className={styles.content}>
                <div className={styles.subtitle}>인기 가이드를 구경해보세요</div>
                <GuideCards list={guideList} />
              </div>
              {reviewList.length !== 0 ? (
                <div className={styles.content}>
                  <div className={styles.subtitle}>실제 이용자들의 후기를 둘러보세요</div>
                  <VerticalCarousel list={reviewList} />
                </div>
              ) : null}
              <div className={styles.content}>
                <div className={styles.subtitle}>여러가지 축제가 진행중입니다</div>
                <FestCarousel />
              </div>
            </Fade>
          </>
        ) : (
          <div className={styles.flex}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
