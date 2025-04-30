import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import importIcon from "../../../../assets/images/importIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../../common/Loader/Loader";
import RightArrow from "../../../../assets/images/rightArrow.svg"

const SupportDetail = ({ isOpen, toggleSidebar, supportItem,activeTab }) => {
  const navigate = useNavigate();

  const [placeDetails, setPlaceDetails] = useState(null);
  const googleAPIKey = "AIzaSyBaLPuWhc_yVKRMBl0_4EoxSYDYJTsxVx8";

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
  if(isOpen){
    const fetchPlaceDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json`,
          {
            params: {
              fields:
                "url,formatted_address,name,geometry,photo,place_id,rating,vicinity,opening_hours,website,reservable,delivery,formatted_phone_number,international_phone_number,address_component",
              place_id: supportItem?.googlePlaceId,
              key: googleAPIKey,
            },
          }
        );
        if(response?.status === 200){
          // navigate("/admin/edit-support",{state:{businessDetail:response?.data,supportItem:supportItem}}); // Use the response data as state
          setPlaceDetails(response)
          getAddress()
          // toggleSidebar();
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaceDetails()
  }
  }, [isOpen])



  const importFromGoogle = () => {
    if (supportItem) {
    //   const fetchPlaceDetails = async () => {
    //     setIsLoading(true);
    //     try {
    //       const response = await axios.get(
    //         `https://maps.googleapis.com/maps/api/place/details/json`,
    //         {
    //           params: {
    //             fields:
    //               "url,formatted_address,name,geometry,photo,place_id,rating,vicinity,opening_hours,website,reservable,delivery,formatted_phone_number,international_phone_number,address_component",
    //             place_id: supportItem?.googlePlaceId,
    //             // placeId:"ChIJv88_0sybXjkRtDmJwm7XVhA",
    //             key: googleAPIKey,
    //           },
    //         }
    //       );
    //       if(response?.status === 200){
    //         navigate("/admin/edit-support",{state:{businessDetail:response?.data,supportItem:supportItem}}); // Use the response data as state
    //         toggleSidebar();
    //       }
    //     } catch (error) {
    //       console.error("Error fetching place details:", error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    //   fetchPlaceDetails();
    navigate("/admin/edit-support",{state:{businessDetail:placeDetails?.data,supportItem:supportItem}});
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isOpen && <div className="overlay2" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Detail View</div>
          <div className="closeSidebar" onClick={toggleSidebar}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="d-flex align-center gap-12 mb-18">
            <div className="initialName">
              {supportItem?.fullName
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <div className="fw-700">{supportItem?.fullName.charAt(0).toUpperCase() + supportItem?.fullName.slice(1).toLowerCase() || "-"}</div>
              {/* <div className="fs-14 fw-300 o5 ">#123456</div> */}
            </div>
          </div>

          <div className="mb-40">
            <div className="fs-14">
              <div className="lightBlack mb-4">Business name</div>
              <div className="fw-600">{supportItem?.fullName?.charAt(0)?.toUpperCase() + supportItem?.fullName?.slice(1)?.toLowerCase() || "-"}</div>
              {/* {supportItem?.fullName?.charAt(0)?.toUpperCase() + supportItem?.fullName?.slice(1)?.toLowerCase() || "-"} */}
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Phone number</div>
              <div className="fw-600">{supportItem?.phoneNumber || "N/A"}</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Email address</div>
              <div className="fw-600">{supportItem?.emailAddress || "N/A"}</div>
            </div>
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Description</div>
              <div className="fw-600">
               {supportItem?.description|| "N/A"}
              </div>
            </div>
            {/* <div className="divider18"></div> */}
            {/* <div className="fs-14">
              <div className="lightBlack mb-4">Working Hours</div>
              <div className="fw-600">12–3 pm, 7–11 pm</div>
            </div> */}
            <div className="divider18"></div>
            <div className="fs-14">
              <div className="lightBlack mb-4">Location</div>
              <div className="fw-600">
                {/* SG Iscon Junction TP, Shivalik Shilp, Hardcastle Restaurants Pvt
                Ltd, Ground floor, 14, Sarkhej - Gandhinagar Hwy */}
                {placeDetails?.data?.result?.formatted_address|| "N/A"}
              </div>
            </div>
          </div>
          {activeTab==="Active"&& (
          <div className="btn" onClick={() => importFromGoogle()}>
            Import form Google <img src={importIcon} alt="" />
          </div>
          )}
          {activeTab==="Resolve"&& (
          <div className="btn" onClick={() => viewBusinessProfile()}>
            View Google Business Profile <img src={RightArrow} alt="" />
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupportDetail;
