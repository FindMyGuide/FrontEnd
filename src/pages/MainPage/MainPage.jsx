import React, { useState } from 'react';
import axios from 'axios';
import Carousel from '../../components/Carousel/Carousel';
import styles from './MainPage.module.css';

axios.defaults.baseURL = 'http://find-my-guide.site';

function MainPage() {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(inputValue);
    // 검색 axios
    setInputValue('');
  };

  return (
    <div className={styles.background}>
      <div>
        당신이 가고싶은 여행을 검색하세요
        <form onSubmit={handleSearch}>
          <input value={inputValue} type="text" onChange={handleInput} className={styles.searchbar} />
          <button type="submit">검색
            {/* <img src={searchIcon} alt="searchIcon" /> */}
          </button>
        </form>
      </div>
      <div>인기 투어를 구경해보세요</div>
      <Carousel></Carousel>
      <div>인기 가이드를 구경해보세요</div>
      <div>여러가지 축제가 진행중입니다</div>
      <div>인기 여행지를 구경해보세요</div>
      <Carousel></Carousel>
      <div>실제 이용자들의 후기를 둘러보세요</div>
    </div>
  );
}

export default MainPage;
