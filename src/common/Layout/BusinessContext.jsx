import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [selectedBusiness, setSelectedBusiness] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedBusiness")) || null;
  });
  
  const businessListSelector = useSelector((state) => state?.businessList);
  useEffect(() => {
    // Check if it's the first time the user is loading (no selectedBusiness in localStorage)
    if (!selectedBusiness && businessListSelector?.data?.data?.records?.length > 0) {
      // Set the first business record as the selected business
      const firstBusiness = businessListSelector?.data?.data?.records?.[0];
      setSelectedBusiness(firstBusiness); // Update state
      localStorage.setItem("selectedBusiness", JSON.stringify(firstBusiness)); // Save to localStorage
    }else if(selectedBusiness){
        localStorage.setItem("selectedBusiness", JSON.stringify(selectedBusiness));
    }
  }, [selectedBusiness, businessListSelector]);

  return (
    <BusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
