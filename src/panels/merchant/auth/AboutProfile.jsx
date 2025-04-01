import React from "react";

const AboutProfile = ({ getProfileDetailsSelector }) => {
  return (
    <>
      <div className="inputGrid gap-20 mb-20">
        <div>
          <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
            Type Of Business
          </label>
          <input
            type="text"
            className="input"
            placeholder="Restaurant"
            defaultValue={"Restaurant"}
          />
        </div>
        <div className="twoSpace position-relative">
          <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
            Description
          </label>
          <textarea
            name=""
            id=""
            row="5"
            placeholder="Whether you're joining us for a casual lunch, a special dinner, or a weekend brunch, our elegant yet relaxed atmosphere is perfect for any occasion."
            defaultValue={getProfileDetailsSelector?.data?.data?.description}
          ></textarea>
          <div className="fs-12 textWord">110/750</div>
        </div>
      </div>
      <div className="fs-18 fw-600 mb-20">Contact Info</div>
      <div className="inputGrid gap-20">
        <div>
          <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
            Website Link
          </label>
          <input
            type="text"
            className="input"
            placeholder="www.dinesavvy.com"
            defaultValue={getProfileDetailsSelector?.data?.data?.websiteUrl}
          />
        </div>
        <div>
          <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
            Phone Number
          </label>
          <input
            type="text"
            className="input"
            placeholder="+1 256 25695s"
            defaultValue={getProfileDetailsSelector?.data?.data?.phoneNumber}
          />
        </div>
      </div>
    </>
  );
};

export default AboutProfile;
