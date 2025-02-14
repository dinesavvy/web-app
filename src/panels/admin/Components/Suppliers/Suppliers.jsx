import React, { useEffect, useState } from "react";
import addBtn from "../../../../assets/images/addBtn.svg";
import searchIcon from "../../../../assets/images/searchIcon.svg";
import emailCard from "../../../../assets/images/emailCard.svg";
import phoneCard from "../../../../assets/images/phoneCard.svg";
import inveCard from "../../../../assets/images/inveCard.svg";
import userCard from "../../../../assets/images/userCard.svg";
import noImageFound from "../../../../assets/images/noImageFound.png";
import { Pagination } from "antd";
import SupplierDetails from "./SupplierDetails";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../common/Loader/Loader";
import { getSuppliersHandler } from "../../../../redux/action/getSuppliersSlice";

const Suppliers = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });

  const dispatch = useDispatch();
  const getSuppliersListSelector = useSelector(
    (state) => state?.getSupplierList
  );

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

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

  const toggleDetails = () => {
    setIsDetailsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    let payload = {
      page: pagination?.page,
      limit: pagination?.limit,
    };
    dispatch(getSuppliersHandler(payload));
  }, [pagination]);

  return (
    <>
      {getSuppliersListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-24 fw-600">Suppliers</div>
            <div
              className="btn gap-8 addBtn"
              onClick={() => setIsDetailsOpen(true)}
            >
              Add Suppliers
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <div className="lineSearch w-100 mb-20">
            <input
              type="text"
              placeholder="Search Suppliers"
              autoComplete="off"
            />
            <img src={searchIcon} alt="" className="absoluteImage" />
          </div>
          <div className="merchantGrid">
            {getSuppliersListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {getSuppliersListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div
                        key={index}
                        className="merchantCard position-relative"
                      >
                        <div className="topPadding">
                          <div className="merchantImage">
                            <img
                              src={item?.logoUrl || noImageFound}
                              alt="No Image"
                            />
                          </div>
                          <div className="fs-16 fw-700 mb-10">
                            {/* Garden Grove Café & Bistro */}
                            {item?.supplierName}
                          </div>
                        </div>
                        <div className="divider2 m-0"></div>
                        <div className="bottomPadding">
                          <div className="d-flex flexColumn gap-10">
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={userCard} alt="User" />
                              {item?.contactName}
                            </div>
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={inveCard} alt="Inventory" />
                              {/* 217 555-0113 */}
                              {item?.contactPosition}
                            </div>
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={emailCard} alt="Email" />
                              {item?.contactEmail}
                            </div>
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={phoneCard} alt="Phone" />
                              {item?.contactPhoneNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <div>No data found</div>
            )}
          </div>

          <div className="divider2"></div>
          {getSuppliersListSelector?.data?.data?.records?.length > 0 && (
            <div className="d-flex align-center justify-between flexPagination">
              <div className="fs-16">
                {(() => {
                  const start = (pagination.page - 1) * pagination.limit + 1;
                  const end = Math.min(
                    start +
                      getSuppliersListSelector?.data?.data?.records?.length -
                      1,
                    getSuppliersListSelector?.data?.data?.recordsCount
                  );
                  return `Showing ${start} to ${end} of ${getSuppliersListSelector?.data?.data?.recordsCount} Suppliers`;
                })()}
              </div>
              <Pagination
                current={pagination?.page}
                pageSize={pagination?.limit}
                total={getSuppliersListSelector?.data?.data?.recordsCount}
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </div>
      <SupplierDetails isOpen={isDetailsOpen} toggleDetails={toggleDetails} />
    </>
  );
};

export default Suppliers;
