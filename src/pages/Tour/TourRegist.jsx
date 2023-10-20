import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TourRegist.module.css';
import { MytourResister } from 'api/Mypage/MyGuide';

// component, icon
import Language from 'components/Language/Language';
import Location from 'components/Location/Location';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import Calendar from 'components/Calendar/Calendar';
import { utils } from 'react-modern-calendar-datepicker';

import WallpaperIcon from '@mui/icons-material/Wallpaper';
import CustomLocale from 'components/Calendar/CustomLocale';
import WantThemes from 'components/Theme/WantThemes';
import AvailableLanguage from 'components/Language/AvailableLanguage';
import TourRegistLocation from 'components/Location/TourRegistLocation';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { style } from '@mui/system';

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
  // const [selectedImages, setSelectedImages] = useState([]);
  const [showImages, setShowImages] = useState([]);

  // const [date, setDate] = useState('');
  const [locationValue, setLocationValue] = useState([]);
  const [language, setLanguage] = useState('');
  const [howmanyday, setHowmanyday] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchWord, setSearchWord] = useState(['', 0]);

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
    console.log(formattedDates);

    console.log('images check', images);
    const locationArray = [];
    locations.map((location, index) => locationArray.push(...location));
    console.log(locationArray);

    console.log('가능날짜', availableDates);
    // locations: locationArray
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
    console.log(typeof formData.get('files'));
    console.log('진짜', data);
    console.log('formdata', formData);
    await MytourResister(formData);
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
  // const onLanguageHandler = (event) => {
  //   setLanguage(event.target.value);
  // };
  // const onLanguagesHandler = (event) => {
  //   event.preventDefault();
  //   const cleanedInput = language.trim();
  //   if (cleanedInput) {
  //     if (!languages.includes(cleanedInput)) {
  //       setLanguages([...languages, cleanedInput]);
  //       console.log(cleanedInput);
  //     } else {
  //       alert('이미 추가된 태그입니다');
  //     }
  //   } else {
  //     alert('내용을 입력하세요');
  //   }
  //   setLanguage('');
  // };
  // const removeLanguage = (language) => {
  //   setLanguages(languages.filter((selectedLanguage) => selectedLanguage !== language));
  // };

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

  // const onLocationsHandler = (event, index) => {
  //   const inputValue = event ? event.target.value : locationValue[index]; // button을 클릭했을 때는 location 값을 사용
  //   // 현재 location 배열을 복사합니다.
  //   const newLocation = [...locations];
  //   const changeLocation = [...locationValue];

  //   // 특정 인덱스의 값에 새 값을 추가합니다.
  //   if (newLocation[index]) {
  //     newLocation[index] += `, ${inputValue}`;
  //   } else {
  //     newLocation[index] = inputValue;
  //   }
  //   changeLocation[index] = '';
  //   // location 상태를 업데이트합니다.
  //   setLocations(newLocation);
  //   setLocationValue(changeLocation);
  // };
  const removeLocation = (x, y) => {
    const deleteLocation = [...locations];
    console.log(y);
    deleteLocation[x] = deleteLocation[x].filter((_, index) => {
      console.log(index !== y);
      return index !== y;
    });
    setLocations(deleteLocation);
  };

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
    console.log(location);
    const changeLocations = [...locations];
    const date = parseInt(location.date);
    if (date > 0) {
      changeLocations[date - 1].push(location);
      setLocations(changeLocations);
      console.log(locations);
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
    console.log('이미지 뭐야', event);
    const showlist = [...showImages];
    const list = [...images];

    if (imagesList.length + showlist.length > 10) {
      alert('이미지는 10개까지 등록 가능합니다.');
      return;
    }

    for (let i = 0; i < imagesList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(imagesList[i]);
      console.log('ppp', imagesList[i]);

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
    // handleImageChange(event);
  };

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const allFiles = Array.from(files);
  //   // console.log('files', files);
  //   // console.log('allFiles', allFiles);
  //   // console.log('images', images);

  //   Promise.all(
  //     allFiles.map((file) => {
  //       return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = () => resolve(reader.result);
  //         reader.onerror = (error) => reject(error);
  //       });
  //     })
  //   )
  //     .then((base64Files) => {
  //       setImages(base64Files);
  //     })
  //     .catch((e) => {
  //       console.error('file reading error', e);
  //     });
  // };

  const onRemoveImage = (index) => {
    const deleteImage = [...showImages];
    deleteImage.splice(index, 1);
    setShowImages(deleteImage);
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

            {/* <div className={styles.content}>
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
            )} */}
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
                          key={index}
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
    </div>
  );
}

export default TourRegist;

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

// function TourRegist() {
//   const [images, setImages] = useState([]); //투어 이미지
//   // const [selectedImages, setSelectedImages] = useState([]);
//   const [showImages, setShowImages] = useState([]);

//   var formData = new FormData();

// const handleSubmit = (event) => {
//   event.preventDefault();
//   console.log('images check', images);

// formData.append('title', '확인');
// formData.append('content', '확인내용');
// formData.append('price', 100);
// formData.append('languages', ['한국어', '중국어']);
// formData.append('howManyDay', ['2', '3']);
// formData.append('location', [{ title: '광안리', coordinates: [16.234, 122.0485] }]);
// formData.append('themeIds', [4]);
// formData.append('availableDates', ['2023-10-15']);

