import React from 'react';

function Themes({ selectedThemes, setSelectedThemes }) {
  const handleThemeChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedThemes([...selectedThemes, value]);
    } else {
      setSelectedThemes(selectedThemes.filter((theme) => theme !== value));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px 5px 1px 0px' }}>
        <input
          type="checkbox"
          value="맛집여행"
          checked={selectedThemes.includes('맛집여행')}
          onChange={handleThemeChange}
        />
        맛집여행
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px 5px' }}>
        <input
          type="checkbox"
          value="역사탐방"
          checked={selectedThemes.includes('역사탐방')}
          onChange={handleThemeChange}
        />
        역사탐방
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px 5px' }}>
        <input
          type="checkbox"
          value="애견동반"
          checked={selectedThemes.includes('애견동반')}
          onChange={handleThemeChange}
        />
        애견동반
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px 5px' }}>
        <input
          type="checkbox"
          value="힐링투어"
          checked={selectedThemes.includes('힐링투어')}
          onChange={handleThemeChange}
        />
        힐링투어
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px 5px' }}>
        <input type="checkbox" value="기타" checked={selectedThemes.includes('기타')} onChange={handleThemeChange} />
        기타
      </label>
    </div>
  );
}
// style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
export default Themes;
