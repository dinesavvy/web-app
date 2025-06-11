import React, { useEffect, useState } from "react";
import addBtn from "../../../../assets/images/addBtn.svg";
import onlyArrowBtn from "../../../../assets/images/onlyArrowBtn.svg";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../common/Loader/Loader";
import { useCommonMessage } from "../../../../common/CommonMessage";
import { deleteBrandsAction } from "../../../../redux/action/deleteBrand";
import SearchSelect from "../../../admin/Components/SearchSelect";
import "../../../../assets/css/merchant.css";
import { supplierBrandListHandler } from "../../../../redux/action/supplierActions/supplierBrandList";
import BrandDetails from "./BrandDetails";
import noImageFound from "../../../../assets/images/noImageFound.png";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import CommonPagination from "../../../../common/pagination/CommonPagination";

const Brands = () => {
  const messageApi = useCommonMessage();
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [brandDetails, setBrandDetails] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page, pagination?.limit]);

  const getBrandListSelector = useSelector((state) => state?.supplierBrandList);
  const deleteBrandSelector = useSelector((state) => state?.removeSupplier);
  const removeBrandSupplier = useSelector(
    (state) => state?.removeBrandSupplier
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

  useEffect(() => {
    let payload = {
      page: pagination?.page,
      limit: pagination?.limit,
      searchString: searchString,
    };
    dispatch(supplierBrandListHandler(payload));
  }, [pagination, removeBrandSupplier]);

  const toggleDetails = (item) => {
    setBrandDetails(item);
    setIsDetailsOpen((prevState) => !prevState);
  };

  return (
    <>
      {(getBrandListSelector?.isLoading || deleteBrandSelector?.isLoading) && (
        <Loader />
      )}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex justify-between align-center mb-20">
            <div className="fs-24 fw-600">Brands</div>
            <div
              className="btn gap-8 addBtn"
              onClick={() => navigate("/supplier/addBrand")}
            >
              Add Brand
              <img src={addBtn} alt="addBtn" />
            </div>
          </div>
          <SearchSelect
            onSearchChange={handleSearchChange}
            onSearchAreaChange={handleSearchAreaChange}
          />
          <div className="merchantGrid mb-20">
            {getBrandListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {getBrandListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <div className="merchantCard position-relative flexColumn d-flex" key={index}>
                        <div className="p-20">
                          <div className="text-center promotionImage">
                            <img
                              src={item?.imageUrl?.[0] || noImageFound}
                              alt=""
                              className="h-100"
                            />
                          </div>
                        </div>
                        <div className="divider m-0"></div>
                        <div className="bottomPadding d-flex flexColumn flex1 gap-20 justify-between">
                          <div>

                          <div className="fs-16 fw-700 mb-20">
                            {item?.brandName
                              ? item?.brandName.charAt(0).toUpperCase() +
                                item?.brandName.slice(1)
                              : ""}
                          </div>

                          {/* <div className="fs-16 fw-600 roi green mb-20">
                            Performance: 52%
                          </div> */}
                          <div
                            className={
                              item?.performance > 50
                                ? "fs-16 fw-600 roi green mb-20"
                                : "fs-16 fw-600 roi blue mb-20"
                            }
                          >
                            Performance: {item?.performance}%
                          </div>
                          </div>
                          <div className="d-flex align-center gap-10">
                            <div
                              className="btn btnSecondary w-100 gap-8"
                              onClick={() => navigate("/supplier/promotion")}
                            >
                              {/* <img src={editMember} alt="" /> */}
                              Promote
                            </div>
                            <div
                              className="onlyArrowBtn btn"
                              onClick={() => toggleDetails(item)}
                            >
                              <img src={onlyArrowBtn} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <div className="noDataFound">No data available</div>
            )}
          </div>

          {getBrandListSelector?.data?.data?.records?.length > 0 && (
            <CommonPagination
              currentPage={pagination?.page}
              pageSize={pagination?.limit}
              totalCount={getBrandListSelector?.data?.data?.recordsCount}
              currentCount={getBrandListSelector?.data?.data?.records?.length}
              onPageChange={handlePaginationChange}
              label="Brands"
            />
          )}
        </div>
      </div>
      <BrandDetails
        isOpen={isDetailsOpen}
        toggleDetails={toggleDetails}
        brandDetails={brandDetails}
        setIsDetailsOpen={setIsDetailsOpen}
      />
    </>
  );
};

export default Brands;
