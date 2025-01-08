import { Breadcrumb, DatePicker } from "antd";
import React, { useState } from "react";
import "./merchant.css";
import backButton from "../../assets/images/backButton.svg";
import breadCrumbIcon from "../../assets/images/breadCrumb.svg";
import CustomSelect from "../../shared/components/CustomSelect";

const EditMember = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center gap-20 mb-30 w-100">
            <img src={backButton} alt="backButton" className="cursor-pointer" />
            <div>
              <div className="fs-24 fw-600 mb-4">Edit Team Member Details</div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Team Members",
                  },
                  {
                    title: "Details",
                  },
                ]}
              />
            </div>
          </div>
          <div className="divider2 mb-30"></div>
          <div className="d-flex align-center gap-12 mb-30">
            <div className="initialName">dr</div>
            <div>
              <div className="fw-700">Dianne Russell</div>
              <div className="fs-14 fw-300 o5">June, 2024</div>
            </div>
          </div>
          <div className="inputGrid gap-20">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Name
              </label>
              <input type="text" className="input" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                Phone number
              </label>
              <input
                type="number"
                className="input"
                placeholder="(406) 555-0120 "
              />
            </div>
            <div>
              <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                Location
              </label>
              <CustomSelect options={["Option 1", "Option 2", "Option 3"]} />
            </div>
            <div>
              <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                Role
              </label>
              <CustomSelect options={["Option 1", "Option 2", "Option 3"]} />
            </div>
            <div>
              <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                Role
              </label>
              <div className="fixedDate input">9/20/2024</div>
            </div>
            <div>
              <label htmlFor="number" className="grey mb-10 fs-16 fw-500">
                Role
              </label>
              <div className="fixedDate input  position-relative">
                9/20/2024 <div className="resendBtn fs-14">Resend</div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-18 fw-600">Select Permissions</div>
          <div className="divider2"></div>
          <div className="grid4">
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Add Team members
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Edit Roles
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Edit Roles
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Analytics
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Edit Goals
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Edit Metrics
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                View Metrics
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                View Followers
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Add Followers
              </label>
            </div>
            <div className="custom-checkbox">
              <label className="checkLabel">
                <input type="checkbox" />
                <span class="checkmark"></span>
                Send Nudges
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex align-center justify-end gap-16">
        <div className="btn btnSecondary w-172">
        Discard
        </div>
        <div className="btn w-172">
        Save Changes
        </div>
        </div>
      </div>
    </>
  );
};

export default EditMember;
