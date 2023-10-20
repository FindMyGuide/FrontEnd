import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TastySearch } from 'api/recommend/Recommend';
import TastyCard from 'components/Card/Recommend/TastyCard';
import SideBar from 'components/Recommend/SideBar';
import styles from './Recommend.module.css';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';

function TastyList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMoreCount, setShowMoreCount] = useState(10);

  useEffect(() => {
    async function fetchRecommendList() {
      const tastyList = await TastySearch();
      setList(tastyList);
      setLoading(false);
    }

    fetchRecommendList();
  }, []);

  const onDetailHandler = (id) => {
    navigate(`/recommend/tasty/${id}`);
  };

  const showMoreItems = () => {
    setShowMoreCount((prevCount) => prevCount + 10);
  };

  const showCloseButton = list.length <= showMoreCount;

  return (
    <div className={styles.background}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.title}>부산을 즐겨보세요</span>
          <SideBar />
        </header>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.length}>
              # 총 <span className="color">{list.length}</span>개의 맛집이 있습니다
            </div>
            <div className={styles.explain}>
              &nbsp;부산광역시가 제공하는 맛집 중 {list.length}개를 랜덤으로 골라 보여드립니다
            </div>
            <div className={styles.cardContainer2}>
              {list.slice(0, showMoreCount)?.map((tasty) => (
                <div key={tasty.id} onClick={() => onDetailHandler(tasty.id)} className={styles.cardItem}>
                  <TastyCard tasty={tasty} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {list.length > showMoreCount && (
                <div className={styles.moreBtn} onClick={showMoreItems}>
                  더보기
                </div>
              )}
              {showCloseButton && (
                <div className={styles.moreBtn} onClick={() => setShowMoreCount(10)}>
                  닫기
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TastyList;
