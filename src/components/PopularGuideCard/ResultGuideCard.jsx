import React from 'react';
import styles from './ResultGuideCard.module.css';
import { useNavigate } from 'react-router-dom';

import profileImg from 'asset/images/emptyprofile.png';

const ResultGuideCard = ({ guide }) => {
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

  const allLanguages = guide?.tourProductInformation.reduce((languagesList, tour) => {
    return languagesList.concat(tour.languages);
  }, []);

  // 중복 언어 제거 (선택 사항)
  const uniqueLanguages = [...new Set(allLanguages)];

  const movePage = useNavigate();

  const id = guide.guideId;

  function goToDetailPage() {
    movePage(`/guide/detail/${id}`);
  }
  return (
    <>
      <div className={styles.guideBox} onClick={goToDetailPage}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <h4 style={{ marginTop: '10px', marginLeft: '10px' }}>{guide.guideName}</h4>
          <img
            style={{
              width: '120px',
              position: 'absolute',
              right: '-8px',
              top: '-60px'
            }}
            src={guide.profilePicture !== '' ? guide.profilePicture : profileImg}
            alt=""
          />
        </div>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>
          언어{' '}
          {uniqueLanguages?.map((language) => {
            return languageImage[`${language}`];
          })}
        </p>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>{guide.tourProductInformation[0]?.title}</p>
        <p style={{ marginBottom: '0', marginLeft: '10px' }}>￦{guide.tourProductInformation[0]?.price}</p>
      </div>
    </>
  );
};

export default ResultGuideCard;
