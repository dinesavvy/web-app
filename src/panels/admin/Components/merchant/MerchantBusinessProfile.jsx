import React, { useState } from "react";
import backButton from "../../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../../assets/images/breadCrumb.svg";
import addTime from "../../../../assets/images/addTime.svg";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

const MerchantBusinessProfile = ({ merchantDetailsSelector }) => {
  const [editInput, setEditInput] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="tabPadding mb-30">
        <div className="d-flex align-center gap-20 mb-30 w-100">
          <img
            src={backButton}
            alt=""
            className="cursor-pointer backButton"
            onClick={() => navigate("/admin/merchant/list")}
          />
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
            {/* {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )} */}
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
                <div className="">
                  {merchantDetailsSelector?.data?.data?.businessName}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Business category
              </label>
              {editInput === true ? (
                <input type="text" className="input" placeholder="Restaurant" />
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
                  {merchantDetailsSelector?.data?.data?.description || "N/A"}
                </div>
              )}
            </div>
          </div>
          {editInput && (
            <div className="d-flex gap-20 mt-20 justify-end flexBtn">
              <div
                className="btnSecondary saveBtn btn"
                onClick={() => setEditInput(false)}
              >
                Cancel
              </div>
              <div className="saveBtn btn" onClick={() => setEditInput(false)}>
                Save
              </div>
            </div>
          )}
        </div>
        <div className="card mb-30">
          <div className="d-flex align-center justify-between gap-20 mb-20">
            <div className="fs-20 fw-700">Primary Contact information</div>
            {/* {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )} */}
          </div>
          <div className="inputGrid grid3">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Phone number
              </label>
              {editInput === true ? (
                <input
                  type="number"
                  className="input"
                  placeholder="+91 123 456 7890"
                />
              ) : (
                <a className="anchor" href="tel:+911234567890">
                  +{merchantDetailsSelector?.data?.data?.phoneNumber}
                </a>
              )}
            </div>

            <div>
              {/* {editInput === true ? (
                        <input
                          type="email"
                          className="input"
                          placeholder="Email"
                        />
                        ) : ( */}
              {merchantDetailsSelector?.data?.data?.owenerDetails?.email && (
                <>
                  <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                    Email
                  </label>
                  <a
                    className="anchor"
                    href={
                      merchantDetailsSelector?.data?.data?.owenerDetails?.email
                        ? `mailto:${merchantDetailsSelector.data.data.owenerDetails.email}`
                        : "#"
                    }
                  >
                    {merchantDetailsSelector?.data?.data?.owenerDetails?.email}
                  </a>
                </>
              )}
              {/* )} */}
            </div>
            <div className="">
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Website link
              </label>
              {editInput === true ? (
                <input
                  type="text"
                  className="input"
                  placeholder="www.dinesavvy.com"
                />
              ) : (
                <a className="anchor" href="www.dinesavvy.com">
                  {merchantDetailsSelector?.data?.data?.websiteUrl}
                </a>
              )}
            </div>
          </div>
          {editInput && (
            <div className="d-flex gap-20 mt-20 justify-end flexBtn">
              <div
                className="btnSecondary saveBtn btn"
                onClick={() => setEditInput(false)}
              >
                Cancel
              </div>
              <div className="saveBtn btn" onClick={() => setEditInput(false)}>
                Save
              </div>
            </div>
          )}
        </div>
        <div className="card mb-30">
          <div className="d-flex align-center justify-between gap-20 mb-20">
            <div className="fs-20 fw-700">Location and areas</div>
            {/* {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )} */}
          </div>
          <div>
            {editInput === true ? (
              <>
                <div className="inputGrid grid3 mb-30">
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Country/Region
                    </label>
                    <CustomSelect
                      options={["Option 1", "Option 2", "Option 3"]}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      City
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Garden Grove Café & Bistro"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      State
                    </label>
                    <CustomSelect
                      options={["Option 1", "Option 2", "Option 3"]}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Street address
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="4517 Street Ave. Manchester"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Street address line 2 (optional)
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="4517 Street Ave. Manchester"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                      Postal Code
                    </label>
                    <input type="text" className="input" placeholder="39495" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                  Business location
                </label>
                <div className="mb-20">
                  {[
                    merchantDetailsSelector?.data?.data?.address?.addressLine1,
                    merchantDetailsSelector?.data?.data?.address?.addressLine2,
                    merchantDetailsSelector?.data?.data?.address?.country,
                    merchantDetailsSelector?.data?.data?.address?.locality,
                    merchantDetailsSelector?.data?.data?.address?.postalCode,
                  ]
                    .filter(Boolean) // Filters out null, undefined, or empty values
                    .join(", ")}
                </div>
              </>
            )}
          </div>
          {editInput && (
            <div className="d-flex gap-20 mt-20 justify-end flexBtn">
              <div
                className="btnSecondary saveBtn btn"
                onClick={() => setEditInput(false)}
              >
                Cancel
              </div>
              <div className="saveBtn btn" onClick={() => setEditInput(false)}>
                Save
              </div>
            </div>
          )}
        </div>
        <div className="card">
          <div className="d-flex align-center justify-between gap-20 mb-20 flexmd">
            <div className="fs-20 fw-700">Hours of operation</div>
            {/* {!editInput && (
                    <div
                      className="editBtn cursor-pointer"
                      onClick={() => setEditInput(true)}
                    >
                      <img src={editBtn} alt="" />
                    </div>
                  )} */}
          </div>
          {!editInput && (
            <div>
              {/* <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Sunday</div>
                      <div>Closed</div>
                    </div> */}
              {/* <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Monday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Tuesday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Wednesday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Thurday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Friday</div>
                      <div>9:00 AM To 11:30</div>
                    </div>
                    <div className="divider2"></div>
                    <div className="d-flex align-center justify-between">
                      <div className="grey fs-16">Saturday</div>
                      <div>9:00 AM To 11:30</div>
                    </div> */}
              {merchantDetailsSelector?.data?.data?.businessHours?.periods?.map(
                (item, index) => {
                  return (
                    <>
                      <div className="divider2"></div>
                      <div
                        className="d-flex align-center justify-between"
                        key={index}
                      >
                        <div className="grey fs-16">{item?.dayOfWeek}</div>
                        <div>
                          {item?.startLocalTime + " to " + item?.endLocalTime}
                        </div>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          )}
          {editInput && (
            <>
              <div className="overflow">
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="divider2"></div>
                <div className="minw">
                  <div className="d-flex align-center justify-between">
                    <div className="grey fs-16">Sunday</div>
                    <div className="d-flex align-center gap-16">
                      <CustomSwitch
                        isOn={switchState}
                        onToggle={handleToggle}
                      />
                      <div>Closed</div>
                    </div>
                  </div>
                  {switchState && (
                    <div className="mt-10 d-flex align-end gap-10">
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          From
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="w-100">
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          to
                        </label>
                        <TimePicker className="customTime input" />
                      </div>
                      <div className="addTime">
                        <img src={addTime} alt="" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {editInput && (
            <div className="d-flex gap-20 mt-20 justify-end flexBtn">
              <div
                className="btnSecondary saveBtn btn"
                onClick={() => setEditInput(false)}
              >
                Cancel
              </div>
              <div className="saveBtn btn" onClick={() => setEditInput(false)}>
                Save
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MerchantBusinessProfile;
