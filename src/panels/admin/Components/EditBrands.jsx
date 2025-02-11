import React from "react";
import { useNavigate } from "react-router-dom";
import backButton from "../../../assets/images/backButton.svg";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import coke from "../../../assets/images/coke.svg";
import deleteBrands from "../../../assets/images/deleteBrands.svg";
import addMerchantIcon from "../../../assets/images/addMerchantIcon.svg";
import { Breadcrumb } from "antd";
import CustomSelect from "./CustomSelect";

const EditBrands = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center gap-20 mb-20 w-100">
            <img
              src={backButton}
              alt="backButton"
              className="cursor-pointer"
              onClick={() => navigate("/admin/brands")}
            />
            <div>
              <div className="fs-24 fw-600 mb-4">Edit Brand</div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Brands",
                  },
                  {
                    title: "Edit Brand",
                  },
                ]}
              />
            </div>
          </div>
          <div className="divider2 m30"></div>
          <div className="d-flex align-end gap-16 mb-30 flexWrapsm">
            <div className="changeBrandImage">
              <img src={coke} alt="coke" />
            </div>
            <div className="btn w240">Change Photo</div>
          </div>
          <div className="inputGrid gap-20">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Brand Name
              </label>
              <input type="text" className="input" placeholder="Brand Name" />
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="inputGrid gap-20">
            <div className="d-flex gap-10">
              <div className="w-100 d-flex flexDirection h-100 justify-between">
                <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                  MSRP (Manufacturer’s Suggested Retail Price)
                </label>
                <input type="text" className="input" placeholder="$22.99" />
              </div>
            </div>
            <div className="w-160 d-flex flexDirection h-100 justify-between">
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Unit
              </label>
              <CustomSelect options={["Per case", "Per Pake"]} />
            </div>
            <div className="w-100 d-flex flexDirection h-100 justify-between">
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                SKUs
              </label>
              <input
                type="text"
                className="input"
                placeholder="PEPSI-24x12-005"
              />
            </div>
            <div className="">
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Description
              </label>
              <input
                type="text"
                className="input"
                placeholder="Red Bull - 8.4 oz energy drink (12-pack)"
              />
            </div>
          </div>
          <div className="divider2"></div>
          <div className="d-flex justify-end">
            <div className="d-flex align-center gap-8 red fs-16 fw-500 brandRed cursor-pointer">
            <img src={deleteBrands} alt="" />
            Remove SKUs
            </div>
          </div>
        </div>
        <div className="addSku d-flex align-center justify-center gap-12 fs-16 fw-500 ">
                <img src={addMerchantIcon} alt="" />Add Another SKUs
        </div>
        <div className="divider"></div>
        <div className="d-flex mb-30 align-center justify-end gap-16">
          <div className="btn btnSecondary w-172">Discard</div>
          <div className="btn  w-172">Save Changes</div>
        </div>
      </div>
    </>
  );
};

export default EditBrands;
