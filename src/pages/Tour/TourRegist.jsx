import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TourRegist.module.css';
import { MytourResister } from 'api/Mypage/MyGuide';

// component, icon
import Language from 'components/Language/Language';
import Location from 'components/Location/Location';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';

import WallpaperIcon from '@mui/icons-material/Wallpaper';
import CustomLocale from 'components/Calendar/CustomLocale';
import WantThemes from 'components/Theme/WantThemes';

import TourRegistLocation from 'components/Location/TourRegistLocation';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
function TourRegist() {
  const navigate = useNavigate();

  const [title, setTitle] = useState(''); //투어명
  const [content, setContent] = useState(''); //투어설명
  const [price, setPrice] = useState(); //투어가격
  const [languages, setLanguages] = useState([]); //가능 언어
  const [howmanydays, setHowmanydays] = useState([]); // 투어소요기간
  const [locations, setLocations] = useState([]); //투어일정
  const [themeIds, setThemes] = useState([]); //투어테마
  const [availableDates, setAvailableDates] = useState([]); //가이드 가능시간
  const [images, setImages] = useState([]); //투어 이미지
  const [selectedImages, setSelectedImages] = useState([]);

  // const [date, setDate] = useState('');
  const [location, setLocation] = useState([]);
  const [language, setLanguage] = useState('');
  const [howmanyday, setHowmanyday] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    MytourResister({
      title,
      content,
      price,
      languages,
      howmanydays: ['2', '3'],
      locations: [{ title: '광안리', coordinates: [16.234, 122.0485] }],
      themeIds,
      availableDates: ['2023-10-15'],
      images
    });
    // MytourResister({
    //   title: 'check',
    //   content: 'check',
    //   price: 100,
    //   languages: ['한국어'],
    //   howmanydays: ['2', '3'],
    //   locations: [{ title: '광안리', coordinates: [16.234, 122.0485] }],
    //   themeIds: [1],
    //   availableDates: ['2023-10-15']
    //   // images: null
    // });
    console.log(themeIds);
    navigate('/tour/tourlist');
  };
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
    setPrice(event.target.value);
  };
  const onLanguageHandler = (event) => {
    setLanguage(event.target.value);
  };
  const onLanguagesHandler = (event) => {
    event.preventDefault();
    const cleanedInput = language.trim();
    if (cleanedInput) {
      if (!languages.includes(cleanedInput)) {
        setLanguages([...languages, cleanedInput]);
        console.log(cleanedInput);
      } else {
        alert('이미 추가된 태그입니다');
      }
    } else {
      alert('내용을 입력하세요');
    }
    setLanguage('');
  };
  const removeLanguage = (language) => {
    setLanguages(languages.filter((selectedLanguage) => selectedLanguage !== language));
  };
  const onHowmanydaysHandler = (event) => {
    const inputText = event.target.value;
    const numberOfDays = parseInt(inputText);

    // 투어 소요기간이 변경될 때, locations 배열을 초기화
    const newLocations = [];
    for (let i = 0; i < numberOfDays; i++) {
      newLocations.push('');
    }

    // 새로운 howmanydays 배열 생성
    const newHowmanydays = [toString(numberOfDays - 1), inputText];
    setHowmanyday(inputText);
    setHowmanydays(newHowmanydays);
    setLocations(newLocations);
    setLocation(newLocations);
  };

  const onChangeLocation = (event, index) => {
    const changeLocation = [...location];
    changeLocation[index] = event.target.value;
    setLocation(changeLocation);
  };

  const onLocationsHandler = (event, index) => {
    const inputValue = event ? event.target.value : location[index]; // button을 클릭했을 때는 location 값을 사용
    // 현재 location 배열을 복사합니다.
    const newLocation = [...locations];
    const changeLocation = [...location];

    // 특정 인덱스의 값에 새 값을 추가합니다.
    if (newLocation[index]) {
      newLocation[index] += `, ${inputValue}`;
    } else {
      newLocation[index] = inputValue;
    }
    changeLocation[index] = '';
    // location 상태를 업데이트합니다.
    setLocations(newLocation);
    setLocation(changeLocation);
  };
  const removeLocation = (index) => {
    const deleteLocation = [...locations];
    deleteLocation[index] = '';
    setLocations(deleteLocation);
  };

  const gregorianToday = utils().getToday();
  const minimumDate = gregorianToday;
  const maximumDate = utils().getToday();
  maximumDate.month = gregorianToday.month + 3;

  const myCustomLocale = CustomLocale;

  // const onMapHandler = (event, index) => {
  //   event.preventDefault();
  //   // TourRegistLocation을 통해 지도를 표시하고, 사용자가 위치를 선택하면 호출될 콜백 설정
  //   // 이 예시에서는 간단히 alert으로 선택된 위치 정보를 표시합니다.
  //   // 실제로는 state 등을 통해 선택된 위치 정보를 저장하면 됩니다.
  //   alert('지도를 표시하고, 사용자가 위치를 선택하면 이 콜백이 호출됩니다.');
  //   setShowMap(true);
  // };
  // const onLocationSelect = (event, location) => {
  //   event.preventDefault();
  //   setSelectedLocation(location);
  //   setShowMap(false);
  //   alert(`선택된 위치: ${location.title}, 좌표: ${location.coordinates}`);
  // };
  // 위치 선택 완료 시 호출되는 콜백
  const handleLocationSelect = (location) => {
    setLocations((prevLocations) => [...prevLocations, location]);
    setShowMap(false); // 지도 숨기기
  };
  const onShowImagesHandler = (event) => {
    const imagesList = event.target.files;
    const list = [...images];

    if (imagesList.length + list.length > 10) {
      alert('이미지는 10개까지 등록 가능합니다.');
      return;
    }

    for (let i = 0; i < imagesList.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageURL = e.target.result;
        if (list.includes(imageURL)) {
          alert('이미 선택된 이미지입니다');
        } else {
          list.push(imageURL);
          setImages(list);

          setSelectedImages([...selectedImages], { imgPath: imageURL });
        }
      };

      reader.readAsDataURL(imagesList[i]);
    }
  };
  const onRemoveImage = (index) => {
    const deleteImage = [...images];
    deleteImage.splice(index, 1);
    setImages(deleteImage);
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
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
              <div className={styles.subtitle}>투어가격(원)</div>
              <div>
                <input
                  type="text"
                  placeholder="투어가격을 입력하세요"
                  value={price}
                  onChange={onPriceHandler}
                  maxLength="20"
                  className={styles.input}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>가능언어</div>
              <div className={styles.language}>
                <input
                  type="text"
                  placeholder="가능 언어 입력"
                  value={language}
                  onChange={onLanguageHandler}
                  style={{ width: '88%' }}
                  className={styles.input}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      onLanguagesHandler(event);
                    }
                  }}
                />
                <button type="submit" onClick={onLanguagesHandler} className={styles.add}>
                  추가하기
                </button>
              </div>
            </div>
            {languages.length > 0 && (
              <div className={styles.content}>
                <div className={styles.subtitle} style={{ color: '#ffffff' }}>
                  가능언어
                </div>

                {languages?.map((language, index) => (
                  <Language key={index} language={language} removeLanguage={removeLanguage} />
                ))}
              </div>
            )}
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

            <div className={styles.content}>
              <div className={styles.subtitle}>투어일정</div>
              <div style={{ width: '90%' }}>
                {locations.length > 0 &&
                  locations?.map((_, index) => (
                    <div key={index} className={styles.location}>
                      <input
                        type="text"
                        placeholder={`장소 입력 - ${index + 1}일차 `}
                        value={location[index]}
                        onChange={(event) => onChangeLocation(event, index)}
                        style={{ width: '88%' }}
                        className={styles.input}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            onLocationsHandler(event, index);
                          }
                        }}
                      />
                      {/* <button type="button" onClick={(event) => onMapHandler(event, index)} className={styles.add}>
                      추가하기
                    </button> */}
                      <button onClick={() => setShowMap(true)}>위치 추가하기</button>
                      {showMap && <TourRegistLocation onLocationSelect={handleLocationSelect} />}
                      <ul>
                        {locations.length > 0 &&
                          locations?.map((loc, index) => (
                            <li key={index}>
                              {loc.title} ({loc.coordinates[0]}, {loc.coordinates[1]})
                            </li>
                          ))}
                      </ul>{' '}
                    </div>
                  ))}
              </div>
            </div>
            {locations.length > 0 && (
              <div className={styles.content}>
                <div className={styles.subtitle} style={{ color: '#ffffff' }}>
                  투어일정
                </div>

                {locations.length > 0 &&
                  locations?.map((location, index) => (
                    <div key={index}>
                      <span>{index + 1}일차</span>
                      <Location key={index} index={index} location={location} removeLocation={removeLocation} />
                    </div>
                  ))}
              </div>
            )}

            <div className={styles.content}>
              <div className={styles.subtitle}>투어 테마</div>
              <WantThemes selectedThemes={themeIds} setSelectedThemes={setThemes} />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>가이드 가능 날짜</div>
              {/* 달력  */}
              {/* <Calendar
                value={availableDates}
                onChange={setAvailableDates}
                locale={myCustomLocale} // custom locale object
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                shouldHighlightWeekends
                formatMonthYear={(locale, date) => `${date.year}.${String(date.month).padStart(2, '0')}`}
              /> */}
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
              {images.length > 0 &&
                images?.map((image, index) => (
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
    </div>
  );
}

export default TourRegist;
