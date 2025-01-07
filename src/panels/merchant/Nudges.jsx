import React, { useEffect, useState } from "react";
import searchIcon from "../../assets/images/searchIcon.svg";
import addCredits from "../../assets/images/addCredits.svg";
import radioSelected from "../../assets/images/radioSelected.svg";
import olive from "../../assets/images/olive.png";
import restaurantCard from "../../assets/images/restaurantCard.png";
import NudgeDetail from "../../shared/components/nudgeDetail/NudgeDetail";

const Nudges = () => {
  const options = [
    { value: "1", label: "Option 1", img: olive },
    { value: "2", label: "Option 2", img: olive },
    { value: "3", label: "Option 3", img: olive },
  ];
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || "");
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isSidebarOpen]);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Nudges</div>
          <div className="divider2"></div>
          <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              name="text"
              placeholder="Search Nudges/Restaurant"
              id="text"
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          <div className="overflowy">
            <div className="gap-20 nudgeGrid">
              {options.map((option) => (
                <label key={option.value} className="custom-label">
                  <input
                    type="radio"
                    name="option"
                    value={option.value}
                    checked={selectedValue === option.value} // Dynamically toggle based on state
                    onChange={handleChange}
                  />
                  <div className="custom-radio-button">
                    <img src={radioSelected} alt="radioSelected" />
                  </div>
                  <div className="radioImage">
                    <img src={option.img} alt="" />
                  </div>
                  <div className="radioCafeName">
                    <div>
                      <div className="pc fs-14 fw-500">
                        The Cheesecake Factory
                      </div>
                      <div className="fs-12">Street No 2, ABC Road</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-24 fw-600">Nudges</div>
            <div className="btn btnSecondary p16 gap-8">
              <img src={addCredits} alt="addCredits" />
              Create a Nudge
            </div>
          </div>
          <div class="tabs-container tab3 tabing mb-20">
            <div class="tabs">
              <button class="tab-button active">Active</button>
              <button class="tab-button ">Inactive</button>
            </div>
          </div>
          <div className="merchantGrid">
            <div className="merchantCard">
              <div className="position-relative">
                <img
                  className="w-100 merchantImg"
                  src={restaurantCard}
                  alt=""
                />
                <div className="freeAbsolute">
                  <div className=" fs-16 fw-700 mb-2">Free Drink</div>
                  <div className="fs-14">New York, NY</div>
                </div>
              </div>
              <div className="bottomPadding">
                <div className="lightBlack fs-14 mb-20">
                  Get 20% off on all large pizzas today! Limited time offer.
                </div>
                <div className="d-flex justify-between align-center gap-20 mb-8">
                  <div className="fs-14 lightBlack ">Sent date</div>
                  <div className="fs-14 fw-500">Mar 19, 2024</div>
                </div>
                <div className="d-flex justify-between align-center gap-20 mb-8">
                  <div className="fs-14 lightBlack ">Expiration date</div>
                  <div className="fs-14 fw-500">Mar 26, 2024</div>
                </div>
                <div className="divider2"></div>
                <div className="grid2 mb-20">
                  <div>
                    <div className="fs-14 mb-4 lightBlack">Recipients:</div>
                    <div className="fs-14 fw-600">500</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4 lightBlack">Accepted:</div>
                    <div className="fs-14 fw-600 gc">320/60%</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4 lightBlack">Declined:</div>
                    <div className="fs-14 fw-600 rc">180/40%</div>
                  </div>
                  <div>
                    <div className="fs-14 mb-4 lightBlack">No Response</div>
                    <div className="fs-14 fw-600 greyColor">$10.00</div>
                  </div>
                </div>
                <div className="btn btnSecondary w-100" onClick={toggleSidebar}>
                  View Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
            <NudgeDetail isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}
    </>
  );
};

export default Nudges;
