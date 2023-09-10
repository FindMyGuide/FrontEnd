import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './GuidePage.module.css';

import { FormControl, InputLabel, Select, Slider } from '@mui/material';

const GuidePage = () => {
  const [ageValue, setAgeValue] = useState([20, 37]);
  const [personName, setPersonName] = React.useState([]);

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

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
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
              <div className={styles.guideBox}>
                <div></div>
                <div>
                  <h1>name</h1>
                  <p>설명</p>
                  <img src="" alt="" />
                </div>
              </div>
              <div className={styles.guideBox}>
                <div></div>
                <div>
                  <h1>name</h1>
                  <p>설명</p>
                  <img src="" alt="" />
                </div>
              </div>
            </div>

            <div className={styles.guideSearchBox}>
              <div className={styles.SearchConditionBox}>
                <p>가이드검색</p>
                <div>
                  <p>성별</p>
                  <button type="button">전체</button>
                  <button type="button">남자</button>
                  <button type="button">여자</button>
                </div>
                <div>
                  <p>나이</p>
                  <Slider
                    getAriaLabel={() => 'Age range'}
                    value={ageValue}
                    onChange={handleAge}
                    min={20}
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
