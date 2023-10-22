import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TourListCard.module.css';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LanguageIcon from '@mui/icons-material/Language';
import NoImage from 'asset/images/NoImage2.png';
import { TourLike, TourLikeCancel } from 'api/tour/Tour';
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

function TourListCard({ tour }) {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('accessToken');
  const [likes, setLikes] = useState(tour ? parseInt(tour.likes) : 0);
  const [isLiked, setIsLiked] = useState(tour ? parseInt(tour.likeExist) : 0);
  const onClickHandler = (id) => {
    navigate(`/tour/tourdetail/${id}`);
  };

  const onLikeHandler = (tourId) => {
    if (isLoggedIn) {
      if (isLiked) {
        TourLikeCancel(tourId);
        setLikes(likes - 1);
      } else {
        TourLike(tourId);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } else {
      if (window.confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?')) {
        navigate('/login');
      }
    }
  };
  const getLanguagesInKorean = (languages) => {
    if (!languages || languages.length === 0) return ''; // languages가 undefined나 null일 경우 빈 문자열을 반환
    return languages.map((lang, index) => {
      let languageInKorean = language[lang];

      // 마지막 원소가 아닌 경우에 쉼표와 공백을 추가
      if (index < languages.length - 1) {
        languageInKorean += ', ';
      }

      return languageInKorean;
    });
  };

  return (
    <div className={styles.card} onClick={() => onClickHandler(tour.tourProductId)}>
      <div className={styles.content}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 2px'
          }}
        >
          <div>
            <img src={tour && tour.bestImage ? tour.bestImage : NoImage} alt="img" className={styles.mainImg} />
          </div>
          <div>
            <FavoriteRoundedIcon
              className={styles.like}
              style={{ fill: isLiked ? '#FF6073' : '#FFFFFF' }}
              onClick={(e) => {
                e.stopPropagation();
                onLikeHandler(tour.tourProductId);
              }}
            />
          </div>
        </div>
        <div style={{ padding: '0px 2px', overflow: 'hidden' }}>
          <div className={styles.title} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {tour && tour.title && tour.title}
          </div>
          <div style={{ fontSize: '15px' }}>
            <div
              style={{
                color: '#8D8D8D',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '0px 2px'
              }}
            >
              <LanguageIcon style={{ fill: '#8D8D8D', marginRight: '3px' }} />
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {getLanguagesInKorean(tour.languages)}
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <FavoriteRoundedIcon style={{ fill: '#FF6073', marginRight: '3px', marginLeft: '2px' }} />
              {likes}
            </div>
            <div style={{ textAlign: 'end', marginRight: '2px' }}>
              ￦&nbsp;{tour && tour.price ? tour.price.toLocaleString() : '0'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourListCard;
