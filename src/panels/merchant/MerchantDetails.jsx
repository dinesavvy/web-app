import React, { useState } from "react";
import "./merchant.css";
import backButton from "../../assets/images/backButton.svg";
import breadCrumbIcon from "../../assets/images/breadCrumb.svg";
import editBtn from "../../assets/images/editBtn.svg";
import cafeIcon from "../../assets/images/cafeIcon.svg";
import downloadIcon from "../../assets/images/downloadIcon.svg";
import { Breadcrumb } from "antd";

const MerchantDetails = () => {
  const [activeTab3, setActiveTab3] = useState("2");
  const [editInput, setEditInput] = useState(false);
  const tabs3 = [
    {
      id: "1",
      label: "Google Business Profile",
    },
    {
      id: "2",
      label: "Dine Savvy Account",
    },
    {
      id: "3",
      label: "Followers",
    },
    {
      id: "4",
      label: "Nudges",
    },
  ];
  return (
    <>
      <div className="dashboard">
        <div className="tabs-container tab3 tabFull">
          <div className="tabs">
            {tabs3.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${
                  activeTab3 === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab3(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {activeTab3 === "1" ? (
          <>
            <div className="tabPadding">
              <div className="d-flex align-center gap-20 mb-30">
                <img src={backButton} alt="" />
                <div>
                  <div className="fs-24 fw-600 mb-4">Merchants Details</div>
                  <Breadcrumb
                    separator={<img src={breadCrumbIcon} />}
                    items={[
                      {
                        title: "Merchants",
                      },
                      {
                        title: "Merchants Details",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="card mb-30">
                <div className="d-flex align-center justify-between gap-20 mb-20">
                  <div className="fs-20 fw-700">About your business</div>
                  {editInput === true ? (
                    <div className="d-flex gap-20">
                      <div
                        className="btnSecondary saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className="saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Save
                      </div>
                    </div>
                  ) : (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )}
                </div>
                <div className="inputGrid">
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Business name
                    </label>
                    {editInput === true ? (
                      <input
                        type="text"
                        className="input"
                        placeholder="Garden Grove Café & Bistro"
                      />
                    ) : (
                      <div className="">Garden Grove Café & Bistro</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Business category
                    </label>
                    {editInput === true ? (
                      <input
                        type="text"
                        className="input"
                        placeholder="Restaurant"
                      />
                    ) : (
                      <div className="">Restaurant</div>
                    )}
                  </div>
                  <div className="twoSpace">
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Description
                    </label>
                    {editInput === true ? (
                      <input
                        type="text"
                        className="input"
                        placeholder="Whether you're joining us for a casual lunch, a special dinner, or a weekend brunch, our elegant yet relaxed atmosphere is perfect for any occasion."
                      />
                    ) : (
                      <div className="">
                        Whether you're joining us for a casual lunch, a special
                        dinner, or a weekend brunch, our elegant yet relaxed
                        atmosphere is perfect for any occasion.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card mb-30">
                <div className="d-flex align-center justify-between gap-20 mb-20">
                  <div className="fs-20 fw-700">
                    Primary Contact information
                  </div>
                  {editInput === true ? (
                    <div className="d-flex gap-20">
                      <div
                        className="btnSecondary saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Cancel
                      </div>
                      <div
                        className="saveBtn btn"
                        onClick={() => setEditInput(false)}
                      >
                        Save
                      </div>
                    </div>
                  ) : (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )}
                </div>
                <div className="inputGrid grid3">
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Business name
                    </label>
                    {editInput === true ? (
                      <input
                        type="text"
                        className="input"
                        placeholder="Garden Grove Café & Bistro"
                      />
                    ) : (
                      <div className="">Garden Grove Café & Bistro</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Business category
                    </label>
                    {editInput === true ? (
                      <input
                        type="text"
                        className="input"
                        placeholder="Restaurant"
                      />
                    ) : (
                      <div className="">Restaurant</div>
                    )}
                  </div>
                  <div className="twoSpace">
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Description
                    </label>
                    {editInput === true ? (
                      <input
                        type="text"
                        className="input"
                        placeholder="Whether you're joining us for a casual lunch, a special dinner, or a weekend brunch, our elegant yet relaxed atmosphere is perfect for any occasion."
                      />
                    ) : (
                      <div className="">
                        Whether you're joining us for a casual lunch, a special
                        dinner, or a weekend brunch, our elegant yet relaxed
                        atmosphere is perfect for any occasion.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab3 === "2" ? (
          <>
            <div className="tabPadding">
              <div className="d-flex align-center gap-20 mb-30">
                <img src={backButton} alt="" />
                <div>
                  <div className="fs-24 fw-600 mb-4">Dine Savvy Account</div>
                  <Breadcrumb
                    separator={<img src={breadCrumbIcon} />}
                    items={[
                      {
                        title: "Merchants",
                      },
                      {
                        title: "Dine Savvy Account",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="card">
                <div className="img54 mb-16">
                  <img src={cafeIcon} alt="" className="w-100 h-100" />
                </div>
                <div className="fs-22 fw-600">Garden Grove Café & Bistro</div>
                <div className="divider2"></div>
                <div className="d-flex justify-between align-center gap-10 fw-500 mb-16">
                  <div className="grey">Member Since</div>
                  <div>September 19th, 2024</div>
                </div>
                <div className="d-flex justify-between align-center gap-10 fw-500 mb-16">
                  <div className="grey">Restaurant owner</div>
                  <div>Cameron Williamson</div>
                </div>
                <div className="d-flex justify-between align-center gap-10 fw-500 ">
                  <div className="grey">Nudge credits</div>
                  <div>120 Remaining</div>
                </div>
                <div className="divider2"></div>
                <div className="fw-600 mb-10">Payment history</div>
                <div className="overflow">
                  <table className="w-100 fs-14">
                    <thead>
                      <th>
                        <td style={{ width: "500px" }}>Date</td>
                        <td style={{ width: "500px" }}>Amount</td>
                        <td style={{ minWidth: "100px" }}>sdds</td>
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Oct 10, 2024</td>
                        <td>$200</td>
                        <td>
                          <div className="downloadIcon cursor-pointer"><img src={downloadIcon} alt="" /></div>
                        </td>
                      </tr>
                      <tr>
                        <td>Sep 15, 2024</td>
                        <td>$150</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Aug 05, 2024</td>
                        <td>$100</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : activeTab3 === "3" ? (
          <>jdfhgkfdhg</>
        ) : activeTab3 === "4" ? (
          <>lksjhkfdf</>
        ) : null}
      </div>
    </>
  );
};

export default MerchantDetails;
