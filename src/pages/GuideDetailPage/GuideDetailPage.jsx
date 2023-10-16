import React, { useEffect, useState } from 'react';

import styles from './GuideDetailPage.module.css';
import { useParams } from 'react-router-dom';
import { GuideDetail, GuideTourReview } from '../../api/guide/Guide';
import Card from 'components/Card/Card';

import profileImg from 'asset/images/emptyprofile.png';

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

    GuideTourReview(id)
      .then((getGuideReview) => {
        const GuideReview = getGuideReview;
        setGuideReview(GuideReview);
        console.log(GuideReview);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <div className={styles.webGuideDetail}>
        <div className={styles.guideprofile}>
          <img style={{ width: '180px', textAlign: 'center' }} src={profileImg} alt="얼굴 이미지" />
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
            <h5>
              <b>현재 진행중인 투어</b>
            </h5>
            <div style={{ display: 'flex', width: '100%' }}>
              {guideDetail.tourProductTitles?.slice(0, 3).map((tourlist, idx) => (
                <div key={idx}>
                  <Card tour={{ title: `${tourlist.title}`, price: `20000`, bestImage: `` }}></Card>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <button>더보기</button>
            </div>
          </div>
          <div>
            <h5>
              <b>가이드 투어 후기</b>
              <div style={{ display: 'flex', width: '100%' }}>
                {guideReview.slice(0, 3).map((reviewList, idx) => (
                  <div key={idx}>{reviewList.content}</div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <button>더보기</button>
              </div>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideDetailPage;
