import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import SearchSelect from "../SearchSelect";
import { useDispatch, useSelector } from "react-redux";
import { merchantsListHandler } from "../../../../redux/action/merchantsList";
import Loader from "../../../../common/Loader/Loader";
import noImageFound from "../../../../assets/images/noImageFound.png";
import radioSelectedImage from "../../../../assets/images/radioSelected.svg";

const MerchantListModal = ({ selectMerchantList, setSelectMerchantList }) => {
  const [searchString, setSearchString] = useState("");
  const merchantsListSelector = useSelector((state) => state?.merchantsList);
  console.log(merchantsListSelector, "merchantsListSelector");

  const dispatch = useDispatch();

  const handleSearchChange = (value) => {
    setSearchString(value);
    // setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page on search
  };

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        page: 1,
        limit: 10,
        timeFrame: "today",
        searchString,
        searchArea: [],
      };
      dispatch(merchantsListHandler(payload));
    };

    fetchMerchants();
  }, [searchString]);

  const [selectedMerchants, setSelectedMerchants] = useState([]);
const allMerchants = merchantsListSelector?.data?.data?.records || [];

const handleSelectAll = () => {
  const allIds = allMerchants.map((item) => item.id);
  setSelectedMerchants(allIds);
};

const handleCheckboxChange = (id) => {
  if (selectedMerchants.includes(id)) {
    // Deselect if already selected
    setSelectedMerchants(selectedMerchants.filter((item) => item !== id));
  } else {
    // Add to selected list
    setSelectedMerchants([...selectedMerchants, id]);
  }
};


  return (
    <>
      {merchantsListSelector?.isLoading && <Loader />}
      <div>
        <Modal
          centered
          visible={selectMerchantList} // Control the visibility of the modal  // Handle close
          footer={null} // Hide the footer (buttons)
          // closable={false}
          className="selecModalFollowerList"
          onOk={() => setSelectMerchantList(false)}
          onCancel={() => setSelectMerchantList(false)}
        >
          <div className=" d-flex justify-between align-center">
            <div className="fs-24 fw-600">Create Group</div>
            <div
              className="closeSidebar"
              onClick={() => setSelectMerchantList(false)}
            >
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          <div className="divider2"></div>
          <div className=" d-flex serchSelectall align-center gap-20 mb-20">
            <SearchSelect onSearchChange={handleSearchChange} />
            <div
              className="fs-16 fw-600 pc wordWrapNone cursor-pointer"
              onClick={handleSelectAll}
            >
              Select All
            </div>
          </div>
          <div className="addMerchantGrid gap-20 mb-20">
            {merchantsListSelector?.data?.data?.records?.length > 0 ? (
              <>
                {merchantsListSelector?.data?.data?.records?.map(
                  (item, index) => {
                    return (
                      <label class="custom-label w-100" key={index}>
                        <input
                          autoComplete="off"
                          type="radio"
                          name="option"
                          onChange={() => {
                            setIsSelectAll(false); 
                          }}
                        />
                        <div class="custom-radio-button">
                          <img
                            src={radioSelectedImage}
                            alt={item?.businessName}
                          />
                        </div>
                        <div class="radioImage">
                          <img
                            alt={item?.businessName}
                            src={item?.logoUrl || noImageFound}
                          />
                        </div>
                        <div class="radioCafeName">
                          <div>
                            <div class="pc fs-14 fw-500 oneLine">
                              {item?.businessName &&
                                item?.businessName.charAt(0).toUpperCase() +
                                  item?.businessName.slice(1)}
                            </div>
                            <div class="fs-12 oneLine">
                              {" "}
                              {[
                                item?.address?.administrativeDistrictLevel1,
                                item?.address?.country,
                                item?.address?.locality,
                                item?.address?.postalCode,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  }
                )}
              </>
            ) : (
              <div className="noDataFound">No data found</div>
            )}
          </div>
          {merchantsListSelector?.data?.data?.records?.length > 0 && (
            <>
              <div className="pc text-center cursor-pointer">View More</div>
              <div className="divider2"></div>
              <div className="d-flex justify-end">
                <div className="btn p32">Add</div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default MerchantListModal;
