// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { TourDetail } from '../../api/tour/Tour';

// function TourDetailPage() {
//   const tourId = useParams().id;
//   const [tourDetail, setTourDetail] = useState([]);

//   console.log('check', tourId);
//   useEffect(() => {
//     (async () => {
//       const data = await TourDetail(tourId);
//       if (data) {
//         setTourDetail(data);
//       }
//     })();
//   }, [tourId]);
//   return <div>hi</div>;
// }

// export default TourDetailPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { ReactComponent as Watch } from 'asset/icons/watch.svg';
import { ReactComponent as Writer } from 'asset/icons/writer.svg';
import FormatTime from 'components/Format/FormatTime';
import styles from './TourDetail.module.css';
// import styles from './WantTour.module.css';

import { TourDetail } from '../../api/tour/Tour';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BamtolImg from 'asset/images/bamtol.png';
// import { Calendar } from 'react-modern-calendar-datepicker';
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
  const tourId = useParams().id;
  const [tourDetail, setTourDetail] = useState({
    title: '',
    imageUrls: [],
    languages: []
    //... 다른 기본값들
  });

  const formattedDates = tourDetail.availableDates
    ? tourDetail.availableDates.map((dateObj) => {
        const [year, month, day] = dateObj.date.split('-').map(Number);
        return { year, month, day };
      })
    : [];
  useEffect(() => {
    async function fetchPostDetail(id) {
      try {
        const postDetail = await TourDetail(id);
        if (postDetail?.data) {
          setTourDetail(postDetail.data);
        }
      } catch (error) {
        console.error('Error fetching the tour detail:', error);
      }
    }
    fetchPostDetail(tourId);
  }, [tourId]);

  // const onDeleteHandler = (id) => {
  //   if (window.confirm('글을 삭제하시겠습니까?')) {
  //     DeleteArticle(id);
  //     alert('삭제완료');
  //     navigate('/wanttour');
  //   } else {
  //     alert('취소');
  //   }
  // };

  // const onUpdateHandler = () => {
  //   navigate(`/wanttour/update/${tourDetail.id}`, { state: tourDetail });
  // };
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
                    <div>
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
                  {tourDetail.howManyDay && tourDetail.howManyDay[0]}박{' '}
                  {tourDetail.howManyDay && tourDetail.howManyDay[1]}일
                </div>
              </div>
            )}
            {tourDetail.locations && (
              <div>
                <div className={styles.category}>
                  <div className={styles.categoryTitle}>투어 일정</div>
                  <div className={styles.categoryContent}>
                    {tourDetail.locations &&
                      // locations 배열을 date 값에 따라 정렬
                      tourDetail.locations
                        .sort((a, b) => a.date - b.date)
                        .map((location) => (
                          <div key={location.date}>
                            {location.date}일차: {location.title}
                          </div>
                        ))}
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
                {tourDetail.themeResponses &&
                  tourDetail.themeResponses.map((theme, index) => (
                    <div key={index} className={styles.categoryContent}>
                      {theme.title}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailPage;
