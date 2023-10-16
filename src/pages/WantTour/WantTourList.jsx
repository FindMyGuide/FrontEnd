import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WantAll, MyArticle, WaitAll } from 'api/want/Want';
import styles from './WantTourList.module.css';

function WantTour() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('accessToken');
  const userEmail = sessionStorage.getItem('userEmail');

  const [list, setList] = useState(null);
  const [listAll, setListAll] = useState(null);
  const [myArticle, setMyArticle] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    async function fetchWantList() {
      const wantList = await WantAll();
      setList(wantList);
      setListAll(wantList);
      console.log(wantList);
    }

    fetchWantList();
  }, []);

  const handleMyArticle = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const filteredList = listAll.filter((item) => item.memberInfoResponse.email === userEmail);
      setList(filteredList);
      setMyArticle(true);
    }
  };

  const handleWait = () => {
    const filteredList = listAll.filter((item) => !item.isReserved);
    setList(filteredList);
    setWait(true);
  };

  const handleAllArticle = () => {
    setList(listAll);
    setWait(false);
    setMyArticle(false);
  };

  const handleRegist = () => {
    if (isLoggedIn === null) {
      navigate('/login');
    } else {
      navigate('/wanttour/regist');
    }
  };

  const handlePage = (id) => {
    navigate(`/wanttour/detail/${id}`);
  };

  return (
    <div className={styles.background}>
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div className={styles.header}>
          <span className={styles.title}>원하는 투어를 직접 작성해보세요</span>
          <button onClick={handleRegist} className={styles.createBtn}>
            📝 글 작성하기
          </button>
        </div>
        <div className={styles.listInfo}>
          <div>{list && <div>전체 글: {list.length}</div>}</div>
          <div className={styles.flex}>
            {!myArticle ? (
              <div onClick={handleMyArticle} className={styles.listBtn}>
                내가 쓴 글 보기
              </div>
            ) : null}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            {myArticle || wait ? (
              <div onClick={handleAllArticle} className={styles.listBtn}>
                전체보기
              </div>
            ) : null}
            {!wait ? (
              <div onClick={handleWait} className={styles.listBtn}>
                매칭대기 보기
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>
            <span>제목</span>
            <span>여행 날짜</span>
            <span>가이드 매칭 여부</span>
          </div>
          <hr />
          {list ? (
            [...list].reverse().map((post, index) => (
              <div key={index} onClick={() => handlePage(post.id)} className={styles.post}>
                <span>{post.title}</span>
                {post.reservationDates.length === 1 ? (
                  <span>{post.reservationDates[0]}</span>
                ) : (
                  <span>
                    {post.reservationDates[0]}(+{post.reservationDates.length - 1})
                  </span>
                )}
                {post.isReserved ? <span>매칭완료</span> : <span>매칭대기</span>}
              </div>
            ))
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
