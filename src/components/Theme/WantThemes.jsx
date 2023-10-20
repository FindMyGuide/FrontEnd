import React from 'react';

function WantThemes({ selectedThemes, setSelectedThemes }) {
  const themes = [
    { themeId: 1, title: '맛집여행' },
    { themeId: 2, title: '역사투어' },
    { themeId: 3, title: '애견동반' },
    { themeId: 4, title: '힐링투어' },
    { themeId: 5, title: '기타' }
  ];

  const themeMappings = {
    맛집여행: 1,
    역사투어: 2,
    애견동반: 3,
    힐링투어: 4,
    기타: 5
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
      {themes.map((theme) => (
        <div key={theme.themeId}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              value={theme.themeId}
              checked={selectedThemes.includes(theme.themeId)}
              onChange={handleThemeChange}
              style={{ width: '17px', height: '17px', marginRight: '5px' }}
            />
            <div style={{ display: 'flex', width: '100px', fontSize: '17px' }}>{theme.title}</div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default WantThemes;
