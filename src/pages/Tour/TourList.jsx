import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../MainPage/MainPage.module.css';
import TourAll from '../../api/tour/Tour.jsx';
import { SearchTour } from 'api/tour/SearchTour';
import TourListCard from 'components/Card/TourListCard';
import SearchBar from 'components/SearchBar/SearchBar';
import tourListStyle from './TourList.module.css';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';
import { Fade } from 'react-awesome-reveal';

function TourList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedThemes, setSelectedThemes] = useState(['전체']);
  const themes = ['전체', '맛집탐방', '역사탐방', '애견동반', '힐링투어', '기타'];
  const [tourList, setTourList] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState(tourList);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Spinner의 상태를 관리하는 상태 변수
  const ITEMS_PER_LOAD = 10; // 한 번에 로드할 아이템의 수
  const [displayedItemsCount, setDisplayedItemsCount] = useState(ITEMS_PER_LOAD); // 현재 표시될 아이템의 수
  // 더보기 버튼을 표시할 상태 변수
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const fetchData = async (keyword) => {
    if (keyword !== '') {
      const data = await SearchTour(keyword);
      if (data && data.tourProductResponses) {
        setSelectedDatas(data.tourProductResponses);
      }
    }
  };
  const handleLoadMore = () => {
    setDisplayedItemsCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  };

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await TourAll();
      if (data) {
        setTourList(data);
        setIsLoading(false);
        if (location.state && location.state.fromDetail) {
          restoreScrollPosition();
        } else {
          window.scrollTo(0, 0);
        }
      }
      const searchParams = new URLSearchParams(location.search);
      if (searchParams) {
        const keyword = searchParams.get('search');
        setSearchKeyword(keyword);

        if (keyword) {
          fetchData(keyword);
        }
      }
    })();
  }, [location.state, location.search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 &&
        !isLoading &&
        displayedItemsCount < selectedDatas.length
      ) {
        // 스크롤이 바닥에 닿았고, 모든 데이터가 아직 표시되지 않았을 때 더보기 버튼을 표시
        setShowLoadMoreButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, displayedItemsCount, selectedDatas]);

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

  useEffect(() => {
    (async () => {
      // 검색어가 비어있지 않을 때만 검색 API를 호출
      if (searchKeyword && searchKeyword.trim() !== '') {
        const data = await SearchTour(searchKeyword);
        if (data && data.tourProductResponses) {
          setSelectedDatas(data.tourProductResponses);
        }
      }
    })();
  }, [searchKeyword]);

  return (
    <div className={styles.background}>
      <div className="container">
        <div>
          <header className={styles.header}>
            <span className={styles.title}>당신이 가고싶은 여행을 검색하세요</span>
            <SearchBar searchBar={setSearchKeyword} />
          </header>
        </div>
        {!isLoading ? (
          <div>
            <div className={tourListStyle.content}>
              <div className={tourListStyle.selectedtheme}>
                <p style={{ fontSize: '46px', fontWeight: '900', margin: '0' }}>#</p>&nbsp;
                <div style={{ color: '#0052b4' }}>{selectedThemes.join(', ')}</div>
                &nbsp;투어
              </div>
              <button onClick={() => navigate('/tour/tourregist')} className={tourListStyle.registButton}>
                투어 등록
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
              <div className={tourListStyle.themes}>
                {themes.map((theme, index) => (
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
              총 <span style={{ color: '#0052b4', fontWeight: 'bold' }}>{selectedDatas.length}</span>개의 투어가
              있습니다
            </p>
            <Fade cascade damping={0.1}>
              <div className={tourListStyle.listItems}>
                {selectedDatas.slice(0, displayedItemsCount).map((tour) => (
                  <Fade key={tour.tourProductId}>
                    <TourListCard tour={tour} />
                  </Fade>
                ))}
              </div>
            </Fade>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {showLoadMoreButton && displayedItemsCount < selectedDatas.length && (
                <button className={tourListStyle.gamebutton} onClick={handleLoadMore}>
                  <svg className={tourListStyle.playicon} viewBox="0 0 40 40">
                    <path d="M 10,10 L 20,30 L 30,10 z"></path>
                  </svg>
                  더보기
                </button>
              )}{' '}
            </div>
          </div>
        ) : (
          <div className={styles.flex}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default TourList;
