import React from "react";
import dish2 from "../../../assets/images/dish2.png";
import PercentageFiller from "./PercentageFiller";
import nudgeImageSub from "../../../assets/images/nudgeImageSub.svg";
import nudgeCardImage from "../../../assets/images/nudgeCardImage.svg";
import moment from "moment";

const TopNudges = ({ topNudgesSelector }) => {
  const hoorayPercentage = (
    (topNudgesSelector?.data?.data?.totalNudgeAcceptedCount * 100) /
    topNudgesSelector?.data?.data?.totalNudgeSendToUser
  )?.toFixed(2);

  return (
    <>
      <div className="fs-20 fw-700 mb-10">Top Nudge</div>
      <div className="d-flex gap-20 ">
        {topNudgesSelector?.data?.data?.topNudge?.map((item, index) => {
          return (
            <div className="cardNudge w-100">
              <div className="image150 position-relative ">
                <img src={item?.image} alt="" className="w-100 h-100" />
                <img src={nudgeImageSub} className="nudgeImageSub" alt="" />
              </div>
              <img src={nudgeCardImage} className="nudgeCardImage" alt="" />
              <div className="nudgePadding w-100">
                <div className="fs-18 fw-700">{item?.title}</div>
                <div className="fs-14 mb-8">
                  {/* <span className="grey">Get </span>
              <span className="fw-700">10%</span> */}
                  <span className="grey"> {item?.description} </span>
                </div>
                <div className="d-flex gap-8 align-center mb-12">
                  <div className="position-relative d-flex">
                    {item?.acceptedFollowerList?.map((item) => {
                      return (
                        <div className="imageCollaps">
                          <img
                            src={item?.image}
                            alt=""
                            className="w-100 h-100"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="fs-14 fw-700 gc">
                    {item?.acceptedFollowerList?.length} people accepted
                  </div>
                </div>
                <div className="TagFull">
                  {moment(item?.deactivateAt).format(
                    "[Valid till] Do MMMM YYYY"
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-100 card bgGrey d-flex gap-20 align-center">
          <PercentageFiller percentage={Number(hoorayPercentage)} />
          <div>
            <div className="fs-24 fw-700 mb-8 gc">Hooray! 🎉</div>
            <div className="fs-16">
              <span className="gc fw-700">{hoorayPercentage}%</span> of people
              who got the nudge came in!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNudges;
