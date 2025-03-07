import React, { useEffect, useState } from "react";
import addBtn from "../../../../assets/images/addBtn.svg";
import searchIcon from "../../../../assets/images/searchIcon.svg";
import emailCard from "../../../../assets/images/emailCard.svg";
import phoneCard from "../../../../assets/images/phoneCard.svg";
import inveCard from "../../../../assets/images/inveCard.svg";
import userCard from "../../../../assets/images/userCard.svg";
import noImageFound from "../../../../assets/images/noImageFound.png";
import { Pagination } from "antd";
import DistributorDetails from "./DistributorDetails";
import Loader from "../../../../common/Loader/Loader";
import { getSuppliersHandler } from "../../../../redux/action/getSuppliersSlice";
import { useDispatch, useSelector } from "react-redux";
import { distributorsListHandler } from "../../../../redux/action/distributorsList";
import CommonModal from "../CommonModal";
import editMember from "../../../../assets/images/editMember.svg";
import deleteMember from "../../../../assets/images/deleteMember.svg";
import deleteModal from "../../../../assets/images/deleteModal.svg";

const Distributors = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [distributorItems, setDistributorItems] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [removeDistributor, setRemoveDistributor] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const createDistributorSelector = useSelector(
    (state) => state?.createDistributor
  );

  const updateDistributorSelector = useSelector(
    (state) => state?.updateDistributor
  );
  const removeDistributorSelector = useSelector(
    (state) => state?.removeDistributor
  );

  const dispatch = useDispatch();

  const getDistributorListSelector = useSelector(
    (state) => state?.distributorsList
  );

  useEffect(() => {
    if (isDetailsOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isDetailsOpen]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  const toggleDetails = () => {
    setIsDetailsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    let payload = {
      page: pagination?.page,
      limit: pagination?.limit,
    };
    dispatch(distributorsListHandler(payload));
  }, [
    pagination,
    createDistributorSelector,
    updateDistributorSelector,
    removeDistributorSelector,
  ]);

  return (
    <>
      {getDistributorListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-24 fw-600">Distributors</div>
            <div
              className="btn gap-8 addBtn"
              onClick={() => setIsDetailsOpen(true)}
            >
              Add Distributors
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              placeholder="Search Distributors"
              autoComplete="off"
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          <div className="merchantGrid ">
            {getDistributorListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {getDistributorListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <>
                        <div className="merchantCard position-relative">
                          <div className="topPadding" key={index}>
                            <div className="merchantImage">
                              <img src={item?.logoUrl || noImageFound} alt="" />
                            </div>
                            <div className="fs-16 fw-700 mb-10">
                              {/* Garden Grove Café & Bistro */}
                              {item?.distributorName}
                            </div>
                          </div>
                          {/* <div className="custom-checkbox merchantCardCheckbox">
                      <label className="checkLabel">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div> */}
                          <div className="divider2 m-0"></div>
                          <div className="bottomPadding">
                            <div className="d-flex flexColumn gap-10">
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={userCard} alt=""  className="h30"/>
                                {item?.contactName}
                              </div>
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={inveCard} alt=""  className="h30"/>
                                {/* 217 555-0113 */}
                                {item?.contactPhoneNumber}
                              </div>
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={emailCard} alt=""  className="h30"/>
                                {/* grothoff@icloud.com */}
                                {item?.contactEmail}
                              </div>
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={phoneCard} alt=""  className="h30"/>
                                {/* 217 555-0113 */}
                                {item?.contactPhoneNumber}
                              </div>
                              <div className="d-flex align-center gap-10">
                                <div
                                  className="btn btnSecondary w-100 gap-8"
                                  onClick={() => {
                                    setIsDetailsOpen(true);
                                    setDistributorItems(item);
                                  }}
                                >
                                  <img src={editMember} alt="" />
                                  Edit
                                </div>
                                <div
                                  className="deleteBtn btn"
                                  onClick={() => {
                                    setModal2Open(true);
                                    setRemoveDistributor(item);
                                  }}
                                >
                                  <img src={deleteMember} alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </>
            ) : (
              <div>No data found</div>
            )}
          </div>
          <div className="divider2"></div>

          {/* <div className="d-flex align-center justify-between flexPagination">
            <div className="fs-16">Showing 1 to 5 of 10 Distributors</div>
            <Pagination defaultCurrent={1} total={50} />
          </div> */}
          {getDistributorListSelector?.data?.data?.records?.length > 0 && (
            <div className="d-flex align-center justify-between flexPagination">
              <div className="fs-16">
                {(() => {
                  const start = (pagination.page - 1) * pagination.limit + 1;
                  const end = Math.min(
                    start +
                      getDistributorListSelector?.data?.data?.records?.length -
                      1,
                    getDistributorListSelector?.data?.data?.recordsCount
                  );
                  return `Showing ${start} to ${end} of ${getDistributorListSelector?.data?.data?.recordsCount} Suppliers`;
                })()}
              </div>
              <Pagination
                current={pagination?.page}
                pageSize={pagination?.limit}
                total={getDistributorListSelector?.data?.data?.recordsCount}
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </div>
      {isDetailsOpen && (
        <DistributorDetails
          isOpen={isDetailsOpen}
          toggleDetails={toggleDetails}
          setIsDetailsOpen={setIsDetailsOpen}
          distributorItems={distributorItems}
        />
      )}

      {modal2Open && (
        <CommonModal
          modal2Open={modal2Open}
          setModal2Open={setModal2Open}
          modalImage={deleteModal}
          removeDistributor={removeDistributor}
        />
      )}
    </>
  );
};

export default Distributors;
