import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../MainPage/MainPage.module.css';
import styles2 from './TourRegist.module.css';
import { TourAll } from '../../api/tour/Tour.jsx';
import Card from '../../components/Card/Card';
// import tourListStyle from './TourList.module.css';

function TourList() {
  const navigate = useNavigate();

  const [selectedThemes, setSelectedThemes] = useState(['전체']);
  const themes = ['전체', '맛집탐방', '역사탐방', '애견동반', '힐링투어'];
  const [tourList, setTourList] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState(tourList);

  const toggleTheme = (theme) => {
    if (theme === '전체') {
      setSelectedThemes(['전체']);
      setSelectedDatas(tourList);
    } else {
      if (selectedThemes.includes('전체')) {
        setSelectedThemes([theme]);
      } else if (selectedThemes.includes(theme)) {
        setSelectedThemes(selectedThemes.filter((t) => t !== theme));
      } else {
        setSelectedThemes([...selectedThemes, theme]);
      }

      const filteredTours = tourList.filter((tour) => tour.themeResponses.some((response) => response.title === theme));
      setSelectedDatas(filteredTours);
    }
  };

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

  useEffect(() => {
    (async () => {
      const data = await TourAll();
      if (data) {
        setTourList(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedThemes.includes('전체')) {
      setSelectedDatas(tourList);
    } else {
      const filteredTours = tourList.filter((tour) =>
        tour.themeResponses.some((response) => selectedThemes.includes(response.title))
      );
      setSelectedDatas(filteredTours);
    }
  }, [tourList, selectedThemes]);

  return (
    <div className={styles.background}>
      <div className="styles2.search">
        당신이 가고싶은 여행을 검색하세요
        <form onSubmit={handleSearch}>
          <input value={inputValue} type="text" onChange={handleInput} className={styles.searchbar} />
          <button type="submit">
            검색
            {/* <img src={searchIcon} alt="searchIcon" /> */}
          </button>
        </form>
      </div>
      <div>
        <div className={styles2.topdiv}>TOP</div>
        <div className={styles2.topcard}>
          <div style={{ position: 'relative', marginLeft: '20px' }}>
            <Card></Card>
            <div className={styles2.cardovertext}>1</div>
          </div>
          <div style={{ position: 'relative' }}>
            <Card></Card>
            <div className={styles2.cardovertext}>2</div>
          </div>
          <div style={{ position: 'relative' }}>
            <Card></Card>
            <div className={styles2.cardovertext}>3</div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles2.selectedtheme}>
          #&nbsp;<div style={{ color: '#0052b4' }}>{selectedThemes.join(', ')}</div>
          &nbsp;투어
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <div className={styles2.themes}>
            {themes.map((theme) => (
              <div
                key={theme}
                className={`${styles2.tourtheme} ${selectedThemes.includes(theme) ? styles2.selected : ''}`}
                onClick={() => toggleTheme(theme)}
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
        <hr />

        {selectedDatas.map((tour) => (
          <div key={tour.id}>
            <hr />
            <p onClick={() => navigate(`/tour/tourdetail/${tour.id}`)}>{tour.title}</p>
            <div>
              {tour.locations.map((location) => (
                <div key={location.title}>
                  <p>{location.title}</p>
                </div>
              ))}
            </div>
            <p>좋아요 : {tour.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourList;
