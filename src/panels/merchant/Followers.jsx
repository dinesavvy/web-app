import { useEffect, useState } from "react";
import emailCard from "../../assets/images/emailCard.svg";
import phoneCard from "../../assets/images/phoneCard.svg";
import archiveImage from "../../assets/images/archive.svg";
import rearchive from "../../assets/images/rearchive.svg";
import { Pagination } from "antd";
import CommonToast from "../../shared/components/commonToast";
import { useDispatch, useSelector } from "react-redux";
import { followersListHandler } from "../../redux/action/followersList";
import SearchSelect from "../../shared/components/SearchSelect";
import Loader from "../../shared/components/Loader/Loader";

const Followers = () => {
  const [archive, setArchive] = useState(false);
  const [arr, setArr] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchString, setSearchString] = useState("");
  const [searchArea, setSearchArea] = useState([]);

  const followerListSelector = useSelector((state) => state?.followeList);
  console.log(followerListSelector, "followerListSelector");

  const dispatch = useDispatch();

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page on search
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
  };

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        // locationId: state?._id,
        page: pagination.page,
        limit: pagination.limit,
        searchString,
        searchArea,
      };
      dispatch(followersListHandler(payload));
    };

    fetchMerchants();
  }, [pagination, searchString, searchArea]);

  return (
    <>
      {/*********************** Empty Content ************************/}
      {/* <div className="emptyHeight">
        <div className="modal-content">
          <div className="ant-modal-body">
            <div className="modalbg">
              <img src={modalbg} alt="" />
            </div>
            <div className="modalImage mb-30">
              <img src={follow} alt="" />
            </div>
            <div className="text-center mb-30">
              <div className="fs-26 fw-700 mb-15">Build Your Following</div>
              <div className="fs-18">
              Share your restaurant profile with customers to keep them updated about your latest deals and promotions.
              </div>
            </div>
            <div className="div d-flex align-center gap-16">
              <div className="btn w-100 gap-8">Share Restaurant Profile <img src={btnArrow} alt="" /></div>
            </div>
          </div>
        </div>
      </div> */}
      {followerListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20">
            <div className="fs-24 fw-600">Followers</div>
            <div
              className="btnSecondary btn  secondarysecond"
              onClick={() => setArchive(!archive)}
            >
              {archive ? "Back to list" : "Show archive"}
            </div>
          </div>
          <div className="mb-20">
            <div className="lineSearch w-100">
              {/* <input
                type="text"
                name="text"
                placeholder="Search for Consumer by Name"
                id="text"
              />
              <img src={searchIcon} alt="" className="absoluteImage" /> */}
              <SearchSelect
                onSearchChange={handleSearchChange}
                onSearchAreaChange={handleSearchAreaChange}
              />
            </div>
          </div>
          {archive ? (
            <div className="merchantGrid mb-30">
              <div className="cardFollow">
                <div className="d-flex justify-between gap-12">
                  <div className="d-flex align-center gap-12">
                    <div className="initialName">dr</div>
                    <div>
                      <div className="fw-700">Jane Cooper</div>
                      <div className="fs-14 fw-300 o5">#256501</div>
                    </div>
                  </div>
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        onClick={() =>
                          setArr((prevState) => [...prevState, "1"])
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex align-center gap-12 mb-10">
                  <img src={emailCard} alt="" />
                  <div className="fs-14">binhan628@gmail.com</div>
                </div>
                <div className="d-flex align-center gap-12">
                  <img src={phoneCard} alt="" />
                  <div className="fs-14">316-555-0116</div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex gap-10 mt-20 justify-end flexBtn">
                  <div className="btnSecondary w-100 btn">Add to List</div>
                  <div className="btnSecondary w-100 btn">View Details</div>
                </div>
              </div>
              <div className="cardFollow">
                <div className="d-flex justify-between gap-12">
                  <div className="d-flex align-center gap-12">
                    <div className="initialName">dr</div>
                    <div>
                      <div className="fw-700">Jane Cooper</div>
                      <div className="fs-14 fw-300 o5">#256501</div>
                    </div>
                  </div>
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        onClick={() =>
                          setArr((prevState) => [...prevState, "2"])
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex align-center gap-12 mb-10">
                  <img src={emailCard} alt="" />
                  <div className="fs-14">binhan628@gmail.com</div>
                </div>
                <div className="d-flex align-center gap-12">
                  <img src={phoneCard} alt="" />
                  <div className="fs-14">316-555-0116</div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex gap-10 mt-20 justify-end flexBtn">
                  <div className="btnSecondary w-100 btn">Add to List</div>
                  <div className="btnSecondary w-100 btn">View Details</div>
                </div>
              </div>
              <div className="cardFollow">
                <div className="d-flex justify-between gap-12">
                  <div className="d-flex align-center gap-12">
                    <div className="initialName">dr</div>
                    <div>
                      <div className="fw-700">Jane Cooper</div>
                      <div className="fs-14 fw-300 o5">#256501</div>
                    </div>
                  </div>
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex align-center gap-12 mb-10">
                  <img src={emailCard} alt="" />
                  <div className="fs-14">binhan628@gmail.com</div>
                </div>
                <div className="d-flex align-center gap-12">
                  <img src={phoneCard} alt="" />
                  <div className="fs-14">316-555-0116</div>
                </div>
                <div className="divider2"></div>
                <div className="d-flex gap-10 mt-20 justify-end flexBtn">
                  <div className="btnSecondary w-100 btn">Add to List</div>
                  <div className="btnSecondary w-100 btn">View Details</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="merchantGrid mb-30">
              {console.log(followerListSelector, "followerListSelector")}
              {followerListSelector?.data?.data?.records?.map((item, index) => {
                return (
                  <>
                    <div className="cardFollow" key={index}>
                      <div className="d-flex justify-between gap-12">
                        <div className="d-flex align-center gap-12">
                          <div className="initialName">
                            {item?.userInfo?.displayName.charAt(0) +
                              item?.userInfo?.displayName.charAt(1)}
                          </div>
                          <div>
                            <div className="fw-700">
                              {item?.userInfo?.displayName}
                            </div>
                            <div className="fs-14 fw-300 o5">#256501</div>
                          </div>
                        </div>
                        <div className="custom-checkbox">
                          <label className="checkLabel">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex align-center gap-12 mb-10">
                        <img src={emailCard} alt="" />
                        <div className="fs-14">binhan628@gmail.com</div>
                      </div>
                      <div className="d-flex align-center gap-12">
                        <img src={phoneCard} alt="" />
                        <div className="fs-14">
                          {item?.userInfo?.phoneNumber}
                        </div>
                      </div>
                      <div className="divider2"></div>
                      <div className="d-flex gap-10 mt-20 justify-end flexBtn">
                        <div className="btnSecondary w-100 btn">Archive</div>
                        <div className="btnSecondary w-100 btn">
                          View Details
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">
              Showing {pagination.page} to {pagination.limit} of {followerListSelector?.data?.data?.recordsCount} Restaurants
            </div>
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={followerListSelector?.data?.data?.recordsCount}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
      {arr?.length ? (
        <CommonToast
          image={archive ? rearchive : archiveImage}
          text={archive ? "Remove from Archive" : "Add to Archive"}
        />
      ) : null}
    </>
  );
};

export default Followers;
