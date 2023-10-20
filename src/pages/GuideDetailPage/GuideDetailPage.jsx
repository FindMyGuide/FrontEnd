import React, { useEffect, useState } from 'react';

import styles from './GuideDetailPage.module.css';

import { GuideDetail, GuideTourReview } from '../../api/guide/Guide';
import Card from 'components/Card/Card';

import profileImg from 'asset/images/emptyprofile.png';
import ReviewCard from 'components/Card/ReviewCard';
import { useParams } from 'react-router-dom';

const GuideDetailPage = () => {
  const { id } = useParams();

  const [moreButton, setMoreButton] = useState(true);
  const [moreReviewButton, setMoreReviewButton] = useState(true);

  const [guideDetail, setGuideDetail] = useState([]);
  const [guideReview, setGuideReview] = useState([]);

  const [showingList, setShowingList] = useState([]);
  const [pageNum, setPageNum] = useState(2);

  const [showingReview, setShowingReview] = useState([]);
  const [reviewNum, setReviewNum] = useState(2);

  useEffect(() => {
    GuideDetail(id)
      .then((getGuideDetail) => {
        const GuideDetail = getGuideDetail;
        setGuideDetail(GuideDetail);
        setShowingList(GuideDetail?.tourProductResponses?.slice(0, 6));
        console.log(GuideDetail);
      })
      .catch((error) => {
        console.error(error);
      });

    GuideTourReview(id)
      .then((getGuideReview) => {
        const GuideReview = getGuideReview;
        setGuideReview(GuideReview);
        setShowingReview(GuideReview?.slice(0, 4));
        console.log(GuideReview);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePushReview = () => {
    const newPageNum = reviewNum + 1;
    const startIndex = (newPageNum - 1) * 2;
    const endIndex = startIndex + 2;

    if (guideReview?.length + 2 > endIndex) {
      const newTourProducts = guideReview.slice(0, endIndex);
      setShowingReview(newTourProducts);
      setReviewNum(newPageNum);
      if (guideReview?.length <= endIndex) {
        setMoreReviewButton(false);
      }
    }
  };

  const handlePushTour = () => {
    const newPageNum = pageNum + 1;
    const startIndex = (newPageNum - 1) * 3;
    const endIndex = startIndex + 3;

    if (guideDetail?.tourProductResponses?.length + 3 > endIndex) {
      const newTourProducts = guideDetail?.tourProductResponses.slice(0, endIndex);
      setShowingList(newTourProducts);
      setPageNum(newPageNum);
      if (guideDetail?.tourProductResponses?.length <= endIndex) {
        setMoreButton(false);
      }
    }
  };

  return (
    <>
      <div className={styles.webGuideDetail}>
        <div className={styles.guideprofile}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img
              style={{ width: '240px' }}
              src={guideDetail?.profilePicture !== '' ? guideDetail.profilePicture : profileImg}
              alt="가이드 이미지"
            />
          </div>

          <div className={styles.namebox}>
            <h5>
              <b>{guideDetail.guideName}</b>
            </h5>
            <p>{guideDetail.gender}성</p>
            <p>경력 {guideDetail.guideExperience}년</p>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <p>언어 {guideDetail?.languages}</p>
            {/* 소개 수정필요 */}
            <div>
              <p>{guideDetail.guideIntro}</p>
            </div>
          </div>
        </div>
        <div className={styles.tourofguide}>
          <div>
            <h5 style={{ marginBottom: '20px' }}>
              <b>
                현재 진행중인 투어{' '}
                {guideDetail?.tourProductResponses?.length !== 0 ? (
                  <span style={{ fontSize: '12px' }}>({guideDetail?.tourProductResponses?.length})</span>
                ) : null}
              </b>
            </h5>
            <div className={styles.touring}>
              {showingList?.map((tourlist, idx) => (
                <div style={{ marginLeft: 'auto', marginRight: 'auto' }} key={idx}>
                  <Card tour={tourlist}></Card>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              {moreButton && guideDetail?.tourProductResponses?.length > 6 ? (
                <button
                  className={styles.gamebutton}
                  onClick={() => {
                    handlePushTour(pageNum);
                  }}
                >
                  <svg className={styles.playicon} viewBox="0 0 40 40">
                    <path d="M 10,10 L 20,30 L 30,10 z"></path>
                  </svg>
                  더보기
                </button>
              ) : null}
            </div>
          </div>
          <div style={{ paddingBottom: '40px' }}>
            <h5 style={{ marginBottom: '20px' }}>
              <b>
                가이드 투어 후기{' '}
                {guideReview?.length !== 0 ? <span style={{ fontSize: '12px' }}>({guideReview?.length})</span> : null}
              </b>
            </h5>

            <div className={styles.reviewbox} style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
              {guideReview?.length !== 0 ? (
                <>
                  {showingReview?.map((review, index) => (
                    <div key={index} style={{ flex: '0 0 50%' }}>
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <p>가이드 리뷰가 없습니다.</p>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              {moreReviewButton && guideReview?.length > 4 ? (
                <button
                  className={styles.gamebutton}
                  onClick={() => {
                    handlePushReview(reviewNum);
                  }}
                >
                  <svg className={styles.playicon} viewBox="0 0 40 40">
                    <path d="M 10,10 L 20,30 L 30,10 z"></path>
                  </svg>
                  더보기
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideDetailPage;
