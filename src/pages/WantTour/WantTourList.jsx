import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WantAll, MyArticle, WaitAll } from 'api/want/Want';
import styles from './WantTourList.module.css';

function WantTour() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('accessToken');

  const [list, setList] = useState(null);
  const [myArticle, setMyArticle] = useState(false);

  useEffect(() => {
    async function fetchTourList() {
      const wantList = await WantAll();
      // setList(wantList);
      console.log(wantList);
    }

    fetchTourList();
  }, []);

  const handleArticle = () => {
    if ((myArticle === false) & (isLoggedIn === null)) {
      navigate('/login');
    } else {
      // 로그인 되어있는 경우 내가 쓴 글 목록 조회
      const myArticleList = MyArticle();
      setList(myArticleList);
      setMyArticle(!myArticle);
    }
  };

  const handleWait = () => {
    const res = WaitAll();
    setList(res.data);
  };

  const handleRegist = () => {
    if (isLoggedIn === null) {
      navigate('/login');
    } else {
      navigate('/wanttour/regist');
    }
  };

  return (
    <div className={styles.background}>
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div className={styles.header}>
          <span className={styles.title}>원하는 투어를 직접 작성해보세요</span>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>
            <span>제목</span>
            <span>여행 날짜</span>
            <span>가이드 매칭 여부</span>
          </div>
          <hr />
          {list ? (
            <div>
              {myArticle ? (
                <button onClick={handleArticle} className={styles.button}>
                  전체 보기
                </button>
              ) : (
                <button onClick={handleArticle} className={styles.button}>
                  내가 쓴 글 보기
                </button>
              )}
              <button onClick={handleWait} className={styles.button}>
                대기 상태 글 보기
              </button>
              <button onClick={handleRegist} className={styles.button}>
                글 작성하기
              </button>
            </div>
          ) : (
            <div className={styles.noContent}>
              <div className="pb-2">아직 등록된 글이 없습니다</div>
              <button className={styles.button} onClick={handleRegist}>
                글 작성하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WantTour;
