import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from 'asset/FindLogo.png';
import LogoWhiteImage from 'asset/FindLogo_white.png';
import styles from './Navbar.module.css';
import { isMobile } from 'react-device-detect';

function Navbar({ isMain }) {
  const logoImage = isMain ? LogoWhiteImage : LogoImage;

  const accessToken = sessionStorage.getItem('accessToken');
  console.log(accessToken);

  return (
    <>
      {isMobile ? (
        <div className={styles.appNav}>
          <button type="button">
            <Link to="/">Home </Link>
          </button>
          <button type="button">
            <Link to="/allproduct">Tour </Link>
          </button>
          <button type="button">
            <Link to="/guideproduct">Location </Link>
          </button>
          <button type="button">
            <Link to="/products">Theme </Link>
          </button>
          <button type="button">
            <Link to="/guide">Guide </Link>
          </button>
          <button type="button">
            <Link to="/mypage/:id">MyPage</Link>
          </button>
        </div>
      ) : (
        <div className={`${styles.webNav} ${isMain ? styles.main : styles.notMain}`}>
          <div>
            <Link to="/">
              <img className={styles.navLogoImage} src={logoImage} alt="" />
            </Link>
          </div>
          <div className={styles.pageLink}>
            <Link to="/tour/tourlist">모든 투어 보기</Link>
            <Link to="/recommend/location">추천</Link>
            <Link to="/area">지도검색 </Link>
            <Link to="/guide">가이드별 </Link>
          </div>
          {accessToken === null ? <Link to="/login">로그인 </Link> : <Link to="/mypage/:id">마이페이지</Link>}
        </div>
      )}
    </>
  );
}

export default Navbar;
