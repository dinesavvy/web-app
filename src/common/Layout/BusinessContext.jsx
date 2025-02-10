import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessListHandler } from "../../redux/action/businessAction/businessListSlice";

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedBusiness")) || {};
  });


  const dispatch = useDispatch()

//    useEffect(() => {
//       let payload = {
//         page: 1,
//         limit: 10,
//       };
//       dispatch(businessListHandler(payload));
//     }, []);

  const businessListSelector = useSelector((state) => state?.businessList);
  

  useEffect(() => {
    // Check if it's the first time the user is loading (no selectedBusiness in localStorage)
    if (!selectedBusiness && businessListSelector?.data?.data?.records?.length > 0) {
      // Set the first business record as the selected business
      const firstBusiness = businessListSelector?.data?.data?.records?.[0];
      setSelectedBusiness(firstBusiness); // Update state
      // localStorage.setItem("selectedBusiness", JSON.stringify(firstBusiness)); // Save to localStorage
    } else if (selectedBusiness) {
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
