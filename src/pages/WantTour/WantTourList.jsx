import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WantAll, MyArticle, WaitAll } from 'api/want/Want';
import styles from './WantTourList.module.css';

function WantTour() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('AccessToken');

  const [isSelect, setIsSelect] = useState(false);
  const [list, setList] = useState([]);
  const [myArticle, setMyArticle] = useState(false);

  useEffect(() => {
    async function fetchTourList() {
      const wantList = await WantAll();
      // const guidePopular = await GuidePopular();
      // setTourList(tourPopular);
      // setGuideList(guidePopular);
    }

    fetchTourList();
    // const res = WantAll();
    // console.log(res);
    // setList(res.data);
  }, []);

  const handleArticle = () => {
    if ((myArticle === false) & (isLoggedIn === null)) {
      navigate('/login');
    } else {
      // 로그인 되어있는 경우 내가 쓴 글 목록 조회
      // 확인 필요
      const res = MyArticle();
      setList(res.data);
      setMyArticle(!myArticle);
    }
  };
  const handleWait = () => {
    // 대기 상태인 글만 조회
    // 확인 필요
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
      <div className="container">
        <div className={styles.header}>
          <h1>원하는 투어를 직접 작성해보세요</h1>
        </div>
        <div className={styles.listContainer}>
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
          {list.length ? (
            {
              /* <ul>
              {list.map((post) => (
                <li key={post.idx}>
                  <Link to={`/wanttour/${post.idx}`}>{post.title}</Link>
                </li>
              ))}
            </ul> */
            }
          ) : (
            <h2>등록된 게시물이 없습니다</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default WantTour;
