import React from 'react';
import { isMobile } from 'react-device-detect';

import { styles } from 'GuideDetailPage.module.css';

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
            <div></div>
            <div>
              <div>
                <h1>현재 진행중인 투어</h1>
              </div>
              <div>
                <h1>가이드 투어 후기</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GuideDetailPage;
