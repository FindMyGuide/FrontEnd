import React, { useEffect, useState } from 'react';
import styles from './GuidePage.module.css';
import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, Slider, TextField } from '@mui/material';
import { GuideFilter, GuidePopular } from '../../api/guide/Guide';
import GuideCard from '../../components/PopularGuideCard/GuideCard';
import { FormLabel, Stack } from 'react-bootstrap';
import GuideSearchResult from './GuideSearchResult';

const GuidePage = () => {
  const languageList = [
    { title: '한국어', value: 'KOREAN' },
    { title: '영어', value: 'ENGLISH' },
    { title: '스페인어', value: 'SPANISH' },
    { title: '일본어', value: 'JAPANESE' },
    { title: '중국어', value: 'CHINESE' },
    { title: '포루투갈어', value: 'PORTUGUESE' },
    { title: '프랑스어', value: 'FRENCH' },
    { title: '러시아어', value: 'RUSSIAN' },
    { title: '이탈리아어', value: 'ITALIAN' },
    { title: '독일어', value: 'GERMAN' }
  ];
  //가이드 검색
  const [ageValue, setAgeValue] = useState([20, 60]);
  const [gender, setGender] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  //검색 결과
  const [searchResult, serSearchResult] = useState([]);
  //인기 가이드
  const [popularGuide, setPopularGuide] = useState([]);

  useEffect(() => {
    GuidePopular()
      .then((getPopularGuideList) => {
        const popularGuideList = getPopularGuideList;
        setPopularGuide(popularGuideList);
        console.log(popularGuideList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAge = (event, newValue) => {
    setAgeValue(newValue);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <>
      <div className={styles.webguide}>
        <h5 style={{ paddingTop: '20px' }}>
          <b>인기가이드</b>
        </h5>
        <div className={styles.famousGuide}>
          {popularGuide ? (
            popularGuide
              .slice(0, 4)
              .map((guide) => (
                <GuideCard
                  key={parseInt(guide?.guideId)}
                  guideId={guide?.guideId}
                  name={guide?.guideName}
                  tour={guide?.tourProductResponses[0]?.title}
                  imageLink={guide?.profilePicture}
                ></GuideCard>
              ))
          ) : (
            <></>
          )}
        </div>

        <div className={styles.guideSearchBox}>
          <div className={styles.SearchConditionBox}>
            <p style={{ marginBottom: '20px' }}>검색 필터</p>
            <div className={styles.guideconditions}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel>성별</FormLabel>
                <RadioGroup
                  row
                  defaultValue="all"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={handleGender}
                  sx={{
                    margin: 0,
                    paddingLeft: 1,
                    paddingRight: 1,
                    justifyContent: 'space-between',
                    mb: 1
                  }}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio sx={{ margin: 0, padding: 0 }} />}
                    sx={{
                      color: 'white',
                      margin: '0',
                      padding: '5px',
                      backgroundColor: 'rgb(80,171,242)',
                      borderRadius: '6px'
                    }}
                    label="전체"
                  />
                  <FormControlLabel
                    value="MALE"
                    control={<Radio sx={{ margin: 0, padding: 0 }} />}
                    sx={{
                      color: 'white',
                      margin: '0',
                      padding: '5px',
                      backgroundColor: 'rgb(80,171,242)',
                      borderRadius: '6px'
                    }}
                    label="남성"
                  />
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio sx={{ margin: 0, padding: 0 }} />}
                    sx={{
                      color: 'white',
                      margin: '0',
                      padding: '5px',
                      backgroundColor: 'rgb(80,171,242)',
                      borderRadius: '6px'
                    }}
                    label="여성"
                  />
                </RadioGroup>
              </FormControl>
              <div>
                <p>나이</p>
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                  <Slider
                    sx={{
                      color: 'rgb(80,171,242)'
                    }}
                    getAriaLabel={() => 'Age range'}
                    value={ageValue}
                    onChange={handleAge}
                    min={20}
                    max={60}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                  />
                </div>
              </div>
              <div>
                <p>언어</p>

                <div>
                  <Stack spacing={3} sx={{ width: 1000 }}>
                    <Autocomplete
                      sx={{
                        '& .MuiChip-root': {
                          backgroundColor: 'rgb(80,171,242)', // 선택된 항목의 배경색
                          color: 'white'
                        } // 선택된 항목의 글자색
                      }}
                      multiple
                      id="tags-outlined"
                      size="small"
                      options={languageList}
                      getOptionLabel={(option) => option.title}
                      // defaultValue={[languageList[1]]}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            placeholder: selectedLanguage.length > 0 ? '' : '언어 검색'
                          }}
                          size="small"
                        />
                      )}
                      isOptionEqualToValue={(option, value) => option.title === value.title}
                      onChange={(event, value) => {
                        const selectedLanguageTitles = value.map((language) => language.value);
                        setSelectedLanguage(selectedLanguageTitles);
                      }}
                    />
                  </Stack>
                </div>
              </div>
              <button
                className={styles.serachbutton}
                type="button"
                onClick={() => {
                  GuideFilter({ gender: gender, age: ageValue, language: selectedLanguage })
                    .then((getSearchList) => {
                      const searchGuideList = getSearchList;
                      serSearchResult(searchGuideList);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                검색
              </button>
            </div>
          </div>
          <div className={styles.resultSearchBox}>
            {searchResult?.length !== 0 ? (
              <>
                <h4>
                  <b>검색결과</b>
                </h4>
                {searchResult ? (
                  <GuideSearchResult list={searchResult}></GuideSearchResult>
                ) : (
                  <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>검색을 이용해 주세요</p>
                )}
              </>
            ) : (
              <div className={styles.textcenter}>
                <p>검색을 이용해 주세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
