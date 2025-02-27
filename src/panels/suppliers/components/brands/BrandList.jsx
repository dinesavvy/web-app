import React, { useEffect, useState } from "react";
import addBtn from "../../../../assets/images/addBtn.svg";
import coke from "../../../../assets/images/coke.svg";
import editMember from "../../../../assets/images/editMember.svg";
import onlyArrowBtn from "../../../../assets/images/onlyArrowBtn.svg";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { brandListsHandler } from "../../../../redux/action/brandListSlice";
import Loader from "../../../../common/Loader/Loader";
import { useCommonMessage } from "../../../../common/CommonMessage";
import { deleteBrandsAction } from "../../../../redux/action/deleteBrand";
import SearchSelect from "../../../admin/Components/SearchSelect";
import "../../../../assets/css/merchant.css";
import { supplierBrandListHandler } from "../../../../redux/action/supplierActions/supplierBrandList";
import BrandDetails from "./BrandDetails";

const Brands = () => {
  const messageApi = useCommonMessage();
  const [pagination, setPagination] = useState({ page: 1, limit: 9 });
  const [searchString, setSearchString] = useState("");
  const [brandDetails, setBrandDetails] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getBrandListSelector = useSelector((state) => state?.supplierBrandList);
  const deleteBrandSelector = useSelector((state) => state?.removeSupplier);

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
    };
    dispatch(supplierBrandListHandler(payload));
  }, [pagination, deleteBrandSelector]);

  const toggleDetails = (item) => {
    setBrandDetails(item);
    setIsDetailsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (deleteBrandSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: deleteBrandSelector?.data?.message,
      });
      setIsDetailsOpen(false);
      dispatch(deleteBrandsAction.deleteBrandReset());
    }
  }, [deleteBrandSelector]);

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
                      <div className="merchantCard" key={index}>
                        <div className="p-20">
                          <div className="text-center promotionImage">
                            <img src={coke} alt="" className="h-100" />
                          </div>
                        </div>
                        <div className="divider m-0"></div>
                        <div className="bottomPadding">
                          <div className="fs-16 fw-700 mb-20">
                            {item?.brandName}
                          </div>

                          <div className="fs-16 fw-600 roi green mb-20">
                            Performance: 52%
                          </div>
                          <div className="d-flex align-center gap-10">
                            <div
                              className="btn btnSecondary w-100 gap-8"
                              onClick={() => navigate("/admin/add-promotions")}
                            >
                              <img src={editMember} alt="" />
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
            <div className="d-flex align-center justify-between flexPagination">
              <div className="fs-16">
                {(() => {
                  const start = (pagination.page - 1) * pagination.limit + 1;
                  const end = Math.min(
                    start +
                      getBrandListSelector?.data?.data?.records?.length -
                      1,
                    getBrandListSelector?.data?.data?.recordsCount
                  );
                  return `Showing ${start} to ${end} of ${getBrandListSelector?.data?.data?.recordsCount} Brands`;
                })()}
              </div>
              <Pagination
                current={pagination?.page}
                pageSize={pagination?.limit}
                total={getBrandListSelector?.data?.data?.recordsCount}
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </div>
      <BrandDetails
        isOpen={isDetailsOpen}
        toggleDetails={toggleDetails}
        brandDetails={brandDetails}
      />
    </>
  );
};

export default Brands;
