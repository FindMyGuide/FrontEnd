import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from 'asset/FindLogo.png';
import LogoWhiteImage from 'asset/FindLogo_white.png';
import styles from './Navbar.module.css';
import { isMobile } from 'react-device-detect';

function Navbar({ isMain }) {
  const logoImage = isMain ? LogoWhiteImage : LogoImage;

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
        <div className={`${styles.webNav} ${isMain ? styles.main : ''}`}>
          <div>
            <Link to="/">
              <img className={styles.navLogoImage} src={logoImage} alt="" />
            </Link>
          </div>
          <div className={styles.pageLink}>
            <Link to="/create">상품등록 </Link>
            <Link to="/products">추천 </Link>
            <Link to="/areaproduct">지역별상품 </Link>
            <Link to="/guide">가이드별상품 </Link>
            <Link to="/guidedetail">가이드 디테일 </Link>
            <Link to="/area">지역별 </Link>
            <Link to="/allproduct">전체상품 </Link>
            <Link to="/Maptest">지도테스트 </Link>
            <Link to="/wanttour">원해요 </Link>
            <Link to="/mypage/:id">마이페이지</Link>
          </div>
          <div>
            <Link to="/signup">회원가입 </Link>
            <Link to="/login">로그인 </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
