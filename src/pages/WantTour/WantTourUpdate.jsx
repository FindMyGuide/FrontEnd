import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UpdateArticle } from '../../api/want/Want';

// component
import Location from '../../components/Location/Location';
import Themes from '../../components/Theme/Themes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function WantTourRegist() {
  // const isLoggedIn = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const current = useLocation();
  const { post } = current.state;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [date, setDate] = useState(post.date);
  const [persons, setPersons] = useState(post.persons);
  const [price, setPrice] = useState(post.price);
  const [themes, setThemes] = useState(post.themes);
  const [location, setLocaiton] = useState('');
  const [locations, setLocations] = useState(post.locations);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 글 등록 axios
    // 등록이 잘 되었으면 list 페이지로 이동
    UpdateArticle({ title, content, date, persons, price, themes, locations });
    navigate(`/wanttour/detail/${post.id}`);
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

  const onPriceHandler = (e) => {
    setPrice(e.target.value);
  };

  const onLocationHandler = (e) => {
    setLocaiton(e.target.value);
  };

  const onLocationsHandler = (e) => {
    e.preventDefault();
    const cleanedInput = location.trim();
    if (cleanedInput) {
      setLocations([...locations, location]);
      console.log(locations);
    } else {
      alert('내용을 입력하세요');
    }
    setLocaiton('');
  };

  const removeLocation = (location) => {
    setLocations(locations.filter((selectedLocation) => selectedLocation !== location));
  };

  return (
    <div>
      <h3>원하는 투어를 등록해보세요</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formPlaintextEmail">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="제목을 입력하세요" value={title} onChange={onTitleHandler} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTextarea">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="원하는 투어에 대해 남겨주세요"
            value={content}
            onChange={onContentHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>원하는 투어 날짜를 선택하세요</Form.Label>
          {/* 달력 컴포넌트 */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPersons">
          <Form.Label>원하는 투어 인원을 선택하세요</Form.Label>
          <button onClick={decrement}>-</button>
          <input type="number" readOnly value={persons} />
          <button onClick={increment}>+</button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>원하는 투어 가격을 입력하세요</Form.Label>
          <input type="number" value={price} onChange={onPriceHandler} min="0" step="100" />
          <span>원</span>
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
        <Button type="submit">글 수정하기</Button>
      </Form>
    </div>
  );
}

export default WantTourRegist;
