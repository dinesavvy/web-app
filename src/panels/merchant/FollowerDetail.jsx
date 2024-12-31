import { Breadcrumb } from "antd";
import React from "react";
import breadCrumbIcon from "../../assets/images/breadCrumb.svg";

const FollowerDetail = () => {
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center gap-20 mb-30 w-100">
            <img src={backButton} alt="" />
            <div>
              <div className="fs-24 fw-600 mb-4">Follower Details</div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Followers",
                  },
                  {
                    title: "Follower Details",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowerDetail;
