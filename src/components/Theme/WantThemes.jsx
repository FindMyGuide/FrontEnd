import React from 'react';

function WantThemes({ selectedThemes, setSelectedThemes }) {
  const themes = ['맛집여행', '역사투어', '애견동반', '힐링투어', '기타'];

  const themeMappings = {
    맛집여행: 4,
    역사투어: 6,
    애견동반: 1,
    힐링투어: 5,
    기타: 7
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedThemes([...selectedThemes, parseInt(theme, 10)]);
    } else {
      setSelectedThemes(selectedThemes.filter((selectedTheme) => selectedTheme !== parseInt(theme, 10)));
    }
  };

  return (
    <div style={{ display: 'flex', marginTop: '1px' }}>
      {themes.map((theme, index) => (
        <div key={index}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              value={themeMappings[theme]}
              checked={selectedThemes.includes(themeMappings[theme])}
              onChange={handleThemeChange}
              style={{ width: '17px', height: '17px', marginRight: '5px' }}
            />
            <div style={{ display: 'flex', width: '100px', fontSize: '17px' }}>{theme}</div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default WantThemes;
