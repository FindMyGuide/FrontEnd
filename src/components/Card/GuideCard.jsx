import React from 'react';
import { useNavigate } from 'react-router-dom';
import noProfile from 'asset/icons/noProfile.svg';
import styles from './GuideCard.module.css';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

function GuideCard({ guide }) {
  const navigate = useNavigate();
  console.log(guide, 'guideCard에서 확인');
  const introDisplay = guide.guideIntro.length > 28 ? `${guide.guideIntro.slice(0, 26)}...` : guide.guideIntro;

  const onClickHandler = (id) => {
    navigate(`/guide/detail/${id}`);
  };

  return (
    <div className={styles.container} onClick={() => onClickHandler(guide.guideId)}>
      <div className={styles.guideTop}>
        <div>
          <div className={styles.align}>
            <div className={styles.name}>{guide.guideName}</div>
            <div style={{ marginLeft: '5px' }}>{guide.gender === '여' ? <FemaleIcon /> : <MaleIcon />}</div>
          </div>
          <div className={styles.intro}>
            {guide.guideIntro ? (
              introDisplay
            ) : (
              <div>
                안녕하세요 <br />
                가이드 {guide.guideName}입니다
              </div>
            )}
          </div>
        </div>
        {guide.profilePicture ? (
          <img src={guide.profilePicture} alt="guideImg" className={styles.profileImg}></img>
        ) : (
          <img src={noProfile} alt="guideImg" className={styles.profileImg}></img>
        )}
      </div>
      <div>
        {guide.hasGuideCertification ? (
          <span className={styles.guideCertificate}>가이드 자격증</span>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
      {guide.guideEmail ? <div className={styles.explain}>{guide.guideEmail}</div> : <div>&nbsp;</div>}
    </div>
  );
}

export default GuideCard;
