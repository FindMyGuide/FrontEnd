import React from 'react';

function Vehicle({ selectedVehicle, setSelectedVehicle }) {
  const handleThemeChange = (e) => {
    const value = e.target.value;
    setSelectedVehicle(value);
  };

  const vehicles = ['자동차', '대중교통', '자전거', '오토바이', '도보'];

  return (
    <div style={{ display: 'flex', marginTop: '1px' }}>
      {vehicles.map((vehicle, index) => (
        <div key={index}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              value={vehicle}
              checked={selectedVehicle === vehicle}
              onChange={handleThemeChange}
              style={{
                width: '17px',
                height: '17px',
                marginRight: '5px'
              }}
            />
            <div style={{ display: 'flex', width: '100px', fontSize: '17px' }}>{vehicle}</div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Vehicle;
