import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from 'asset/FindLogo.png';
import LogoWhiteImage from 'asset/FindLogo_white.png';
import styles from './Navbar.module.css';

function Navbar({ isMain }) {
  const logoImage = isMain ? LogoWhiteImage : LogoImage;

  const accessToken = sessionStorage.getItem('accessToken');
  console.log(accessToken);

  return (
    <>
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
        <div className={styles.navRight}>
          {accessToken === null ? <Link to="/login">로그인 </Link> : <Link to="/mypage/:id">마이페이지</Link>}
        </div>
      </div>
    </>
  );
}

export default Navbar;
