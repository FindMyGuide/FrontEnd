import React from 'react';
import { isMobile } from 'react-device-detect';

import styles from './GuideDetailPage.module.css';

const GuideDetailPage = () => {
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
              <p>가이드 프로필</p>
            </div>
            <div className={styles.tourofguide}>
              <div>
                <h3>현재 진행중인 투어</h3>
                <div>
                  <div></div>
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
