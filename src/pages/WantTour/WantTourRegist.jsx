import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateArticle } from '../../api/want/Want';
import styles from './WantTourRegist.module.css';

// component, icon
import Location from '../../components/Location/Location';
import Themes from '../../components/Theme/Themes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

function WantTourRegist() {
  // const isLoggedIn = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [persons, setPersons] = useState(1);
  const [themes, setThemes] = useState([]);
  const [location, setLocaiton] = useState('');
  const [locations, setLocations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 글 등록 axios
    // 등록이 잘 되었으면 list 페이지로 이동
    CreateArticle({ title, content, date, persons, themes, locations });
    console.log(themes);
    navigate('/wanttour');
  };

  const onTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onContentHandler = (e) => {
    setContent(e.target.value);
  };

  const increment = (e) => {
    e.preventDefault();
    setPersons(persons + 1);
  };

  const decrement = (e) => {
    e.preventDefault();
    if (persons > 1) {
      setPersons(persons - 1);
    }
  };

  const onLocationHandler = (e) => {
    setLocaiton(e.target.value);
  };

  const onLocationsHandler = (e) => {
    e.preventDefault();
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
    <div className="container">
      <h3>원하는 투어를 등록해보세요</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formPlaintextEmail">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={onTitleHandler}
            maxLength="20"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTextarea">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="원하는 투어에 대해 남겨주세요"
            value={content}
            onChange={onContentHandler}
            style={{ height: '140px' }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>원하는 투어 날짜를 선택하세요</Form.Label>
          {/* 달력 컴포넌트 */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPersons">
          <Form.Label>원하는 투어 인원을 선택하세요</Form.Label>
          <IndeterminateCheckBoxIcon onClick={decrement} style={{ fill: '#979797' }}></IndeterminateCheckBoxIcon>
          <input type="number" readOnly value={persons} className={styles.price} />
          <AddBoxIcon onClick={increment} style={{ fill: '#979797' }}></AddBoxIcon>
          <span>명</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTheme">
          <Form.Label>원하는 투어 테마를 선택하세요</Form.Label>
          <Themes selectedThemes={themes} setSelectedThemes={setThemes} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>꼭 가고싶은 장소를 입력하세요</Form.Label>
          <Form.Control type="text" placeholder="장소 입력" value={location} onChange={onLocationHandler} />
          <button onClick={onLocationsHandler}>추가하기</button>
          {locations.map((location, index) => (
            <Location key={index} location={location} removeLocation={removeLocation} />
          ))}
        </Form.Group>
        <Button type="submit">글 작성하기</Button>
      </Form>
    </div>
  );
}

export default WantTourRegist;