// const data = {
//   title: '확인',
//   content: '확인내용',
//   price: 100,
//   languages: ['한국어', '중국어'],
//   howManyDay: ['2', '3'],
//   location: [
//     {
//       date: '1',
//       title: '우리집',
//       coordinates: [12.2131, 14.3213]
//     },
//     {
//       date: '2',
//       title: '우리집2',
//       coordinates: [12.5, 12.123]
//     }
//   ],
//   themeIds: [4],
//   availableDates: ['2023-10-15']
// };

// const imglist = [];
// images.forEach((image, index) => {
//   imglist.push([image]);
// });
// formData.append('tourProduct', JSON.stringify(data)); // 객체를 문자열로 변환하여 추가
// formData.append(
//   'tourProductRequest',
//   new Blob([JSON.stringify(data)], {
//     type: 'application/json; charset=UTF-8'
//   })
// );
// // formData.append('files', images); // 각 이미지를 'files' 키로 추가
// images.forEach((image) => {
//   formData.append('files', image);
// });

// formData.append('files', imglist);
// formData.append('tourProductRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }));
// images.forEach((image, index) => {
//   formData.append('files', image);
//   // console.log(image);
// });
// formData.append('files', images);
// console.log(typeof formData.get('files'));
// console.log('formdata', formData);
// MytourResister(formData);
// // navigate('/tour/tourlist');
// };

// const onShowImagesHandler = (event) => {
//   const imagesList = event.target.files;
//   console.log('이미지 뭐야', imagesList);
//   const showlist = [...showImages];
//   const list = [...images];

//   if (imagesList.length + showlist.length > 10) {
//     alert('이미지는 10개까지 등록 가능합니다.');
//     return;
//   }

// for (let i = 0; i < imagesList.length; i++) {
//   const reader = new FileReader();
//   reader.readAsDataURL(imagesList[i]);
//   // list.push([imagesList[0]]);
//   setImages(list);
//   reader.onload = (e) => {
//     const imageURL = e.target.result;
//     // const base64data = reader.result;

//     if (showlist.includes(imageURL)) {
//       alert('이미 선택된 이미지입니다');
//     } else {
//       showlist.push(imageURL);
//       setShowImages(showlist);
//       list.push(imagesList[i]); // 이미지 파일 자체를 list에 추가
//       setImages(list);
//       // list.push(base64data);
//       // setSelectedImages([...selectedImages], { imgPath: imageURL });
//     }
//   };
// list.push(reader.result);
// setImages(list);
//   console.log('sksdkd', imagesList[i]);
//   formData.append('files', imagesList[i]);
// }
// handleImageChange(event);
// for (let i = 0; i < imagesList.length; i++) {
//   const reader = new FileReader();
//   reader.readAsDataURL(imagesList[i]);
//   console.log('ppp', imagesList[i]);

//   reader.onload = ((currentIndex) => {
//     return (e) => {
//       const imageURL = e.target.result;

//       if (showlist.includes(imageURL)) {
//         alert('이미 선택된 이미지입니다');
//       } else {
//         showlist.push(imageURL);
//         setShowImages(showlist);

//         list.push(imagesList[i]); // 이미지 파일 자체를 list에 추가
//         setImages(list);
//       }
//     };
//   })(i);
// }
// };

// const handleImageChange = (e) => {
//   const files = e.target.files;
//   const allFiles = Array.from(files);
//   // console.log('files', files);
//   // console.log('allFiles', allFiles);
//   // console.log('images', images);

//   Promise.all(
//     allFiles.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//       });
//     })
//   )
//     .then((base64Files) => {
//       setImages(base64Files);
//     })
//     .catch((e) => {
//       console.error('file reading error', e);
//     });
// };

//   const onRemoveImage = (index) => {
//     const deleteImage = [...showImages];
//     deleteImage.splice(index, 1);
//     setShowImages(deleteImage);
//   };
//   return (
//     <div style={{ backgroundColor: '#F9FAFB' }}>
//       <div className="container" style={{ padding: '70px 0' }}>
//         <div className={styles.container}>
//           <form onSubmit={handleSubmit}>
//             <div className={styles.content}>
//               <div className={styles.subtitle}>투어 대표 이미지</div>
//               {/* 이미지  */}
//               <label htmlFor="input-file" className="inputfile">
//                 <WallpaperIcon />
//                 <span style={{ margin: '5px' }}>업로드 이미지 선택</span>
//                 <input
//                   type="file"
//                   multiple
//                   id="input-file"
//                   style={{ display: 'none' }}
//                   accept="image/*"
//                   onChange={onShowImagesHandler}
//                 />
//               </label>
//             </div>
//             {/* 미리보기 이미지 렌더링 */}
//             <div className={styles.imageRow}>
//               {showImages.length > 0 &&
//                 showImages?.map((image, index) => (
//                   <div key={index} className={styles.imageContainer}>
//                     <RemoveCircleOutlineIcon
//                       style={{ paddingTop: '5px', paddingLeft: '5px', color: 'red' }}
//                       onClick={() => onRemoveImage(index)}
//                     />
//                     <img src={image} alt={`Preview ${index}`} className={styles.image} />
//                   </div>
//                 ))}
//             </div>
//             <div className={styles.flex}>
//               <button type="submit" className={styles.submit}>
//                 글 작성하기
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TourRegist;
