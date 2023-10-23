import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Writer } from 'asset/icons/writer.svg';
import styles from './TourDetail.module.css';

import { TourDetail } from '../../api/tour/Tour';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import TourDetailCarousel from 'components/Carousel/TourDetailCarousel';

import korea from 'asset/nation/Korea.png';
import usa from 'asset/nation/USA.png';
import spain from 'asset/nation/Spain.png';
import china from 'asset/nation/China.png';
import japan from 'asset/nation/Japan.png';
import france from 'asset/nation/France.png';
import germany from 'asset/nation/Germany.png';
import russia from 'asset/nation/Russia.png';
import italy from 'asset/nation/Italy.png';
import portugal from 'asset/nation/Portugal.png';

import { AuthContext } from 'components/Chat/context/AuthContext';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import GuideButton from 'components/Chat/GuideButton';
import Calendar from 'components/Calendar/Calendar';

const language = {
  KOREAN: '한국어',
  ENGLISH: '영어',
  SPANISH: '스페인어',
  CHINESE: '중국어',
  JAPANESE: '일본어',
  FRENCH: '프랑스어',
  GERMAN: '독일어',
  RUSSIAN: '러시아어',
  ITALIAN: '이탈리아어',
  PORTUGUESE: '포르투갈어'
};
const languageEmoji = {
  KOREAN: korea,
  ENGLISH: usa,
  SPANISH: spain,
  CHINESE: china,
  JAPANESE: japan,
  FRENCH: france,
  GERMAN: germany,
  RUSSIAN: russia,
  ITALIAN: italy,
  PORTUGUESE: portugal
};

function TourDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const tourId = useParams().id;
  const [tourDetail, setTourDetail] = useState({
    title: '',
    imageUrls: [],
    languages: []
    //... 다른 기본값들
  });
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [date, setDate] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState('');

  const handleSearch = async (props) => {
    if (props) {
      const q = query(collection(db, 'users'), where('email', '==', props));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {}
    } else {
      console.error('Email is undefined');
    }
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

  useEffect(() => {
    async function fetchPostDetail(id) {
      try {
        const postDetail = await TourDetail(id);
        if (postDetail?.data) {
          setTourDetail(postDetail.data);
          handleSearch(postDetail.data.guideEmail);

          const formattedDates = postDetail.data.availableDates.map((dateString) => {
            const [year, month, day] = dateString.date.split('-').map(Number);
            return new Date(year, month - 1, day);
          });
          setDate(formattedDates);
        }
      } catch (error) {
        console.error('Error fetching the tour detail:', error);
      }
    }

    fetchPostDetail(tourId);
  }, [tourId, id]);

  const getLanguagesInKorean = (languages) => {
    if (!languages) return ''; // languages가 undefined나 null일 경우 빈 문자열을 반환
    return languages.map((lang, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img
          src={languageEmoji[lang]}
          alt={lang}
          width="30"
          height="20"
          style={{ marginRight: '10px', border: '0.3px solid #bcbcbc' }}
        />
        {language[lang]}
      </div>
    ));
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <div className={styles.parentContainer}>
            <Link to="/tour/tourlist">
              <Prev />
            </Link>
            <div className={styles.postTitle}>{tourDetail.title && tourDetail?.title}</div>
          </div>
          {tourDetail ? (
            <div className={styles.postInfo}>
              <div className={styles.infoLayout}>
                <div className={styles.secondParentContainer}>
                  <div>
                    <div onClick={() => navigate(`/guide/detail/${tourDetail?.guideId}`)}>
                      <Writer className={styles.icon} />
                      {tourDetail.guideNickName && tourDetail.guideNickName} &nbsp;&nbsp;
                    </div>
                  </div>
                  <div>
                    <FavoriteRoundedIcon className={styles.like} style={{ fill: '#FF6073' }} />
                    &nbsp;&nbsp;
                    {tourDetail.like}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <hr style={{ margin: '10px' }} />
          <div className={styles.categoryContainer} style={{ margin: '30px 40px' }}>
            {tourDetail.imageUrls && (
              <div className={styles.category}>
                <div className={styles.categoryTitle}>투어 이미지</div>
                <div className={styles.categoryContent}>
                  <TourDetailCarousel images={tourDetail.imageUrls} />
                </div>
              </div>
            )}
            {tourDetail.price && (
              <div className={styles.category}>
                <div className={styles.categoryTitle}>투어 가격</div>
                <div className={styles.categoryContent}>{tourDetail.price && tourDetail.price.toLocaleString()} 원</div>
              </div>
            )}
            {tourDetail.howManyDay && (
              <div className={styles.category}>
                <div className={styles.categoryTitle}>투어 소요 기간</div>
                <div className={styles.categoryContent}>
                  {tourDetail.howManyDay &&
                    (tourDetail.howManyDay[0] === '0'
                      ? '하루'
                      : `${tourDetail.howManyDay[0]}박 ${tourDetail.howManyDay[1]}일`)}
                </div>
              </div>
            )}
            {tourDetail.locations && (
              <div>
                <div className={styles.category}>
                  <div className={styles.categoryTitle}>투어 일정</div>
                  <div className={styles.categoryContent}>
                    {(() => {
                      // locations 배열을 date 값에 따라 그룹화
                      const groupedLocations = tourDetail.locations.reduce((acc, location) => {
                        if (!acc[location.date]) acc[location.date] = [];
                        acc[location.date].push(location);
                        return acc;
                      }, {});

                      // 그룹화된 locations를 배열로 변환하여 정렬한 후 map
                      return Object.entries(groupedLocations)
                        .sort((a, b) => a[0] - b[0])
                        .map(([date, locations]) => (
                          <div key={date}>
                            {date}일차: {locations.map((loc) => loc.title).join(' - ')}
                          </div>
                        ));
                    })()}
                  </div>
                </div>
              </div>
            )}

            {tourDetail.languages && (
              <div className={styles.category}>
                <div className={styles.categoryTitle}>가이드 가능 언어</div>
                <div className={styles.categoryContent}>{getLanguagesInKorean(tourDetail.languages)}</div>
              </div>
            )}
            {tourDetail.themeResponses && (
              <div className={styles.category}>
                <div className={styles.categoryTitle}>투어 테마</div>
                <div className={styles.categoryContent} style={{ display: 'flex' }}>
                  {tourDetail.themeResponses &&
                    tourDetail.themeResponses.map((theme, index) => (
                      <div key={index} style={{ marginRight: '10px' }}>
                        {theme.title}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {tourDetail.availableDates && (
              <div className={styles.category}>
                <div className={styles.categoryTitle}>예약 가능 날짜</div>
                <div className={styles.categoryContent}>
                  <div className={styles.calendarLayout}>
                    <div>
                      📆&nbsp;
                      <span className={styles.calendar} onClick={() => setIsCalendarModalOpen(!isCalendarModalOpen)}>
                        달력으로 확인하기
                      </span>
                    </div>
                    {isCalendarModalOpen ? (
                      <div style={{ display: 'flex' }}>
                        <Calendar date={date} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div onClick={openChat}>
                <GuideButton text="가이드" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailPage;
