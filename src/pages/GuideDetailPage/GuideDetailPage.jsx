import React, { useEffect, useState, useContext } from 'react';

import styles from './GuideDetailPage.module.css';

import { GuideDetail, GuideTourReview } from '../../api/guide/Guide';
import Card from 'components/Card/Card';

import profileImg from 'asset/images/emptyprofile.png';
import ReviewCard from 'components/Card/ReviewCard';
import { useParams } from 'react-router-dom';

import { AuthContext } from 'components/Chat/context/AuthContext';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import GuideButton from 'components/Chat/GuideButton';

const GuideDetailPage = () => {
  const languageImage = {
    KOREAN: (
      <img width="28" height="28" src="https://img.icons8.com/emoji/96/south-korea-emoji.png" alt="south-korea-emoji" />
    ),
    ENGLISH: (
      <img
        width="28"
        height="28"
        src="https://img.icons8.com/emoji/96/united-states-emoji.png"
        alt="united-states-emoji"
      />
    ),
    SPANISH: <img width="28" height="28" src="https://img.icons8.com/emoji/96/spain-emoji.png" alt="spain-emoji" />,
    JAPANESE: <img width="28" height="28" src="https://img.icons8.com/emoji/96/japan-emoji.png" alt="japan-emoji" />,
    CHINESE: <img width="28" height="28" src="https://img.icons8.com/emoji/96/china-emoji.png" alt="china-emoji" />,
    PORTUGUESE: (
      <img width="28" height="28" src="https://img.icons8.com/emoji/96/portugal-emoji.png" alt="portugal-emoji" />
    ),
    FRENCH: <img width="28" height="28" src="https://img.icons8.com/emoji/96/france-emoji.png" alt="france-emoji" />,
    RUSSIAN: <img width="28" height="28" src="https://img.icons8.com/emoji/96/russia-emoji.png" alt="russia-emoji" />,
    ITALIAN: <img width="28" height="28" src="https://img.icons8.com/emoji/96/italy-emoji.png" alt="italy-emoji" />,
    GERMAN: <img width="28" height="28" src="https://img.icons8.com/emoji/96/germany-emoji.png" alt="germany-emoji" />
  };
  const [uniqueLanguages, setUniqueLanguages] = useState([]);

  // 중복 언어 제거 (선택 사항)

  const { id } = useParams();

  const [moreButton, setMoreButton] = useState(true);
  const [moreReviewButton, setMoreReviewButton] = useState(true);

  const [guideDetail, setGuideDetail] = useState([]);
  const [guideReview, setGuideReview] = useState([]);

  const [showingList, setShowingList] = useState([]);
  const [pageNum, setPageNum] = useState(2);

  const [showingReview, setShowingReview] = useState([]);
  const [reviewNum, setReviewNum] = useState(2);

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState('');

  useEffect(() => {
    GuideDetail(id)
      .then((getGuideDetail) => {
        const GuideDetail = getGuideDetail;
        setGuideDetail(GuideDetail);
        setShowingList(GuideDetail?.tourProductResponses?.slice(0, 6));
        console.log(GuideDetail);
        const allLanguages = GuideDetail?.tourProductResponses.reduce((languagesList, tour) => {
          return languagesList.concat(tour.languages);
        }, []);
        setUniqueLanguages([...new Set(allLanguages)]);
        handleSearch(GuideDetail.guideEmail);
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

  const handleSearch = async (props) => {
    console.log(props);
    const q = query(collection(db, 'users'), where('email', '==', props));
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
            <p>
              언어{' '}
              {uniqueLanguages?.map((language) => {
                return languageImage[`${language}`];
              })}
            </p>
            {/* 소개 수정필요 */}
            <div>
              <p>{guideDetail.guideIntro}</p>
            </div>
            <div onClick={openChat}>
              <GuideButton text="가이드" />
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
