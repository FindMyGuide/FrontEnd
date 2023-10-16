import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreateArticle } from 'api/want/Want';
import styles from './WantTour.module.css';

// component, icon
import WantLocation from 'components/Location/WantLocation';
import WantThemes from 'components/Theme/WantThemes';
import Vehicle from 'components/Vehicle/Vehicle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import CustomLocale from 'components/Calendar/CustomLocale';
import { ReactComponent as Prev } from 'asset/icons/prev.svg';
import { Calendar } from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';

function WantTourRegist() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState([]);
  const [totalPeople, setTotalPeople] = useState(1);
  const [vehicle, setVehicle] = useState('');
  const [price, setPrice] = useState(0);
  const [themes, setThemes] = useState([]);
  const [location, setLocaiton] = useState('');
  const [locations, setLocations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedDates = date.map((selectedDate) => {
      const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(
        selectedDate.day
      ).padStart(2, '0')}`;
      return formattedDate;
    });

    try {
      await CreateArticle({
        title,
        content,
        wantDates: formattedDates,
        totalPeople,
        vehicle,
        price,
        themeIds: themes,
        location: locations.map((location) => ({ title: location }))
      });
      // navigate('/wanttour');
    } catch (error) {
      alert('다시 작성해주세요');
      console.error(error);
    }
  };

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const handlePrice = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/\D/g, '');
    setPrice(Math.max(0, sanitizedInput));
  };

  // 인원 조정
  const handlePerson = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/\D/g, '');
    setTotalPeople(Math.max(1, sanitizedInput));
  };

  const decrement = () => {
    setTotalPeople((prev) => Math.max(prev - 1, 1));
  };

  const increment = () => {
    setTotalPeople((prev) => prev + 1);
  };

  const onLocationHandler = (event) => {
    setLocaiton(event.target.value);
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
    setLocaiton('');
  };

  const removeLocation = (location) => {
    setLocations(locations.filter((selectedLocation) => selectedLocation !== location));
  };

  // 캘린더
  const minimumDate = utils().getToday();
  const myCustomLocale = CustomLocale;

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <div className={styles.parentContainer} style={{ marginBottom: '20px' }}>
            <Link to="/wanttour">
              <Prev />
            </Link>
            <div className={styles.postTitle}>
              원하는 투어를 <span className="color">직접</span> 등록해보세요
            </div>
          </div>
          {/* <div className={styles.explain}>
            <div>본인이 원하는 투어를 찾지 못하였다면 원하는 투어의 내용을 작성하여 등록해보세요</div>
            <div>등록한 후, 가이드를 연락을 기다리시면 됩니다 !</div>
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={styles.content}>
              <div className={styles.subtitle}>제목</div>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={onTitleHandler}
                maxLength="40"
                className={styles.input}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>내용</div>
              <textarea
                placeholder="원하는 투어에 대한 상세 설명을 남겨주세요"
                value={content}
                className={styles.textarea}
                onChange={onContentHandler}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>꼭 가고싶은 장소</div>
              <div className={styles.location}>
                <input
                  type="text"
                  placeholder="장소 입력"
                  value={location}
                  onChange={onLocationHandler}
                  style={{ width: '87%' }}
                  className={styles.input}
                />
                <button onClick={onLocationsHandler} className={styles.add}>
                  추가하기
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20%' }}>
              {locations &&
                locations.map((location, index) => (
                  <span key={index} style={{ margin: '0 8px 15px 0' }}>
                    <WantLocation key={index} location={location} removeLocation={removeLocation} />
                  </span>
                ))}
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 날짜</div>
              <Calendar
                value={date}
                onChange={setDate}
                locale={myCustomLocale}
                minimumDate={minimumDate}
                shouldHighlightWeekends
              />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 인원</div>
              <div className={styles.parentContainer}>
                <AddBoxIcon onClick={increment} style={{ fill: '#c1c1c1' }}></AddBoxIcon>
                <input
                  type="text"
                  value={totalPeople}
                  className={styles.price}
                  onChange={handlePerson}
                  style={{ width: '70px' }}
                />
                <IndeterminateCheckBoxIcon onClick={decrement} style={{ fill: '#c1c1c1' }}></IndeterminateCheckBoxIcon>
                <span style={{ fontSize: '17px', marginLeft: '5px' }}>명</span>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>원하는 가격</div>
              <div className={styles.parentContainer}>
                <input
                  type="text"
                  value={price}
                  className={styles.price}
                  onChange={handlePrice}
                  style={{ width: '117px' }}
                />
                <span style={{ fontSize: '17px', marginLeft: '6px' }}>원</span>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>선호 교통수단</div>
              <Vehicle selectedVehicle={vehicle} setSelectedVehicle={setVehicle} />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 테마</div>
              <WantThemes selectedThemes={themes} setSelectedThemes={setThemes} />
            </div>
            <div className={styles.flex}>
              <button type="submit" className={styles.submit}>
                글 작성하기
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default WantTourRegist;
