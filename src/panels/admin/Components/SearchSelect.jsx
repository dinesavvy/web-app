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
  const location = useLocation();

  const options = [
    "city",
    "performance",
    "street",
    "zipCode",
    "district",
    "area",
  ];

  const followerListFilter = [
    "Restaurants following",
    "Number of friends",
    "Same prefences",
    "What they love",
    "Same accepeted nudges",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const placeholders = {
    "/admin/followers":
      "Search by preferences, what they love or nudges",
    "/admin/merchant/details":
      "Search by preferences, what they love or nudges",
    "/admin/suppliers": "Search Suppliers",
    "/admin/distributors": "Search Distributors",
    "/admin/brands": "Search Brands",
    "/admin/promotions": "Search Promotions",
    "/supplier/brands": "Search Brands",
    "/supplier/promotion": "Search Promotions",
    "/distributors/brands": "Search Brands",
    "/distributors/promotion": "Search Promotions",
    "/merchant/promotions": "Search for Promotions",
    "/admin/settings": "Search Settings",
    "/admin/followers":"Search Followers"
  };

  const placeholder = placeholders[location.pathname] || "Search Merchants";

  return (
    <>
      <div className="d-flex align-center justify-between gap-10 mb-20 ">
        <div className="lineSearch w-100">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder={placeholder}
            autoComplete="off"
          />
          <img src={searchIcon} alt="" className="absoluteImage" />
        </div>
        {/* {location.pathname !== "/admin/merchant/followers" && ( */}
        {(location?.pathname === "/admin/merchant/list" ||
          location?.pathname === "/admin/merchant/details") && (
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
                {(location?.pathname === "/admin/followers" ||
                  location?.pathname === "/admin/merchant/details") &&
                  followerListFilter.map((option, index) => (
                    <div key={index} className="dropdown-item custom-checkbox">
                      <label className="checkLabel">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(option)}
                          onChange={() => handleSelect(option)}
                        />
                        <span className="checkmark"></span>
                        {/* {option} */}
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  ))}

                {location?.pathname === "/admin/merchant/list" &&
                  options.map((option, index) => (
                    <div key={index} className="dropdown-item custom-checkbox">
                      <label className="checkLabel">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(option)}
                          onChange={() => handleSelect(option)}
                        />
                        <span className="checkmark"></span>
                        {/* {option} */}
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
        {/* )} */}
      </div>

      {/* Selected Items */}
      {selectedItems.length === true && (
        <div
          className={`selected-items ${selectedItems.length ? "mb-20" : ""}`}
        >
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              {/* {item} */}
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <button
                className="remove-button"
                onClick={() => handleRemove(item)}
              >
                <img src={deleteList} alt="" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchSelect;
