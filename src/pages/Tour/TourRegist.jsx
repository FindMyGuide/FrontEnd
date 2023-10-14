import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateArticle } from 'api/want/Want';
import styles from './TourRegist.module.css';

// component, icon
import Language from 'components/Language/Language';
import Location from 'components/Location/Location';
import Themes from 'components/Theme/Themes';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
// import { Language } from '@mui/icons-material';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

function TourRegist() {
  const navigate = useNavigate();

  //   const [title, setTitle] = useState('');
  //   const [content, setContent] = useState('');
  //   const [price, setPrice] = useState();
  //   const [language, setLanguage] = useState([]);
  //   const [howmanydays, setHowmanydays] = useState(['0', '1']);
  //   const [location, setLocation] = useState([]);
  //   const [themeIds, setThemeIds] = useState([]);
  //   // const themeCheck = ['off', 'off', 'off', 'off', 'off'];
  //   const [availableDates, setAvailableDates] = useState([]);
  //   const [images, setImages] = useState([]);

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

  const [date, setDate] = useState(''); //투어테마
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    CreateArticle({ title, content, date, themes, locations });
    console.log(themes);
    navigate('/wanttour');
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
    setHowmanydays(event.target.value);
  };
  const onLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const onLocationsHandler = (event) => {
    event.preventDefault();
    const cleanedInput = location.trim();
    if (cleanedInput) {
      if (!locations.includes(cleanedInput)) {
        setLocations([...locations, cleanedInput]);
        console.log(cleanedInput);
      } else {
        alert('이미 추가된 태그입니다');
      }
    } else {
      alert('내용을 입력하세요');
    }
    setLocation('');
  };
  const removeLocation = (location) => {
    setLocations(locations.filter((selectedLocation) => selectedLocation !== location));
  };
  const onAvailableDatesHandler = (event) => {
    console.log('date', event);
    // setAvailableDates(event.target);
  };

  const gregorianToday = utils().getToday();
  const today = gregorianToday;
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
      {
        name: 'Monday',
        short: '월'
      },
      {
        name: 'Tuesday',
        short: '화'
      },
      {
        name: 'Wednesday',
        short: '수'
      },
      {
        name: 'Thursday',
        short: '목'
      },
      {
        name: 'Friday',
        short: '금'
      },
      {
        name: 'Saturday',
        short: '토',
        isWeekend: true
      }
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

  const onImagesHandler = (event) => {
    setImages(event.target.value);
  };

  // const onShowImagesHandler = (event) => {
  //   const showImagesList = event.target.files;
  //   const list = [...showImages];
  //   // showImages 상태 변수를 직접 업데이트하는 대신, setShwoImages 함수를 호출하여 업데이트합니다.
  //   for (let i = 0; i < showImagesList.length; i++) {
  //     const showImageURL = URL.createObjectURL(showImagesList[i]);
  //     list.push(showImageURL);
  //   }
  //   setShowImages(list); // 상태 변수를 업데이트하기 위해 setShowImages 함수를 호출합니다.
  // };
  const onShowImagesHandler = (event) => {
    console.log('hi', event);
    const imagesList = event.target.files;
    const list = [...images];

    for (let i = 0; i < imagesList.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageURL = e.target.result;
        list.push(imageURL);
        setImages(list);

        setSelectedImages([...selectedImages], { imgPath: imageURL });
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
                value={howmanydays}
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
              <div className={styles.location}>
                <input
                  type="text"
                  placeholder="장소 입력"
                  value={location}
                  onChange={onLocationHandler}
                  style={{ width: '88%' }}
                  className={styles.input}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      onLocationsHandler(event);
                    }
                  }}
                />
                <button type="submit" onClick={onLocationsHandler} className={styles.add}>
                  추가하기
                </button>
              </div>
            </div>
            {locations.length > 0 && (
              <div className={styles.content}>
                <div className={styles.subtitle} style={{ color: '#ffffff' }}>
                  투어일정
                </div>

                {locations.map((location, index) => (
                  <Location key={index} location={location} removeLocation={removeLocation} />
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
                업로드 이미지 선택
                <input
                  type="file"
                  multiple="multiple"
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
