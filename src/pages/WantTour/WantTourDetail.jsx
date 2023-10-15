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
  const email = sessionStorage.getItem('userEmail');
  const navigate = useNavigate();
  const [post, setPost] = useState('');

  useEffect(() => {
    async function fetchPostDetail(id) {
      console.log(1);
      const postDetail = await DetailArticle(id);
      setPost(postDetail);
      console.log(postDetail);
    }

    fetchPostDetail(id);
  }, [id]);

  const onDeleteHandler = (id) => {
    if (window.confirm('글을 삭제하시겠습니까?')) {
      DeleteArticle(id);
      alert('삭제완료');
      navigate('/wanttour');
    } else {
      alert('취소');
    }
  };

  const onUpdateHandler = () => {
    navigate(`/wanttour/update/${post.id}`, { state: post });
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <div className={styles.parentContainer}>
            <Link to="/wanttour">
              <Prev />
            </Link>
            <div className={styles.postTitle}>{post.title}</div>
          </div>
          {post ? (
            <div className={styles.postInfo}>
              <div className={styles.infoLayout}>
                <div className={styles.parentContainer}>
                  {post.isReserved ? (
                    <div className={styles.status} style={{ backgroundColor: '#C5C5C5' }}>
                      매칭완료
                    </div>
                  ) : (
                    <div className={styles.status} style={{ backgroundColor: '#93D8FF' }}>
                      매칭대기
                    </div>
                  )}
                  &nbsp;&nbsp;
                  <Writer className={styles.icon} />
                  {post.memberInfoResponse && post.memberInfoResponse.nickname} &nbsp;&nbsp;
                  <Watch className={styles.icon} />
                  <FormatTime dateTimeString={post.createAt} />
                </div>
                {post.memberInfoResponse && post.memberInfoResponse.email === email && !post.isReserved ? (
                  <div className={styles.parentContainer}>
                    <div className={styles.postBtn} onClick={onUpdateHandler}>
                      수정
                    </div>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <div className={styles.postBtn} onClick={() => onDeleteHandler(post.id)}>
                      삭제
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <hr style={{ margin: '10px' }} />
          <div style={{ padding: '20px 50px' }}>
            <div>{post.content}</div>
            <div>{post.reservationDates}</div>
            <div>{post.price}</div>
            <div>{post.totalPeople}</div>
            <div>{post.vehicle}</div>
            <div>{post.locationsResponses}</div>

            <div className={styles.flex}>
              {post && !post.isReseved ? (
                <button className={styles.chatBtn}>📩 작성자와 채팅하기</button>
              ) : (
                <button className={styles.completeBtn}>매칭완료</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WantTourDetail;
