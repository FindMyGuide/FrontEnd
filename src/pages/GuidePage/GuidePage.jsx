import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './GuidePage.module.css';

import { FormControl, InputLabel, Radio, RadioGroup, Select, Slider } from '@mui/material';
import { GuidePopular } from '../../api/guide/Guide';
import GuideCard from '../../components/PopularGuideCard/GuideCard';
import { FormLabel } from 'react-bootstrap';

const GuidePage = () => {
  //가이드 검색
  const [ageValue, setAgeValue] = useState([30, 37]);
  const [personName, setPersonName] = useState([]);
  const [gender, setGender] = useState('all');
  //인기 가이드
  const [popularGuide, setPopularGuide] = useState([]);

  useEffect(() => {
    GuidePopular()
      .then((getPopularGuideList) => {
        const popularGuideList = getPopularGuideList;
        setPopularGuide(popularGuideList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  const handleAge = (event, newValue) => {
    setAgeValue(newValue);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    // 가이드 언어 계속 추가만 됨 여기 수정 필요
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected && !value.includes(options[i])) {
        value.push(options[i].value);
      }
    }
    setPersonName([...personName, value]);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="appGuide"></div>
        </>
      ) : (
        <>
          <div className="webGuide">
            <p>인기가이드</p>
            <div className={styles.famousGuide}>
              {popularGuide ? (
                popularGuide.map((guide) => (
                  <GuideCard
                    key={parseInt(guide.guideId)}
                    guideId={guide?.guideId}
                    name={guide?.guideName}
                    tour={guide?.tourProductTitles[0]?.title}
                  ></GuideCard>
                ))
              ) : (
                <></>
              )}
            </div>

            <div className={styles.guideSearchBox}>
              <div className={styles.SearchConditionBox}>
                <p>가이드검색</p>
                <div>
                  <FormControl>
                    <FormLabel>성별</FormLabel>
                    <RadioGroup
                      defaultValue="all"
                      name="controlled-radio-buttons-group"
                      value={gender}
                      onChange={handleGender}
                      sx={{ my: 0 }}
                    >
                      <Radio value="all" label="전체" />
                      <Radio value="male" label="남성" />
                      <Radio value="female" label="여성" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <p>나이</p>
                  <Slider
                    getAriaLabel={() => 'Age range'}
                    value={ageValue}
                    onChange={handleAge}
                    min={20}
                    max={60}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                  />
                </div>
                <div>
                  <p>언어</p>
                  <div>{personName}</div>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                      <InputLabel shrink htmlFor="select-multiple-native">
                        Native
                      </InputLabel>
                      <Select
                        multiple
                        native
                        value={personName}
                        onChange={handleChangeMultiple}
                        label="Native"
                        inputProps={{
                          id: 'select-multiple-native'
                        }}
                      >
                        {names.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <button type="button">검색</button>
              </div>
              <div className={styles.resultSearchBox}>
                <p>검색결과</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GuidePage;
