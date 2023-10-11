import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import styles from './GuideDetailPage.module.css';
import { useParams } from 'react-router-dom';
import { GuideDetail } from '../../api/guide/Guide';
import { Card } from 'react-bootstrap';

const GuideDetailPage = () => {
  const { id } = useParams();
  const [guideDetail, setGuideDetail] = useState([]);
  const [guideReview, setGuideReview] = useState([]);

  useEffect(() => {
    GuideDetail(id)
      .then((getGuideDetail) => {
        const GuideDetail = getGuideDetail;
        setGuideDetail(GuideDetail);
      })
      .catch((error) => {
        console.error(error);
      });

    // GuideTourReview(id)
    //   .then((getGuideReview) => {
    //     const GuideReview = getGuideReview;
    //     setGuideReview(GuideReview);
    //     console.log(GuideReview);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);
  console.log(guideDetail);
  //  gender
  //  guideEmail
  //  guideId
  //  guideName
  //  hasGuideCertification
  //  tourProductTitles
  return (
    <>
      {isMobile ? (
        <>
          <div className={styles.appGuideDetail}></div>
        </>
      ) : (
        <>
          <div className={styles.webGuideDetail}>
            <div className={styles.guideprofile}>
              <img src="" alt="얼굴 이미지" />
              <h5>{guideDetail.guideName}</h5>
              <p>{guideDetail.gender}성</p>
              <p>가이드 경력 {guideDetail.gender}</p>
              <p>언어 1 2 3</p>
              {/* 소개 수정필요 */}
              <p>맛있는 불닭 볶음면을</p>
              <p>부산에서 먹는다면 얼마나 맛있을까?</p>
              <p>하하핳 같이 하실래요?</p>
            </div>
            <div className={styles.tourofguide}>
              <div>
                <h3>현재 진행중인 투어</h3>
                <div style={{ display: 'flex' }}>
                  {guideDetail.tourProductTitles?.map((tour) => (
                    <Card key={tour.title} title={tour.title} price={20000}></Card>
                  ))}
                </div>
              </div>
              <div>
                <h3>가이드 투어 후기</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GuideDetailPage;
