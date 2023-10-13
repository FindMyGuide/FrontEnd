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
    <div>
      <label>
        <input
          type="checkbox"
          value="맛집여행"
          checked={selectedThemes.includes('맛집여행')}
          onChange={handleThemeChange}
        />
        맛집여행
      </label>

      <label>
        <input
          type="checkbox"
          value="도보여행"
          checked={selectedThemes.includes('도보여행')}
          onChange={handleThemeChange}
        />
        도보여행
      </label>

      <label>
        <input type="checkbox" value="기타" checked={selectedThemes.includes('기타')} onChange={handleThemeChange} />
        기타
      </label>
    </div>
  );
}

export default Themes;
