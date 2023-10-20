import React from 'react';

function AvailableLanguage({ selectedLanguages, setSelectedLanguages }) {
  const languages = [
    '한국어',
    '영어',
    '스페인어',
    '중국어',
    '일본어',
    '프랑스어',
    '독일어',
    '러시아어',
    '이탈리아어',
    '포르투갈어'
  ];

  const languageMappings = {
    한국어: '한국어',
    영어: '영어',
    스페인어: '스페인어',
    중국어: '중국어',
    일본어: '일본어',
    프랑스어: '프랑스어',
    독일어: '독일어',
    러시아어: '러시아어',
    이탈리아어: '이탈리아어',
    포르투갈어: '포르투갈어'
  };

  const handleLanguageChange = (e) => {
    e.preventDefault();

    const language = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedLanguages([...selectedLanguages, language]); // parseInt를 제거
    } else {
      setSelectedLanguages(selectedLanguages.filter((selectedLanguage) => selectedLanguage !== language)); // parseInt를 제거
    }
    console.log('선택됨', language);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1px', maxWidth: '100%' }}>
      {languages.map((language, index) => (
        <div key={index} style={{ width: '20%', display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <input
              type="checkbox"
              value={languageMappings[language]}
              checked={selectedLanguages.includes(languageMappings[language])}
              onChange={handleLanguageChange}
              style={{ width: '17px', height: '17px', marginRight: '5px' }}
            />
            <div style={{ display: 'flex', width: '100px', fontSize: '17px' }}>{language}</div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default AvailableLanguage;
