import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from '../../../asset/FindLogo.png';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <img className={styles.logoImage} src={LogoImage} alt="" />
      </div>
      <div className={styles.pageLink}>
        <Link to="/">홈 </Link>
        <Link to="/create">상품등록 </Link>
        <Link to="/products">추천 </Link>
        <Link to="/areaproduct">지역별상품 </Link>
        <Link to="/guideproduct">가이드별상품 </Link>
        <Link to="/allproduct">전체상품 </Link>
        <Link to="/Maptest">지도테스트 </Link>
        <Link to="/wantproduct">원해요 </Link>
        <Link to="/mypage/:id">마이페이지</Link>
      </div>
      <div>
        <Link to="/signup">회원가입 </Link>
        <Link to="/login">로그인 </Link>
      </div>
    </div>
  );
}

export default Navbar;
