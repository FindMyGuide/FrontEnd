import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateArticle } from 'api/want/Want';
import styles from './WantTourRegist.module.css';

// component, icon
import Location from 'components/Location/Location';
import Themes from 'components/Theme/Themes';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

function WantTourRegist() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [persons, setPersons] = useState(1);
  const [themes, setThemes] = useState([]);
  const [location, setLocaiton] = useState('');
  const [locations, setLocations] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    CreateArticle({ title, content, date, persons, themes, locations });
    console.log(themes);
    navigate('/wanttour');
  };

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const increment = (event) => {
    event.preventDefault();
    setPersons(persons + 1);
  };

  const decrement = (event) => {
    event.preventDefault();
    if (persons > 1) {
      setPersons(persons - 1);
    }
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

  return (
    <div style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container" style={{ padding: '70px 0' }}>
        <div className={styles.container}>
          <div className={styles.title}>
            원하는 투어를 <span className="color">직접</span> 등록해보세요
          </div>
          <div className={styles.explain}>
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
                maxLength="20"
                className={styles.input}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>내용</div>
              <textarea
                placeholder="원하는 투어에 대한 상세 설명을 남겨주세요"
                value={content}
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
                  style={{ width: '88%' }}
                  className={styles.input}
                />
                <button onClick={onLocationsHandler} className={styles.add}>
                  추가하기
                </button>
                <div>
                  {locations.map((location, index) => (
                    <Location key={index} location={location} removeLocation={removeLocation} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 날짜</div>
              {/* 달력 */}
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 인원</div>
              <IndeterminateCheckBoxIcon onClick={decrement} style={{ fill: '#979797' }}></IndeterminateCheckBoxIcon>
              <input type="number" readOly value={persons} className={styles.price} />
              <AddBoxIcon onClick={increment} style={{ fill: '#979797' }}></AddBoxIcon>
              <span>명</span>
            </div>
            <div className={styles.content}>
              <div className={styles.subtitle}>투어 테마</div>
              <Themes selectedThemes={themes} setSelectedThemes={setThemes} />
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

export default WantTourRegist;
