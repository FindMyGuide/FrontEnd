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
import { TourDetail } from '../../api/tour/Tour';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BamtolImg from 'asset/images/bamtol.png';
import { Calendar } from 'react-modern-calendar-datepicker';

function TourDetailPage() {
  const tourId = useParams().id;
  const email = sessionStorage.getItem('userEmail');
  const navigate = useNavigate();
  const [tourDetail, setTourDetail] = useState({});

  const formattedDates = tourDetail.availableDates
    ? tourDetail.availableDates.map((dateObj) => {
        const [year, month, day] = dateObj.date.split('-').map(Number);
        return { year, month, day };
      })
    : [];
  useEffect(() => {
    async function fetchPostDetail(id) {
      console.log(1);
      const postDetail = await TourDetail(id);
      setTourDetail(postDetail.data);
      console.log('hi', postDetail.data);
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

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <div className={styles.parentContainer}>
            <Link to="/tour/tourlist">
              <Prev />
            </Link>
            <div className={styles.postTitle}>{tourDetail.title && tourDetail.title}</div>
          </div>
          {tourDetail ? (
            <div className={styles.postInfo}>
              <div className={styles.infoLayout}>
                <div className={styles.secondParentContainer}>
                  <div>
                    <Writer className={styles.icon} />
                    {tourDetail.memberInfoResponse && tourDetail.memberInfoResponse.nickname} &nbsp;&nbsp;
                    <Watch className={styles.icon} />
                    <FormatTime dateTimeString={tourDetail.createAt} />
                  </div>
                  <div>
                    <FavoriteRoundedIcon className={styles.like} style={{ fill: '#FF6073' }} />
                    &nbsp;&nbsp;
                    {tourDetail.like}
                  </div>
                </div>
                {/* {tourDetail.memberInfoResponse && tourDetail.memberInfoResponse.email === email && !post.isReserved ? (
                  <div className={styles.parentContainer}>
                    <div className={styles.postBtn} onClick={onUpdateHandler}>
                      수정
                    </div>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <div className={styles.postBtn} onClick={() => onDeleteHandler(tourDetail.id)}>
                      삭제
                    </div>
                  </div>
                ) : null} */}
              </div>
            </div>
          ) : null}
          <hr style={{ margin: '10px' }} />
          <div style={{ padding: '20px 50px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', margin: '5px auto 20px' }}>
              <div style={{ alignSelf: 'center' }}>
                {/* <div>투어 사진:{tourDetail.bestImage}</div> */}
                <img src={BamtolImg} alt="" style={{ width: '50%' }} />

                <div style={{ fontSize: '20px' }}>{tourDetail.content}</div>
              </div>
              <div
                className={styles.pricecontainer}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  alignSelf: 'center'
                }}
              >
                <div>
                  <span style={{ fontSize: '35px', fontWeight: '900' }}>
                    {tourDetail.price && tourDetail.price.toLocaleString()}원
                  </span>
                </div>
                <div>
                  {tourDetail.howManyDay && tourDetail.howManyDay[0]}박
                  {tourDetail.howManyDay && tourDetail.howManyDay[1]}일
                </div>
              </div>
            </div>

            <hr />

            <div>
              <p style={{ fontSize: '35px', fontWeight: '700' }}>투어 일정</p>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
                <div>지도</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {tourDetail.locations &&
                    tourDetail.locations.map((location, index) => (
                      <div key={index}>
                        {index + 1}일차: {location.title}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <hr />

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', margin: '5px auto 20px' }}>
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '35px', fontWeight: '700' }}>가이드 가능 언어</p>
                  <div style={{ fontSize: '15px' }}>{tourDetail.languages}</div>
                </div>

                <div>
                  <p style={{ fontSize: '35px', fontWeight: '700' }}>투어 테마</p>
                  <div>{tourDetail.themeResponses && tourDetail.themeResponses[0].title}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Calendar value={formattedDates} shouldHighlightWeekends />
              </div>
            </div>
            {/* <div className={styles.flex}>
              {tourDetail && !tourDetail.isReseved ? (
                <button className={styles.chatBtn}>📩 작성자와 채팅하기</button>
              ) : (
                <button className={styles.completeBtn}>매칭완료</button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailPage;
