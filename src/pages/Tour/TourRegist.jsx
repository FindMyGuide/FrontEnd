import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TourRegist.module.css';
import { MytourResister } from 'api/Mypage/MyGuide';

// component, icon
import Location from 'components/Location/Location';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Calendar from 'components/Calendar/Calendar';

import WallpaperIcon from '@mui/icons-material/Wallpaper';
import WantThemes from 'components/Theme/WantThemes';
import AvailableLanguage from 'components/Language/AvailableLanguage';
import TourRegistLocation from 'components/Location/TourRegistLocation';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ReactComponent as Spinner } from 'asset/icons/Spinner.svg';

function TourRegist() {
  const navigate = useNavigate();

  const [title, setTitle] = useState(''); //투어명
  const [content, setContent] = useState(''); //투어설명
  const [price, setPrice] = useState(0); //투어가격
  const [languages, setLanguages] = useState([]); //가능 언어
  const [howmanydays, setHowmanydays] = useState([]); // 투어소요기간
  const [locations, setLocations] = useState([]); //투어일정
  const [themeIds, setThemes] = useState([]); //투어테마
  const [availableDates, setAvailableDates] = useState([]); //가이드 가능시간
  const [images, setImages] = useState([]); //투어 이미지
  const [showImages, setShowImages] = useState([]);

  const [locationValue, setLocationValue] = useState([]);
  const [howmanyday, setHowmanyday] = useState('');
  const [searchWord, setSearchWord] = useState(['', 0]);
  const [isLoading, setIsLoading] = useState(false); // Spinner의 상태를 관리하는 상태 변수
  var formData = new FormData();

  // 날짜 포맷팅
  const formatDate = (availableDates) => {
    const year = availableDates.getFullYear();
    const month = String(availableDates.getMonth() + 1).padStart(2, '0');
    const day = String(availableDates.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      title === '' ||
      content === '' ||
      price === 0 ||
      languages.length === 0 ||
      howmanydays.length === 0 ||
      locations.length === 0 ||
      themeIds.length === 0 ||
      availableDates.length === 0 ||
      images.length === 0
    ) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    const formattedDates = availableDates.map((selectedDate) => {
      const formattedDate = formatDate(selectedDate);
      return formattedDate;
    });
    formattedDates.sort((a, b) => new Date(a) - new Date(b));

    const locationArray = [];
    locations.map((location, index) => locationArray.push(...location));

    const data = {
      title: title,
      content: content,
      price: price,
      languages: languages,
      howManyDay: howmanydays,
      location: locationArray,
      themeIds: themeIds,
      availableDates: formattedDates
    };

    formData.append(
      'tourProductRequest',
      new Blob([JSON.stringify(data)], {
        type: 'application/json; charset=UTF-8'
      })
    );
    // formData.append('files', images); // 각 이미지를 'files' 키로 추가
    images.forEach((image) => {
      formData.append('files', image);
    });
    setIsLoading(true);
    try {
      await MytourResister(formData);
    } catch (error) {
      console.error('에러 발생', error);
      alert('오류가 발생했습니다. 다시 시도해주세요');
    }
    setIsLoading(false);
    navigate('/tour/tourlist');
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };
  const onPriceHandler = (event) => {
    const input = event.target.value;
    const sanitizedInput = input.replace(/\D/g, '');
    setPrice(Math.max(0, sanitizedInput));
  };

  const onHowmanydaysHandler = (event) => {
    const inputText = event.target.value;
    const sanitizedInput = inputText.replace(/\D/g, ''); // 숫자가 아닌 문자를 모두 제거
    if (sanitizedInput !== inputText) {
      event.target.value = sanitizedInput;
      return;
    }

    const numberOfDays = parseInt(sanitizedInput);

    // 투어 소요기간이 변경될 때, locations 배열을 초기화
    const newLocationValue = [];
    const newLocations = [];
    for (let i = 0; i < numberOfDays; i++) {
      newLocations.push([]);
      newLocationValue.push('');
    }

    let newHowmanydays = [];
    // 새로운 howmanydays 배열 생성
    if (sanitizedInput === '1') {
      newHowmanydays = ['0', '1'];
    } else {
      newHowmanydays = [(numberOfDays - 1).toString(), sanitizedInput];
    }

    setHowmanyday(sanitizedInput);
    setHowmanydays(newHowmanydays);
    setLocations(newLocations);
    setLocationValue(newLocationValue);
  };

  const onChangeLocation = (event, index) => {
    event.preventDefault();
    const changeLocationValue = [...locationValue];
    changeLocationValue[index] = event.target.value;
    setLocationValue(changeLocationValue);
  };
  const removeLocation = (x, y) => {
    const deleteLocation = [...locations];
    deleteLocation[x] = deleteLocation[x].filter((_, index) => {
      return index !== y;
    });
    setLocations(deleteLocation);
  };

  // 위치 선택 완료 시 호출되는 콜백
  const handleLocationSelect = (location) => {
    const changeLocations = [...locations];
    const date = parseInt(location.date);
    if (date > 0) {
      changeLocations[date - 1].push(location);
      setLocations(changeLocations);
    }
  };
  const onSearchLocation = (event, index) => {
    setSearchWord([locationValue[index], index + 1]);
    const changeLocation = [...locationValue];
    changeLocation[index] = '';
    setLocationValue(changeLocation);
  };

  const onShowImagesHandler = (event) => {
    const imagesList = event.target.files;
    const showlist = [...showImages];
    const list = [...images];

    if (imagesList.length + showlist.length > 10) {
      alert('이미지는 10개까지 등록 가능합니다.');
      return;
    }

    for (let i = 0; i < imagesList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(imagesList[i]);

      reader.onload = ((currentIndex) => {
        return (e) => {
          const imageURL = e.target.result;

          if (showlist.includes(imageURL)) {
            alert('이미 선택된 이미지입니다');
          } else {
            showlist.push(imageURL);
            setShowImages(showlist);

            list.push(imagesList[i]); // 이미지 파일 자체를 list에 추가
            setImages(list);
          }
        };
      })(i);
    }
  };

  const onRemoveImage = (index) => {
    const deleteImage = [...showImages];
    deleteImage.splice(index, 1);
    setShowImages(deleteImage);
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container" style={{ padding: '70px 0' }}>
          <div className={styles.container}>
            <div className={styles.title}>가이드가 되어 투어를 등록해보세요</div>
            <div className={styles.explain}>
              <div>직접 가이드가 되어 여행을 등록해보세요</div>
              <div>누구나 사람들에게 잊지 못할 추억을 선물할 수 있습니다!</div>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className={styles.content}>
                <div className={styles.subtitle}>투어명</div>
                <input
                  type="text"
                  placeholder="투어명을 입력하세요"
                  value={title}
                  onChange={onTitleHandler}
                  maxLength="20"
                  className={styles.input}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.subtitle}>투어설명</div>
                <textarea
                  placeholder="투어에 대한 상세 설명을 남겨주세요"
                  value={content}
                  onChange={onContentHandler}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.subtitle} style={{ width: '18%' }}>
                  투어가격
                </div>
                <div className={styles.parentContainer}>
                  {/* <input hidden="hidden" /> */}
                  <input
                    type="text"
                    value={price}
                    className={styles.price}
                    onChange={onPriceHandler}
                    onKeyPress={handleKeyPress}
                    style={{ width: '117px' }}
                  />
                  <span style={{ fontSize: '17px', marginLeft: '6px' }}>원</span>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.subtitle} style={{ width: '30%' }}>
                  가능언어
                </div>
                <AvailableLanguage selectedLanguages={languages} setSelectedLanguages={setLanguages} />
              </div>

              <div className={styles.content}>
                <div className={styles.subtitle}>투어소요기간(일)</div>
                <input
                  type="text"
                  placeholder="투어소요기간을 입력하세요"
                  value={howmanyday}
                  onChange={onHowmanydaysHandler}
                  maxLength="20"
                  className={styles.input}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div style={{ display: 'flex', padding: '0px 30px 10px 0px' }}>
                <div className={styles.subtitle} style={{ color: '#ffffff' }}>
                  투어소요기간(일)
                </div>
                <div>ex) 0박 1일(하루) - &gt;1일 / 1박 2일 -&gt; 2일</div>
              </div>

              {locations.length > 0 && (
                <TourRegistLocation
                  onLocationSelect={handleLocationSelect}
                  searchWord={searchWord[0]}
                  day={searchWord[1]}
                />
              )}

              <div className={styles.content}>
                <div className={styles.subtitle}>투어일정</div>
                <div style={{ width: '90%' }}>
                  {locationValue.length > 0 &&
                    locationValue?.map((_, index) => (
                      <div key={index}>
                        <div key={index} className={styles.location}>
                          <input
                            type="text"
                            placeholder={`장소 입력 - ${index + 1}일차 `}
                            value={locationValue[index]}
                            onChange={(event) => onChangeLocation(event, index)}
                            style={{ width: '80%' }}
                            className={styles.input}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                                onSearchLocation(event, index);
                              }
                            }}
                          />
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onSearchLocation(event, index);
                            }}
                            onKeyPress={handleKeyPress}
                            className={styles.add}
                          >
                            위치 검색하기
                          </button>
                          <ul></ul>{' '}
                        </div>

                        {locations[index]?.map((locationInfo, row) => (
                          <Location
                            key={locationInfo.title}
                            col={index}
                            row={row}
                            location={locationInfo.title}
                            removeLocation={removeLocation}
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              {locations.length > 0 && (
                <div className={styles.content}>
                  <div className={styles.subtitle} style={{ color: '#ffffff' }}>
                    투어일정
                  </div>
                </div>
              )}

              <div className={styles.content}>
                <div className={styles.subtitle}>투어 테마</div>
                <WantThemes selectedThemes={themeIds} setSelectedThemes={setThemes} />
              </div>
              <div className={styles.content}>
                <div className={styles.subtitle}>가이드 가능 날짜</div>
                {/* 달력  */}
                <Calendar date={availableDates} setDate={setAvailableDates} />
              </div>
              <div className={styles.content}>
                <div className={styles.subtitle}>투어 대표 이미지</div>
                {/* 이미지  */}
                <label htmlFor="input-file" className="inputfile">
                  <WallpaperIcon />
                  <span style={{ margin: '5px' }}>업로드 이미지 선택</span>
                  <input
                    type="file"
                    multiple
                    id="input-file"
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png"
                    onChange={onShowImagesHandler}
                  />
                </label>
              </div>
              {/* 미리보기 이미지 렌더링 */}
              <div className={styles.imageRow}>
                {showImages.length > 0 &&
                  showImages?.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <RemoveCircleOutlineIcon
                        style={{ paddingTop: '5px', paddingLeft: '5px', color: 'red' }}
                        onClick={() => onRemoveImage(index)}
                      />
                      <img src={image} alt={`Preview ${index}`} className={styles.image} />
                    </div>
                  ))}
              </div>
              <div className={styles.flex}>
                <button type="submit" className={styles.submit}>
                  글 작성하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TourRegist;
