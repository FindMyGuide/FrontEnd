import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DetailArticle, DeleteArticle } from 'api/want/Want';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Watch } from 'asset/icons/watch.svg';
import { ReactComponent as Writer } from 'asset/icons/writer.svg';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';
import Emoji from 'components/Vehicle/Emoji';
import FormatTime from 'components/Format/FormatTime';
import styles from './WantTour.module.css';
import { AuthContext } from 'components/Chat/context/AuthContext';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import GuideButton from 'components/Chat/GuideButton';
import Calendar from 'components/Calendar/Calendar';

function WantTourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = sessionStorage.getItem('userEmail');
  const [post, setPost] = useState('');
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState('');
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPostDetail(id) {
      const postDetail = await DetailArticle(id);
      await setPost(postDetail);
      if (post.reservationDates) {
        const formattedDates = await post.reservationDates.map((dateString) => {
          const [year, month, day] = dateString.split('-').map(Number);
          return new Date(year, month - 1, day);
        });
        setDate(formattedDates);
      }
      await handleSearch(postDetail.memberInfoResponse.nickname);
      setLoading(false);
    }

    fetchPostDetail(id);
  }, [id, post.reservationDates]);

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

  const handleSearch = async (props) => {
    console.log(props);
    const q = query(collection(db, 'users'), where('displayName', '==', props));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {}
  };
  const openChat = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId + '.date']: serverTimestamp()
        });
      }
    } catch (err) {}
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
                      <div className={styles.calendarLayout}>
                        <div>
                          📆&nbsp;
                          <span
                            className={styles.calendar}
                            onClick={() => setIsCalendarModalOpen(!isCalendarModalOpen)}
                          >
                            달력으로 확인하기
                          </span>
                        </div>
                        {isCalendarModalOpen ? (
                          <div style={{ display: 'flex' }}>
                            <Calendar date={date} />
                          </div>
                        ) : null}
                      </div>
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
                  <div onClick={openChat}>
                    <GuideButton />
                  </div>
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
