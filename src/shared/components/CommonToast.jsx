import React from "react";
import deleteList from "../../assets/images/deleteList.svg";

const CommonToast = ({image,text}) => {
  return (
    <>
      <div className="floatAdd">
        <div className="btn fs-16">
          <img src={image} alt="image" />
          <div>{text}</div>
        </div>
        <div className="h-24 cursor-pointer">
          <img src={deleteList} className="w-100 h-100" alt="" />
        </div>
      </div>
    </>
  );
};

export default CommonToast;
