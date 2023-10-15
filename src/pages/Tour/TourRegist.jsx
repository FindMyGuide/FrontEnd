import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TourRegist.module.css';
import { MytourResister } from 'api/Mypage/MyGuide';

// component, icon
import Language from 'components/Language/Language';
import Location from 'components/Location/Location';
import Themes from 'components/Theme/Themes';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';

import WallpaperIcon from '@mui/icons-material/Wallpaper';

function TourRegist() {
  const navigate = useNavigate();

  const [title, setTitle] = useState(''); //투어명
  const [content, setContent] = useState(''); //투어설명
  const [price, setPrice] = useState(); //투어가격
  const [languages, setLanguages] = useState([]); //가능 언어
  const [howmanydays, setHowmanydays] = useState([]); // 투어소요기간
  const [locations, setLocations] = useState([]); //투어일정
  const [themes, setThemes] = useState([]); //투어테마
  const [availableDates, setAvailableDates] = useState([]); //가이드 가능시간
  const [images, setImages] = useState([]); //투어 이미지
  const [selectedImages, setSelectedImages] = useState([]);

  // const [date, setDate] = useState('');
  const [location, setLocation] = useState([]);
  const [language, setLanguage] = useState('');
  const [howmanyday, setHowmanyday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // MytourResister({ title, content, price, languages, howmanydays, locations, themeIds, availableDates, images });
    MytourResister({
      title: 'check',
      content: 'check',
      price: 100,
      languages: ['한국어'],
      howmanydays: ['2', '3'],
      locations: [{ title: '광안리', coordinates: [16.234, 122.0485] }],
      themeIds: [1],
      availableDates: ['2023-10-15']
      // images: ['bamtol.png']
    });
    console.log(themes);
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
  const myCustomLocale = {
    // months list by order
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],

    // week days by order
    weekDays: [
      {
        name: 'Sunday', // used for accessibility
        short: '일', // displayed at the top of days' rows
        isWeekend: true // is it a formal weekend or not?
      },
      { name: 'Monday', short: '월' },
      { name: 'Tuesday', short: '화' },
      { name: 'Wednesday', short: '수' },
      { name: 'Thursday', short: '목' },
      { name: 'Friday', short: '금' },
      { name: 'Saturday', short: '토', isWeekend: true }
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },

    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    // for input range value
    from: 'from',
    to: 'to',

    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false
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
              {/* <div> */}
              <input
                type="text"
                placeholder="투어가격을 입력하세요"
                value={price}
                onChange={onPriceHandler}
                maxLength="20"
                className={styles.input}
                onKeyPress={handleKeyPress}
              />
              {/* </div> */}
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

                {languages.map((language, index) => (
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
                {locations.map((_, index) => (
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
                    <button type="button" onClick={(event) => onLocationsHandler(event, index)} className={styles.add}>
                      추가하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {locations.length > 0 && (
              <div className={styles.content}>
                <div className={styles.subtitle} style={{ color: '#ffffff' }}>
                  투어일정
                </div>

                {locations.map((location, index) => (
                  <div key={index}>
                    <span>{index + 1}일차</span>
                    <Location key={index} index={index} location={location} removeLocation={removeLocation} />
                  </div>
                ))}
              </div>
            )}

            <div className={styles.content}>
              <div className={styles.subtitle}>투어 테마</div>
              <Themes selectedThemes={themes} setSelectedThemes={setThemes} />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>가이드 가능 날짜</div>
              {/* 달력 */}
              <Calendar
                value={availableDates}
                onChange={setAvailableDates}
                locale={myCustomLocale} // custom locale object
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                shouldHighlightWeekends
                formatMonthYear={(locale, date) => `${date.year}.${String(date.month).padStart(2, '0')}`}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 대표 이미지</div>
              {/* 이미지 */}
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
              {images.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
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
