import React, { useState } from 'react';

const CustomSwitch = ({ isOn, onColor = '#30D158', offColor = '#78788052', onToggle}) => {
  const [checked, setChecked] = useState(isOn || false);

  const toggleSwitch = () => {
  setChecked(!checked)
  onToggle(checked)
  };

  return (
    <div
      onClick={toggleSwitch}
      style={{
        display: 'inline-block',
        width: '51px',
        height: '31px',
        borderRadius: '100px',
        backgroundColor: checked ? onColor : offColor,
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
    >
      <div
        style={{
          width: '27px',
          height: '27px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          transition: 'left 0.3s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      ></div>
    </div>
  );
};

export default CustomSwitch;
