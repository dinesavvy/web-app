import React, { useState, useRef, useEffect } from 'react';
import dropdownArrow from "../../assets/images/dropdownArrow.svg"

const CustomSelect = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  // Handle clicks outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); 
    onChange(option);
  };

  return (
    <div className={`custom-select ${isOpen ? "rotate": ""} `}ref={selectRef}>
      <div
        className="select-header input"
        onClick={toggleDropdown}
      >
        {selectedOption || 'Select an option'}
        <img src={dropdownArrow} className="dropdownArrow" alt="" />
      </div>
      {isOpen && (
        <div
          className="select-options"
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={selectedOption === option ? 'options active' : 'options'}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
