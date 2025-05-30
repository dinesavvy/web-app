import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import SearchSelect from "../SearchSelect";
import { useDispatch, useSelector } from "react-redux";
import { merchantsListHandler } from "../../../../redux/action/merchantsList";
import Loader from "../../../../common/Loader/Loader";
import noImageFound from "../../../../assets/images/noImageFound.png";
import radioSelectedImage from "../../../../assets/images/radioSelected.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const MerchantListModal = ({
  selectMerchantList,
  setSelectMerchantList,
  onSelectionChange,
  setSelectedMerchants,
  selectedMerchants
}) => {
  const [searchString, setSearchString] = useState("");
  const merchantsListSelector = useSelector((state) => state?.merchantsList);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [merchantsData, setMerchantsData] = useState([]);
  const [localSelectedMerchants, setLocalSelectedMerchants] = useState(selectedMerchants || []);



  const dispatch = useDispatch();

  const handleSearchChange = (value) => {
    setSearchString(value);
    // setPagination((prev) => ({ ...prev, page: 1 })); // Reset to the first page on search
  };

  useEffect(() => {
    const fetchMerchants = () => {
      const payload = {
        page: page,
        limit: 10,
        timeFrame: "today",
        searchString: searchString,
        searchArea: [],
      };
      dispatch(merchantsListHandler(payload));
    };

    fetchMerchants();
  }, [searchString, page]);


  // Select all working functionality
  // const handleSelectAllToggle = () => {
  //   const allMerchants = merchantsListSelector?.data?.data?.records || [];

  //   if (selectedMerchants.length) {
  //     // Clear all
  //     setSelectedMerchants([]);
  //     onSelectionChange([]);
  //   } else {
  //     // Select all (store full objects)
  //     setSelectedMerchants(allMerchants);
  //     onSelectionChange(allMerchants);
  //   }
  // };

//   const handleSelectAllToggle = () => {
//   if (selectedMerchants?.length) {
//     // Clear all
//     setSelectedMerchants([]);
//     onSelectionChange([]);
//   } else {
//     // Select all loaded so far
//     setSelectedMerchants(merchantsData);
//     onSelectionChange(merchantsData);
//   }
// };


//   const handleCheckboxToggle = (merchant) => {
//     setSelectedMerchants((prevSelected) => {
//       const exists = prevSelected.find((m) => m._id === merchant._id);

//       if (exists) {
//         // Remove merchant
//         return prevSelected.filter((m) => m._id !== merchant._id);
//       } else {
//         // Add merchant
//         return [...prevSelected, merchant];
//       }
//     });
//   };


  const handleCheckboxToggle = (merchant) => {
    setLocalSelectedMerchants((prev) => {
      const exists = prev.find((m) => m._id === merchant._id);
      return exists
        ? prev.filter((m) => m._id !== merchant._id)
        : [...prev, merchant];
    });
  };

  const handleSelectAllToggle = () => {
    if (localSelectedMerchants.length === merchantsData.length) {
      setLocalSelectedMerchants([]);
    } else {
      setLocalSelectedMerchants(merchantsData);
    }
  };

  const handleAdd = () => {
    onSelectionChange(localSelectedMerchants);
    setSelectMerchantList(false); // Close modal
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (merchantsListSelector?.data?.data?.records) {
      if (page === 1) {
        setMerchantsData(merchantsListSelector?.data?.data?.records);
      } else {
        setMerchantsData((prev) => [
          ...prev,
          ...merchantsListSelector?.data?.data?.records,
        ]);
      }
      // Check if we have more data to load
      setHasMore(merchantsListSelector?.data?.data?.records?.length === 10);
    }
  }, [merchantsListSelector?.data?.data?.records]);

  return (
    <>
      {merchantsListSelector?.isLoading && <Loader />}
      <div>
        <Modal
          centered
          visible={selectMerchantList}
          footer={null}
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
              onClick={handleSelectAllToggle}
            >
              {/* {selectedMerchants.length ===
              merchantsListSelector?.data?.data?.records?.length
                ? "Clear All"
                : "Select All"} */}
              {selectedMerchants?.length > 0 ? "Clear All" : "Select All"}
            </div>
          </div>
          <InfiniteScroll
            className="overflowGrid"
            dataLength={merchantsData?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget="selectMerchant"
            height={280}
          >
            <div className="addMerchantGrid gap-20 mb-20">
              {merchantsData?.map((item, index) => {
                return (
                  <label className="custom-label w-100" key={index}>
                    <input
                      autoComplete="off"
                      type="checkbox"
                      name="option"
                      // checked={selectedMerchants.some(
                      //   (merchant) => merchant._id === item._id
                      // )}
                      checked={!!localSelectedMerchants.find((m) => m._id === item._id)}

                      onChange={() => handleCheckboxToggle(item)}
                    />
                    <div className="custom-radio-button">
                      <img src={radioSelectedImage} alt={item?.businessName} />
                    </div>
                    <div className="radioImage">
                      <img
                        alt={item?.businessName}
                        src={item?.logoUrl || noImageFound}
                      />
                    </div>
                    <div className="radioCafeName">
                      <div>
                        <div className="pc fs-14 fw-500 oneLine">
                          {item?.businessName &&
                            item?.businessName.charAt(0).toUpperCase() +
                              item?.businessName.slice(1)}
                        </div>
                        <div className="fs-12 oneLine">
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
              })}
            </div>
          </InfiniteScroll>
          {merchantsListSelector?.data?.data?.records?.length > 0 && (
            <>
              {/* <div className="pc text-center cursor-pointer">View More</div> */}
              {/* <div className="divider2"></div> */}
              <div className="d-flex justify-end">
                <button
                  type="submit"
                  className="btn p32"
                  // onClick={() => {
                  //   onSelectionChange(selectedMerchants);
                  //   setSelectMerchantList(false); // close modal
                  // }}
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default MerchantListModal;
