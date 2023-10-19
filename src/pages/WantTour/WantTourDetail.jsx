import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DetailArticle, DeleteArticle } from 'api/want/Want';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Watch } from 'asset/icons/watch.svg';
import { ReactComponent as Writer } from 'asset/icons/writer.svg';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';
import Emoji from 'components/Vehicle/Emoji';
import FormatTime from 'components/Format/FormatTime';
import styles from './WantTour.module.css';

function WantTourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = sessionStorage.getItem('userEmail');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetail(id) {
      const postDetail = await DetailArticle(id);
      setPost(postDetail);
      setLoading(false);
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
          {loading ? (
            <Spinner />
          ) : (
            <>
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
              <div className={styles.categoryContainer} style={{ margin: '30px 40px' }}>
                {post.reservationDates && (
                  <div className={styles.category}>
                    <div className={styles.categoryTitle}>희망 투어 날짜</div>
                    <div className={styles.categoryContent}>
                      {post.reservationDates
                        .map((dateString) => {
                          const date = new Date(dateString);
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          const day = String(date.getDate()).padStart(2, '0');
                          return `${year}년 ${month}월 ${day}일`;
                        })
                        .join(', ')}
                    </div>
                  </div>
                )}
                {post.price && (
                  <div className={styles.category}>
                    <div className={styles.categoryTitle}>희망 투어 가격</div>
                    <div className={styles.categoryContent}>{post.price.toLocaleString()} 원</div>
                  </div>
                )}
                {post.totalPeople || post.totalPeople === 0 ? (
                  <div className={styles.category}>
                    <div className={styles.categoryTitle}>투어 인원</div>
                    <div className={styles.categoryContent}>{post.totalPeople} 명</div>
                  </div>
                ) : null}
                {post.vehicle && (
                  <div className={styles.category}>
                    <div className={styles.categoryTitle}>선호 교통수단</div>
                    <div className={styles.categoryContent}>
                      <Emoji vehicle={post.vehicle} />
                    </div>
                  </div>
                )}
                {post.locationsResponses && (
                  <div className={styles.category}>
                    <div className={styles.categoryTitle}>꼭 가고싶은 장소</div>
                    <div className={styles.categoryContent}>{post.locationsResponses}</div>
                  </div>
                )}
              </div>
              {post.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(/\n/g, '<br/>')
                  }}
                  style={{ fontSize: '19px', margin: '40px' }}
                />
              )}

              <div className={styles.flex}>
                {post && !post.isReseved ? (
                  <button className={styles.chatBtn}>📩 작성자와 채팅하기</button>
                ) : (
                  <button className={styles.completeBtn}>매칭완료</button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WantTourDetail;
