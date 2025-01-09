import React, { useEffect } from "react";
import { Breadcrumb } from "antd";
import breadCrumbIcon from "../../../assets/images/breadCrumb.svg";
import backButton from "../../../assets/images/backButton.svg";
import dish from "../../../assets/images/dish.png";
import { useDispatch, useSelector } from "react-redux";
import { followerDetailsHandler } from "../../../redux/action/followersDetails";
import { useLocation } from "react-router-dom";
import Loader from "../../../common/Loader/Loader";

const FollowerDetail = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const followerDetailsSelector = useSelector(
    (state) => state?.followerDetails
  );

  console.log(followerDetailsSelector,"followerDetailsSelector")

  useEffect(() => {
    let payload = {
      followerId: state?._id,
    };
    dispatch(followerDetailsHandler(payload));
  }, []);

  return (
    <>
    {followerDetailsSelector?.isLoading ? <Loader />:(
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex align-center gap-20 mb-30 w-100">
            <img src={backButton} alt="backButton" className="cursor-pointer" />
            <div>
              <div className="fs-24 fw-600 mb-4">Follower Details</div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Consumers",
                  },
                  {
                    title: "Consumers Details",
                  },
                ]}
              />
            </div>
          </div>
          <div className="inputGrid ">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                ID
              </label>
              <div className="fs-20">#256501</div>
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Name
              </label>
              <div className="fs-20">{followerDetailsSelector?.data?.data?.userInfo?.displayName}</div>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Contact info</div>
          <div className="inputGrid ">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Email
              </label>
              <div className="fs-20">manhhachkt08@gmail.com</div>
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Phone Number
              </label>
              <div className="fs-20">{followerDetailsSelector?.data?.data?.userInfo?.phoneNumber}</div>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Connections</div>
          <div className="inputGrid ">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Friends
              </label>
              <div className="fs-20">8,560</div>
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Following
              </label>
              <div className="fs-20">{followerDetailsSelector?.data?.data?.totalFollowingCount}</div>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 mb-20">Nudges Info</div>
          <div className="grid5">
            <div className="card activeNudge">
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                received
              </div>
              <div className="fs-22 fw-500">{followerDetailsSelector?.data?.data?.nudge?.totalNudge}</div>
            </div>
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                Redeemed
              </div>
              <div className="fs-22 fw-500">20/10%</div>
            </div>
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                accepted
              </div>
              <div className="fs-22 fw-500">100/50%</div>
            </div>
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">
                Nudges <br />
                declined
              </div>
              <div className="fs-22 fw-500">100/50%</div>
            </div>
            <div className="card">
              <div className="grey mb-10 fs-16 fw-500">
                Nudges with <br />
                no action
              </div>
              <div className="fs-22 fw-500">0</div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-20 fw-700 mb-20">Nudges Received</div>
          <div className="grid2 gap-20">
            <div className="card16 d-flex align-center gap-16">
              <div className="image80">
                <img src={dish} alt="dish" />
              </div>
              <div>
                <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                <div className="fs-16 fw-500">
                  Unlock a 20% discount on our signature dishes this week.
                </div>
              </div>
            </div>
            <div className="card16 d-flex align-center gap-16">
              <div className="image80">
                <img src={dish} alt="dish" />
              </div>
              <div>
                <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                <div className="fs-16 fw-500">
                  Unlock a 20% discount on our signature dishes this week.
                </div>
              </div>
            </div>
            <div className="card16 d-flex align-center gap-16">
              <div className="image80">
                <img src={dish} alt="dish" />
              </div>
              <div>
                <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                <div className="fs-16 fw-500">
                  Unlock a 20% discount on our signature dishes this week.
                </div>
              </div>
            </div>
            <div className="card16 d-flex align-center gap-16">
              <div className="image80">
                <img src={dish} alt="dish" />
              </div>
              <div>
                <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                <div className="fs-16 fw-500">
                  Unlock a 20% discount on our signature dishes this week.
                </div>
              </div>
            </div>
            <div className="card16 d-flex align-center gap-16">
              <div className="image80">
                <img src={dish} alt="dish" />
              </div>
              <div>
                <div className="fs-16 fw-500 grey mb-5">Taste the Magic</div>
                <div className="fs-16 fw-500">
                  Unlock a 20% discount on our signature dishes this week.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 ">Preferences</div>
          <div className="divider2"></div>
          <div className="mb-20">
            <div className="mb-10 fw-500 fs-16">Standard Preferences</div>
            <div className="preferenceFlex ">
              <div>Italian</div>
              <div>Mexican</div>
              <div>Gluten-free</div>
              <div>Vegan</div>
            </div>
          </div>
          <div>
            <div className="mb-10 fw-500 fs-16">Personal Preferences</div>
            <div className="preferenceFlex ">
              {/* <div>Margherita Pizza</div>
              <div>Spicy Ramen</div>
              <div>Spaghetti Carbonara</div>
              <div>Chocolate Lava Cake</div> */}
              {followerDetailsSelector?.data?.data?.customerPreferenceData?.personalPreference?.map((item,index)=>{
                return (
                  <div>{item}</div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="tabPadding mb-30">
          <div className="fs-20 fw-700 ">Activity</div>
          <div className="divider2"></div>
          <div className="inputGrid ">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                App last used
              </label>
              <div className="fs-20">Sep 9, 2024</div>
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Recent Interactions
              </label>
              <div className="fs-20">Joe's Pizza - Nov 15, 2024</div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default FollowerDetail;
