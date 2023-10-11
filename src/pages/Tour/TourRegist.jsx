import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
// import './TourRegist.scss';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MytourResister } from '../../api/Mypage/MyGuide';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import styles from './TourRegist.module.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: start;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 70%;
  // border: 1px solid;

  text-align: start;

  margin: 2%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 100%;
  // border: 1px solid;
`;

const StyledLabel = styled.label`
  text-align: start;
  align-self: flex-start; // 이 부분이 중요합니다.

  font-size: 25px; // 기본 글씨 크기
  font-weight: bold;

  // 화면 크기가 768px 이하일 때
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // 화면 크기가 480px 이하일 때
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StyledInput = styled.input`
  width: 90%;
  height: 50px;

  background-color: #eaf0f7;
  border: none;
`;

const StyledFormGroup = styled(FormGroup)`
  flex-direction: row !important;
`;
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, 'M')}월</span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className="col col-end">
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, date }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      const isSelected = date.some((selected) => isSameDay(selected, day));

      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : // : isSameDay(day, selectedDate)
              isSelected
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day}
          onClick={() => onDateClick(new Date(cloneDay))}
        >
          <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState([]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    const isSelected = date.some((selected) => isSameDay(selected, day));

    if (!isSelected) {
      setDate([...date, day]);
    } else {
      const updatedDate = date.filter((selected) => !isSameDay(selected, day));
      setDate(updatedDate);
    }
    setSelectedDate(day);
  };
  return (
    <div className="calendar">
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} date={date} />
    </div>
  );
};

function TourRegist() {
  // const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setCalendarVisible(true);
  };
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState();
  const [language, setLanguage] = useState([]);
  const [howmanydays, setHowmanydays] = useState(['0', '1']);
  const [location, setLocation] = useState([]);
  const [themeIds, setThemeIds] = useState([]);
  // const themeCheck = ['off', 'off', 'off', 'off', 'off'];
  const [availableDates, setAvailableDates] = useState([]);
  const [images, setImages] = useState([]);

  // const [limit, setLimit] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSetContent = (e) => {
    setContent(e.target.value);
  };
  const handleSetPrice = (e) => {
    setPrice(e.target.value);
  };
  const handleSetLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const handleSetHowmanydays = (e) => {
    setHowmanydays(e.target.value);
  };
  const handleSetLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleSetThemeIds = (idx) => {
    console.log('테마', idx);
    console.log('테마 배열 변경 전', themeIds);

    const isExist = themeIds.includes(idx);
    if (isExist) {
      const filteredIds = themeIds.filter((id) => id !== idx);
      setThemeIds(filteredIds);
    } else {
      setThemeIds([...themeIds, idx]);
    }
    console.log('테마 배열 변경 후', themeIds);
  };
  // const setThemeCheck = (idx) => {
  //   themeCheck[idx] = !themeCheck[idx]
  // }
  const handleSetAvailableDates = (e) => {
    setAvailableDates(e.target.value);
  };

  const handleSetImages = (e) => {
    setImages(e.target.value);
  };

  const TourRegist = (event) => {
    event.preventDefault();
    console.log(howmanydays);
    MytourResister({ title, content, price, language, howmanydays, location, themeIds, availableDates });
  };

  const ToggleCalendar = (event) => {
    console.log('click');
    event.preventDefault();
    setCalendarVisible(!isCalendarVisible);
  };

  return (
    <StyledDiv>
      <div style={{ width: '65%', fontSize: '20px', fontWeight: 'bold' }}>가이드가 되어 투어를 등록해보세요</div>
      <StyledForm>
        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_title" className="titleLabel">
            투어명
          </StyledLabel>
          <StyledInput
            type="text"
            className="tour_title"
            id="tour_title"
            placeholder="투어명"
            value={title}
            onChange={handleSetTitle}
          />
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_content" className="contentLabel">
            투어설명
          </StyledLabel>
          <StyledInput
            type="text"
            className="tour_content"
            id="tour_content"
            placeholder="투어설명"
            value={content}
            onChange={handleSetContent}
          />
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_price" className="priceLabel">
            투어가격
          </StyledLabel>
          <StyledInput
            type="text"
            className="tour_price"
            id="tour_price"
            placeholder="투어가격"
            value={price}
            onChange={handleSetPrice}
          />
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_language" className="languageLabel">
            사용 가능 언어
          </StyledLabel>
          <StyledInput
            type="text"
            className="tour_language"
            id="tour_language"
            placeholder="사용 가능 언어"
            value={language}
            onChange={handleSetLanguage}
          />
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_howmanydays" className="howmanydaysLabel">
            투어 일정
          </StyledLabel>
          <Box style={{ width: '100%' }}>
            <FormControl className="styles.howmanydaysbox">
              <InputLabel id="demo-simple-select-label">투어일정</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={howmanydays}
                label="투어일정"
                onChange={handleSetHowmanydays}
                style={{ width: '90%' }}
              >
                <MenuItem value={['0', '1']}>하루</MenuItem>
                <MenuItem value={['1', '2']}>1박 2일</MenuItem>
                {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_location" className="locationLabel">
            투어 장소
          </StyledLabel>
          <StyledInput
            type="text"
            className="tour_location"
            id="tour_location"
            placeholder="투어 장소"
            value={location}
            onChange={handleSetLocation}
          />
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_themeIds" className="themeIdsLabel">
            투어 테마
          </StyledLabel>
          <StyledFormGroup>
            <FormControlLabel control={<Checkbox />} label="맛집투어" onClick={() => handleSetThemeIds(1)} />
            <FormControlLabel control={<Checkbox />} label="액티비티" onClick={() => handleSetThemeIds(2)} />
            <FormControlLabel control={<Checkbox />} label="역사탐방" onClick={() => handleSetThemeIds(3)} />
            <FormControlLabel control={<Checkbox />} label="힐링투어" onClick={() => handleSetThemeIds(4)} />
            <FormControlLabel control={<Checkbox />} label="반려동반" onClick={() => handleSetThemeIds(5)} />
          </StyledFormGroup>
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_availableDates" className="availableDatesLabel">
            투어 가능 날짜
          </StyledLabel>
          <CalendarMonthIcon onClick={handleOpen} />
          {isCalendarVisible && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Calendar />
              </Box>
            </Modal>
          )}
        </StyledInputDiv>

        <StyledInputDiv className="mb-2">
          <StyledLabel htmlFor="tour_images" className="ImagesLabel">
            투어 이미지 등록
          </StyledLabel>
        </StyledInputDiv>

        <button
          type="submit"
          onClick={TourRegist}
          style={{ backgroundColor: '#50ABF2', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          투어 등록하기
        </button>
      </StyledForm>
    </StyledDiv>
  );
}

export default TourRegist;
