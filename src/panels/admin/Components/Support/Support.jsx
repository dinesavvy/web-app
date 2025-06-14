import React, { useEffect, useState } from "react";
import SupportDetail from "./SupportDetail";
import { useDispatch, useSelector } from "react-redux";
import { supportListHandler } from "../../../../redux/action/supportList";
import { Pagination } from "antd";
import Loader from "../../../../common/Loader/Loader";
import {
  resolveSupportRequestAction,
} from "../../../../redux/action/resolveSupportRequest";
import { useCommonMessage } from "../../../../common/CommonMessage";
import CommonModal from "../CommonModal";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../../../hooks/useScrollToTop";

const Support = () => {
  const [resolveModal, setResolveModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [supportItem, setSupportItem] = useState({});
  const [resolveModalItem, setResolveModalItem] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page,pagination?.limit]);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab
    setPagination({ page: 1, limit: 10 })
  };

  const toggleSidebar = async (item) => {
    setSupportItem(item);
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isSidebarOpen]);

  const supportListSelector = useSelector((state) => state.supportList);

  const resolveSupportRequestSelector = useSelector(
    (state) => state?.resolveSupportRequest
  );

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  useEffect(() => {
    if (activeTab) {
      let payload = {
        page: pagination?.page,
        limit: pagination?.limit,
        status: activeTab === "Active" ? "Pending" : "Completed", // Completed , Rejected, Pending
      };
      dispatch(supportListHandler(payload));
    }
  }, [pagination, activeTab, resolveSupportRequestSelector]);

  const resolveSupportReq = (item) => {
    setResolveModal(true);
    setResolveModalItem(item);
  };
  // Resolve business useEffect
  useEffect(() => {
    if (resolveSupportRequestSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: resolveSupportRequestSelector?.data?.message,
      });
      dispatch(resolveSupportRequestAction.resolveSupportRequestInfoReset());
      setResolveModal(false);
    } else if (resolveSupportRequestSelector?.message?.status === 400) {
      setResolveModal(false);
      messageApi.open({
        type: "error",
        content:
          resolveSupportRequestSelector?.message?.response?.data?.message,
      });
      dispatch(resolveSupportRequestAction.resolveSupportRequestInfoReset());
    }
  }, [resolveSupportRequestSelector]);

  const viewBusinessDetails = (item) => {
    navigate("/admin/edit-support", {
      state: { businessDetail: item, fromResolve: true },
    });
  };

  return (
    <>
      {supportListSelector?.isLoading && <Loader />}
      <div className="dashboard">
        <div className="tabPadding">
          <div className="fs-24 fw-600 mb-30">Support Request</div>
          <div className="tabs-container tab3 tabing mb-30">
            <div className="tabs">
              <button
                className={`tab-button ${
                  activeTab === "Active" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Active")}
              >
                Active
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Resolve" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Resolve")}
              >
                Resolved
              </button>
            </div>
          </div>
          <div>
            <div className="merchantGrid">
              {supportListSelector?.data?.data?.records?.length > 0 ? (
                <>
                  {supportListSelector?.data?.data?.records?.map(
                    (item, index) => {
                      return (
                        <>
                          <div className="cardFollow" key={index}>
                            <div className="d-flex justify-between h-100 flexColumn">
                              {item?.requestStatus === "Imported" && (
                                <>
                                  <div className="paddingsupport"></div>
                                  <div className="nailedIt active fs-14">
                                    Merchant Business Imported
                                  </div>
                                </>
                              )}
                              <div>
                                <div className="d-flex align-center gap-12">
                                  <div className="initialName">
                                    {(item?.requestStatus === "Imported" 
                                      ? item?.businessDetails?.businessName 
                                      : item?.businessName)
                                      ?.split(" ")
                                      .map((word) => word[0])
                                      .join("")
                                      .slice(0, 2)
                                      .toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="fw-700">
                                      {item?.requestStatus === "Imported" ? item?.businessDetails?.businessName : item?.businessName
                                        .charAt(0)
                                        .toUpperCase() +
                                        item?.businessName
                                          .slice(1)
                                          .toLowerCase() || "-"}
                                    </div>
                                  </div>
                                </div>
                                <div className="divider2"></div>
                                <div className="mb-20">
                                  <div className="fs-14  mb-16">
                                    <div className="lightBlack mb-4">
                                      Business name
                                    </div>
                                    
                                    <div className="fw-600">
                                      {item?.requestStatus === "Imported" ?item?.businessDetails?.businessName : item?.businessName || "N/A"}
                                    </div>
                                  </div>
                                  <div className="fs-14  mb-16">
                                    <div className="lightBlack mb-4">
                                      Phone number
                                    </div>
                                    <div className="fw-600">
                                      {item?.requestStatus === "Imported" ?item?.businessDetails?.phoneNumber : item?.phoneNumber || "N/A"}
                                    </div>
                                  </div>
                                  <div className="fs-14  mb-16">
                                    <div className="lightBlack mb-4">
                                      Email address
                                    </div>
                                    <div className="fw-600">
                                      {item?.emailAddress || "N/A"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="gridBtn">
                                <div
                                  className="btn"
                                  onClick={() => {
                                    if (activeTab === "Active") {
                                      toggleSidebar(item);
                                    } else {
                                      viewBusinessDetails(item);
                                    }
                                  }}
                                >
                                  {activeTab === "Active"
                                    ? "View Details"
                                    : "View Google Business Profile"}
                                </div>
                                {activeTab === "Active" && (
                                  <div
                                    className="btnSecondary detailBtn btn"
                                    onClick={() => resolveSupportReq(item)}
                                  >
                                    Resolve
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  )}
                </>
              ) : (
                <div className="noDataFound">No data available</div>
              )}
            </div>
          </div>
          {supportListSelector?.data?.data?.records?.length > 0 && (
            <div className="d-flex align-center justify-between flexPagination mt-10">
              <div className="fs-16">
                Showing {pagination?.page} to {pagination?.limit} of{" "}
                {supportListSelector?.data?.data?.recordsCount} support
              </div>
              {/* <Pagination defaultCurrent={1} total={50} /> */}
              <Pagination
                current={pagination?.page}
                pageSize={pagination?.limit}
                total={supportListSelector?.data?.data?.recordsCount}
                onChange={handlePaginationChange}
                pageSizeOptions={["12" ,'20', '50', '100']} 
                showSizeChanger
              />
            </div>
          )}
        </div>
      </div>
      {isSidebarOpen && activeTab === "Active" && (
        <SupportDetail
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          supportItem={supportItem}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      )}

      <CommonModal
        resolveModal={resolveModal}
        setResolveModal={setResolveModal}
        resolveModalItem={resolveModalItem}
      />
    </>
  );
};

export default Support;
