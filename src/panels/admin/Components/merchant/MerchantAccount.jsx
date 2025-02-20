import React from "react";
import breadCrumbIcon from "../../../../assets/images/breadCrumb.svg";
import olive from "../../../../assets/images/olive.png";
import backButton from "../../../../assets/images/backButton.svg";
import { Breadcrumb } from "antd";
import moment from "moment";

const MerchantAccount = ({ state,merchantDetailsSelector  }) => {
  return (
    <>
      <div className="tabPadding">
        <div className="d-flex align-center gap-20 mb-30 w-100">
          <img src={backButton} alt="" className="cursor-pointer backButton" />
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
            <img src={olive} alt="" className="h-100" />
          </div>
          <div className="fs-22 fw-600">
            {merchantDetailsSelector?.data?.data?.businessName}
          </div>
          <div className="divider2"></div>
          <div className="d-flex justify-between align-center gap-10 fw-500 mb-16 flexsm fs-18">
            <div className="grey">Member Since</div>
            <div>{moment(state?.createdAt).format("MMM D, YYYY")}</div>
          </div>
          <div className="d-flex justify-between align-center gap-10 fw-500 mb-16 flexsm fs-18">
            <div className="grey">Restaurant owner</div>
            <div>
              {merchantDetailsSelector.data.data.ownerDetails?.displayName ||
                "N/A"}
            </div>
          </div>
          <div className="d-flex justify-between align-center gap-10 fw-500 flexsm fs-18">
            <div className="grey">Nudge credits</div>
            <div>{state?.nudge?.nudgeCredit} Remaining</div>
          </div>
          {/* <div className="divider2"></div>
                <div className="fw-600 mb-10">Payment history</div>
                <div className="overflow">
                  <table className="w-100 fs-14 text-center stripped">
                    <thead>
                      <tr>
                        <th style={{ minWidth: "150px", width: "50%" }}>
                          Date
                        </th>
                        <th style={{ minWidth: "150px", width: "50%" }}>
                          Amount
                        </th>
                        <th style={{ minWidth: "100px", width: "20%" }}>
                          sdds
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Oct 10, 2024</td>
                        <td>$200</td>
                        <td>
                          <div className="downloadIcon cursor-pointer">
                            <img src={downloadIcon} alt="" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Sep 15, 2024</td>
                        <td>$150</td>
                        <td>
                          <div className="downloadIcon cursor-pointer">
                            <img src={downloadIcon} alt="" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Aug 05, 2024</td>
                        <td>$100</td>
                        <td>
                          <div className="downloadIcon cursor-pointer">
                            <img src={downloadIcon} alt="" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
        </div>
      </div>
    </>
  );
};

export default MerchantAccount;
