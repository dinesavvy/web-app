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
import SearchSelect from "../SearchSelect";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import CommonPagination from "../../../../common/pagination/CommonPagination";

const Distributors = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [distributorItems, setDistributorItems] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchArea, setSearchArea] = useState([]);
  const [removeDistributor, setRemoveDistributor] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
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

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page,pagination?.limit]);

  const getDistributorListSelector = useSelector(
    (state) => state?.distributorsList
  );

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 })); 
  };

  const handleSearchAreaChange = (selectedAreas) => {
    setSearchArea(selectedAreas);
  };

  useEffect(() => {
    if (isDetailsOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
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
      searchString,
    };
    dispatch(distributorsListHandler(payload));
  }, [
    pagination,
    createDistributorSelector,
    updateDistributorSelector,
    removeDistributorSelector,
    searchString,
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
              onClick={() => {setIsDetailsOpen(true);setDistributorItems(null)}}
            >
              Add Distributors
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <div className="lineSearch w-100 mb-20">
            <SearchSelect
              onSearchChange={handleSearchChange}
              onSearchAreaChange={handleSearchAreaChange}
            />
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
                            <div className="fs-16 fw-700 mb-10 singleLine">
                              {item?.distributorName
                                ? item?.distributorName
                                    .charAt(0)
                                    .toUpperCase() +
                                  item?.distributorName.slice(1)
                                : ""}
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
                                <img src={userCard} alt="" className="h30" />
                                {item?.contactName
                                  ? item?.contactName.charAt(0).toUpperCase() +
                                    item?.contactName.slice(1)
                                  : ""}
                              </div>
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={inveCard} alt="" className="h30" />
                                {item?.contactPosition
                                  ? item?.contactPosition
                                      .charAt(0)
                                      .toUpperCase() +
                                    item?.contactPosition.slice(1)
                                  : ""}
                              </div>
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={emailCard} alt="" className="h30" />
                                {item?.contactEmail}
                              </div>
                              <div className="d-flex align-center gap-12 fs-14">
                                <img src={phoneCard} alt="" className="h30" />
                               +{item?.contactPhoneNumber}
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
              <div className="noDataFound">No data found</div>
            )}
          </div>
          <div className="divider2"></div>
          {getDistributorListSelector?.data?.data?.records?.length > 0 && (
                <CommonPagination
                  currentPage={pagination?.page}
                  pageSize={pagination?.limit}
                  totalCount={getDistributorListSelector?.data?.data?.recordsCount}
                  currentCount={
                    getDistributorListSelector?.data?.data?.records?.length
                  }
                  onPageChange={handlePaginationChange}
                  label="Distributors"
                />
              )}
        </div>
      </div>
      {isDetailsOpen && (
        <DistributorDetails
          isOpen={isDetailsOpen}
          toggleDetails={toggleDetails}
          setIsDetailsOpen={setIsDetailsOpen}
          distributorItems={distributorItems}
          setDistributorItems={setDistributorItems}
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
