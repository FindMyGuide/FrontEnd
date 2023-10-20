import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../MainPage/MainPage.module.css';
import TourAll from '../../api/tour/Tour.jsx';
import TourListCard from 'components/Card/TourListCard';
import SearchBar from 'components/SearchBar/SearchBar';
import tourListStyle from './TourList.module.css';
// import BamtolImg from 'asset/images/bamtol.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function TourList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [randomItems, setRandomItems] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState(['전체']);
  const themes = ['전체', '맛집탐방', '역사탐방', '애견동반', '힐링투어', '기타'];
  const [tourList, setTourList] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState(tourList);

  // 상세 페이지로 이동하기 전에 스크롤 위치 저장
  const saveScrollPosition = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  };

  // 리스트 페이지로 돌아왔을 때 스크롤 위치 복원
  const restoreScrollPosition = () => {
    const scrollY = sessionStorage.getItem('scrollPosition');
    if (scrollY) {
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 100); // 100ms 딜레이를 줍니다.
    }
  };

  const toggleTheme = (theme) => {
    let updatedSelectedThemes = [...selectedThemes]; // 상태를 직접 수정하지 않기 위한 임시 배열

    if (theme === '전체') {
      updatedSelectedThemes = ['전체'];
    } else {
      if (updatedSelectedThemes.includes('전체')) {
        updatedSelectedThemes = [theme];
      } else if (updatedSelectedThemes.includes(theme)) {
        updatedSelectedThemes = updatedSelectedThemes.filter((t) => t !== theme);
      } else {
        updatedSelectedThemes.push(theme);
      }
    }

    // 만약 updatedSelectedThemes가 비어 있다면 '전체'를 추가
    if (updatedSelectedThemes.length === 0) {
      updatedSelectedThemes.push('전체');
    }

    setSelectedThemes(updatedSelectedThemes);

    const filteredTours = tourList.filter((tour) =>
      tour.themeResponses.some((response) => updatedSelectedThemes.includes(response.title))
    );

    setSelectedDatas(filteredTours);
  };

  function getRandomItemsFromArray(arr, count) {
    const shuffled = arr.slice(0); // 배열 복사
    for (let i = arr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]]; // ES6 구조 분해 할당을 이용한 스왑
    }
    return shuffled.slice(0, count); // 랜덤으로 섞인 배열에서 상위 count 개의 요소를 선택
  }

  useEffect(() => {
    (async () => {
      const data = await TourAll();
      if (data) {
        setTourList(data);
        const randomSelectedItems = getRandomItemsFromArray(data, 3);
        setRandomItems(randomSelectedItems);
        console.log(randomSelectedItems);
        if (location.state && location.state.fromDetail) {
          restoreScrollPosition();
        } else {
          window.scrollTo(0, 0);
        }
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
      <div className="container">
        <div>
          <header className={styles.header}>
            <span className={styles.title}>당신이 가고싶은 여행을 검색하세요</span>
            <SearchBar />
          </header>
        </div>
        <div style={{ position: 'relative' }}>
          <div className={tourListStyle.topdiv}>
            <div>TOP</div>
            <button onClick={() => navigate('/tour/tourregist')} className={tourListStyle.registButton}>
              투어 등록하러 가기
            </button>
          </div>
          {/* <div className={tourListStyle.topcard}>
            <div style={{ position: 'relative' }} onClick={() => navigate(`/tour/tourdetail/${randomItems[0].id}`)}>
              <TourListCard
                title={randomItems.length > 0 ? randomItems[0].title : ''}
                likes={randomItems.length > 0 ? randomItems[0].likes : ''}
              ></TourListCard>
              <div className={tourListStyle.cardovertext}>1</div>
            </div>
            <div style={{ position: 'relative' }} onClick={() => navigate(`/tour/tourdetail/${randomItems[1].id}`)}>
              <TourListCard
                title={randomItems.length > 0 ? randomItems[1].title : ''}
                likes={randomItems.length > 0 ? randomItems[1].likes : ''}
              ></TourListCard>
              <div className={tourListStyle.cardovertext}>2</div>
            </div>
            <div style={{ position: 'relative' }} onClick={() => navigate(`/tour/tourdetail/${randomItems[2].id}`)}>
              <TourListCard
                title={randomItems.length > 0 ? randomItems[2].title : ''}
                likes={randomItems.length > 0 ? randomItems[2].likes : ''}
              ></TourListCard>
              <div className={tourListStyle.cardovertext}>3</div>
            </div>
          </div> */}
          <div
            className={tourListStyle.topcard}
            onClick={() => {
              saveScrollPosition();
              navigate(`/tour/tourdetail/${randomItems[0].id}`);
            }}
          >
            {randomItems[0] && (
              <div style={{ position: 'relative' }}>
                <TourListCard title={randomItems[0].title || ''} likes={randomItems[0].likes || ''}></TourListCard>
                <div className={tourListStyle.cardovertext}>1</div>
              </div>
            )}

            {randomItems[1] && (
              <div
                style={{ position: 'relative' }}
                onClick={() => {
                  saveScrollPosition();
                  navigate(`/tour/tourdetail/${randomItems[1].id}`);
                }}
              >
                <TourListCard title={randomItems[1].title || ''} likes={randomItems[1].likes || ''}></TourListCard>
                <div className={tourListStyle.cardovertext}>2</div>
              </div>
            )}

            {randomItems[2] && (
              <div
                style={{ position: 'relative' }}
                onClick={() => {
                  saveScrollPosition();
                  navigate(`/tour/tourdetail/${randomItems[2].id}`);
                }}
              >
                <TourListCard title={randomItems[2].title || ''} likes={randomItems[2].likes || ''}></TourListCard>
                <div className={tourListStyle.cardovertext}>3</div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className={tourListStyle.selectedtheme}>
            <p style={{ fontSize: '46px', fontWeight: '900', margin: '0' }}>#</p>&nbsp;
            <div style={{ color: '#0052b4' }}>{selectedThemes.join(', ')}</div>
            &nbsp;투어
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <div className={tourListStyle.themes}>
              {themes.map((theme) => (
                <div
                  key={theme}
                  className={`${tourListStyle.tourtheme} ${
                    selectedThemes.includes(theme) ? tourListStyle.selected : ''
                  }`}
                  onClick={() => toggleTheme(theme)}
                >
                  {theme}
                </div>
              ))}
            </div>
          </div>
          <hr style={{ width: '100%', margin: '40px auto' }} />

          <p style={{ width: '100%', margin: '20px auto', fontSize: '30px', fontWeight: '600' }}>
            총 <span style={{ color: '#0052b4', fontWeight: 'bold' }}>{selectedDatas.length}</span>개의 투어가 있습니다
          </p>
          <div className={tourListStyle.listItems}>
            {selectedDatas.map((tour) => (
              <div key={tour.id}>
                <div
                  key={tour.id}
                  className={tourListStyle.item}
                  onClick={() => {
                    saveScrollPosition();
                    navigate(`/tour/tourdetail/${tour.id}`);
                  }}
                >
                  <img src={tour.imageUrls[0]} alt={tour.title} className={tourListStyle.itemImg} />
                  <div className={tourListStyle.itemDetail}>
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '5px 0px',
                        fontSize: '25px',
                        fontWeight: '900'
                      }}
                    >
                      {tour.title}
                    </p>
                    {/* {tour.locations.map((location) => (
                      <p key={location.title} style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                        {location.title}
                      </p>
                    ))} */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                      <FavoriteRoundedIcon className={styles.like} style={{ fill: '#FF6073' }} />

                      {tour.likes}
                    </div>
                  </div>
                </div>
                <hr style={{ width: '90%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourList;
