import React, { useState, useRef, useEffect } from "react";
import searchIcon from "../../../assets/images/searchIcon.svg";
import filterIcon from "../../../assets/images/filterIcon.svg";
import deleteList from "../../../assets/images/deleteList.svg";
import { useLocation } from "react-router-dom";

const SearchSelect = ({ onSearchChange, onSearchAreaChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dropdownRef = useRef(null); // Reference for the dropdown container

  const options = [
    "city",
    "performance",
    "street",
    "zipCode",
    "district",
    "area",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const location = useLocation();

  const handleSelect = (option) => {
    const updatedSelectedItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(updatedSelectedItems);
    onSearchAreaChange(updatedSelectedItems); // Notify parent
  };

  const handleRemove = (option) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item !== option
    );
    setSelectedItems(updatedSelectedItems);
    onSearchAreaChange(updatedSelectedItems); // Notify parent
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value); // Notify parent
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="d-flex align-center justify-between gap-10 mb-20 ">
        <div className="lineSearch w-100">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder={location.pathname === "/admin/merchant/followers" ?"Search by preferences, what they love or nudges":"Search Merchants"}
          />
          <img src={searchIcon} alt="" className="absoluteImage" />
        </div>
        {location.pathname !== "/admin/merchant/followers" && (
          <div className="dropdown-container" ref={dropdownRef}>
            {/* Dropdown */}
            <div className="dropdown-header" onClick={toggleDropdown}>
              <button className="dropdown-button">
                <img src={filterIcon} alt="" />
                Filter
              </button>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-list">
                <div className="lineSearch w-100">
                  <input
                    type="text"
                    name="text"
                    placeholder="Filter by..."
                    id="text"
                  />
                  <img src={searchIcon} alt="" className="absoluteImage" />
                </div>
                {options.map((option, index) => (
                  <div key={index} className="dropdown-item custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(option)}
                        onChange={() => handleSelect(option)}
                      />
                      <span class="checkmark"></span>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Items */}
      <div className="selected-items mb-20">
        {selectedItems.map((item, index) => (
          <div key={index} className="selected-item">
            {item}
            <button
              className="remove-button"
              onClick={() => handleRemove(item)}
            >
              <img src={deleteList} alt="" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchSelect;
