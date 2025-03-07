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
import editMember from "../../../../assets/images/editMember.svg";
import deleteMember from "../../../../assets/images/deleteMember.svg";
import CommonModal from "../CommonModal";
import deleteModal from "../../../../assets/images/deleteModal.svg";
import SearchSelect from "../SearchSelect";

const Suppliers = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [removeSupplier, setRemoveSupplier] = useState({});
  const removeSupplierSelector = useSelector((state) => state?.removeSupplier);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [searchArea, setSearchArea] = useState([]);

  const createSuplierSelector = useSelector((state) => state?.createSuplier);
  const updateSupplierSelector = useSelector((state) => state?.updateSupplier);
  const dispatch = useDispatch();
  const getSuppliersListSelector = useSelector(
    (state) => state?.getSupplierList
  );

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
      searchString,
    };
    dispatch(getSuppliersHandler(payload));
  }, [
    pagination,
    createSuplierSelector,
    removeSupplierSelector,
    updateSupplierSelector,
    searchString,
  ]);

  return (
    <>
      {getSuppliersListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-24 fw-600">Suppliers</div>
            <div
              className="btn gap-8 addBtn"
              onClick={() => {
                setIsDetailsOpen(true);
                setSelectedSupplier(null);
              }}
            >
              Add Suppliers
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <div className="lineSearch w-100 mb-20">
            {/* <input
              type="text"
              placeholder="Search Suppliers"
              autoComplete="off"
            /> */}
            {/* <img src={searchIcon} alt="" className="absoluteImage" /> */}
            <SearchSelect
                onSearchChange={handleSearchChange}
                onSearchAreaChange={handleSearchAreaChange}
              />
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
  {item?.supplierName
    ? item.supplierName.charAt(0).toUpperCase() + item.supplierName.slice(1)
    : ""}
</div>
                        </div>
                        <div className="divider2 m-0"></div>
                        <div className="bottomPadding">
                          <div className="d-flex flexColumn gap-10">
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={userCard} className="h30" alt="User" />
                              {item?.contactName}
                            </div>
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={inveCard} className="h30" alt="Inventory" />
                              {/* 217 555-0113 */}
                              {item?.contactPosition}
                            </div>
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={emailCard} className="h30" alt="Email" />
                              {item?.contactEmail}
                            </div>
                            <div className="d-flex align-center gap-12 fs-14">
                              <img src={phoneCard} className="h30" alt="Phone" />
                              {item?.contactPhoneNumber}
                            </div>
                            <div className="d-flex align-center gap-10">
                              <div
                                className="btn btnSecondary w-100 gap-8"
                                onClick={() => {
                                  setIsDetailsOpen(true);
                                  setSelectedSupplier(item);
                                }}
                              >
                                <img src={editMember} alt="" />
                                Edit
                              </div>
                              <div
                                className="deleteBtn btn"
                                onClick={() => {
                                  setModal2Open(true);
                                  setRemoveSupplier(item);
                                }}
                              >
                                <img src={deleteMember} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <div className="noDataFound">No data found</div>
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
      {isDetailsOpen && (
        <SupplierDetails
          isOpen={isDetailsOpen}
          toggleDetails={toggleDetails}
          setIsDetailsOpen={setIsDetailsOpen}
          selectedSupplier={selectedSupplier}
        />
      )}
      {modal2Open && (
        <CommonModal
          modal2Open={modal2Open}
          setModal2Open={setModal2Open}
          modalImage={deleteModal}
          removeSupplier={removeSupplier}
        />
      )}
    </>
  );
};

export default Suppliers;
