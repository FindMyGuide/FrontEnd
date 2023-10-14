import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DetailArticle, DeleteArticle } from 'api/want/Want';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Watch } from 'asset/icons/watch.svg';
import { ReactComponent as Writer } from 'asset/icons/writer.svg';
import FormatTime from 'components/Format/FormatTime';
import styles from './WantTour.module.css';

function WantTourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState('');

  useEffect(() => {
    async function fetchPostDetail(id) {
      const postDetail = await DetailArticle(id);
      setPost(postDetail);
      console.log(postDetail);
    }

    fetchPostDetail(id);
  }, [id]);

  const onDeleteHandler = () => {
    if (window.confirm('글을 삭제하시겠습니까?')) {
      DeleteArticle();
      alert('삭제완료');
      navigate('/wanttour');
    } else {
      alert('취소');
    }
  };

  const onUpdateHandler = () => {
    navigate(`/update/${post.id}`, { state: post });
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <div className={styles.parentContainer}>
            <Link to="/recommend/festival">
              <Prev />
            </Link>
            <div className={styles.postTitle}>{post.title}</div>
          </div>
          <div className={styles.postInfo}>
            <div className={styles.infoLayout}>
              <div className={styles.infoContainer}>
                <Writer className={styles.icon} /> 아람 &nbsp;&nbsp;
                <Watch className={styles.icon} />
                <FormatTime dateTimeString={post.createAt} />
              </div>
              {/* 작성자인 경우 */}
              <div className={styles.infoContainer}>
                <Link to="" style={{ textDecoration: 'none', color: '#acacac' }}>
                  <div className={styles.postBtn} onClick={onUpdateHandler}>
                    수정
                  </div>
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <div className={styles.postBtn} onClick={onDeleteHandler}>
                  삭제
                </div>
              </div>
            </div>
          </div>
          <hr style={{ margin: '5px' }} />
          <div style={{ padding: '50px' }}>
            <div>{post.content}</div>
            <div>{post.reservationDates}</div>
            <div>{post.price}</div>
            <div>{post.totalPeople}</div>
            <div>{post.vehicle}</div>
            <div>{post.locationsResponses}</div>

            {/* chatting button */}
            {/* {post.status ? (
              <button className={styles.chatBtn}>📩 작성자와 채팅하기</button>
            ) : (
              <button className={styles.completeBtn}>매칭완료</button>
            )} */}
            <button className={styles.chatBtn} disabled>
              📩 작성자와 채팅하기
            </button>
            <button className={styles.completeBtn}>매칭완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WantTourDetail;
