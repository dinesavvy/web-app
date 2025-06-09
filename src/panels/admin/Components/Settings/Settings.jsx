import React, { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";
import SearchSelect from "../SearchSelect";
import { Pagination } from "antd";
import {
  createVersionAction,
  createVersionHandler,
} from "../../../../redux/action/createVersion";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../../common/CommonMessage";
import Loader from "../../../../common/Loader/Loader";
import { settingListHandler } from "../../../../redux/action/settingList";
import { handleKeyPressSpace } from "../../../../common/commonFunctions/CommonFunctions";
import CommonPagination from "../../../../common/pagination/CommonPagination";
import useScrollToTop from "../../../../hooks/useScrollToTop";

const Settings = () => {
  const [environment, setEnvironment] = useState("Stage");
  const [application, setApplication] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [ios, setIos] = useState({ version: "", build: "", minForce: "" });
  const [searchString, setSearchString] = useState("");
  const [android, setAndroid] = useState({
    version: "",
    build: "",
    minForce: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ page, limit: pageSize });
  };

  // Scroll to top when the component mounts
  useScrollToTop([pagination?.page, pagination?.limit]);

  const selectVersion = useSelector((state) => state.createVersion);

  const handleChange = (platform, field, value) => {
    if (platform === "ios") {
      setIos({ ...ios, [field]: value });
    } else {
      setAndroid({ ...android, [field]: value });
    }
  };

  const handleSearchChange = (value) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Validation functions
  const validateVersion = (version) => {
    // Allow numbers and dots
    return /^[\d.]+$/.test(version);
  };

  const validateBuild = (build) => {
    return /^[\d.]+$/.test(build);
  };

  const validateForm = () => {
    const newErrors = {};

    // Application Type validation
    if (!application) {
      newErrors.application = "Application Type is required";
    }

    // iOS validations
    if (!ios.version || !validateVersion(ios.version)) {
      newErrors.iosVersion = "Please enter a valid iOS version number";
    }
    if (!ios.build || !validateBuild(ios.build)) {
      newErrors.iosBuild = "Please enter a valid build number";
    }
    if (!ios.minForce || !validateVersion(ios.minForce)) {
      newErrors.iosMinForce = "Please enter a valid min force version number";
    }

    // Android validations
    if (!android.version || !validateVersion(android.version)) {
      newErrors.androidVersion = "Please enter a valid Android version number";
    }
    if (!android.build || !validateBuild(android.build)) {
      newErrors.androidBuild = "Please enter a valid build number";
    }
    if (!android.minForce || !validateVersion(android.minForce)) {
      newErrors.androidMinForce =
        "Please enter a valid min force version number";
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // messageApi.open({
      //   type: "error",
      //   content: "Please fix the validation errors before submitting",
      // });
      return;
    }

    const payload = {
      ios: {
        minVersion: ios.minForce,
        minBuildVersion: ios.build,
        currentVersion: ios.version,
        currentBuildVersion: ios.build,
      },
      android: {
        minVersion: android.minForce,
        minBuildVersion: android.build,
        currentVersion: android.version,
        currentBuildVersion: android.build,
      },
      appType: application,
      message: message.trim(),
    };

    dispatch(createVersionHandler(payload));
  };

  const messageApi = useCommonMessage();

  useEffect(() => {
    if (selectVersion?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: selectVersion?.data?.message,
      });
      // Reset all form fields
      setIos({ version: "", build: "", minForce: "" });
      setAndroid({ version: "", build: "", minForce: "" });
      setMessage("");
      setErrors({});
      setEnvironment("Stage");
      setApplication("Customer");
      dispatch(createVersionAction.createVersionReset());
    } else if (selectVersion?.message) {
      messageApi.open({
        type: "error",
        content: selectVersion?.message,
      });
      dispatch(createVersionAction.createVersionReset());
    }
  }, [selectVersion]);

  const settingList = useSelector((state) => state.settingList);

  const getSettingsList = () => {
    const payload = {
      page: pagination?.page,
      limit: pagination?.limit,
      searchString: searchString,
    };
    // if (searchString) {
    //   payload["searchString"] = searchString;
    // }
    dispatch(settingListHandler(payload));
  };

  useEffect(() => {
    getSettingsList();
  }, [pagination?.page, pagination?.limit, selectVersion, searchString]);


  const handleKeyDown = (e) => {
    // Prevent up/down arrow keys
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  const handleVersionInput = (e, platform, field) => {
    const value = e.target.value;
    // Allow numbers and dots
    if (/^[\d.]*$/.test(value)) {
      handleChange(platform, field, value);
      // Clear error for this specific field
      setErrors((prev) => ({
        ...prev,
        [`${platform}${field.charAt(0).toUpperCase() + field.slice(1)}`]:
          undefined,
      }));
    }
  };

  const handleBuildInput = (e, platform, field) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^[\d.]*$/.test(value)) {
      handleChange(platform, field, value);
      // Clear error for this specific field
      setErrors((prev) => ({
        ...prev,
        [`${platform}${field.charAt(0).toUpperCase() + field.slice(1)}`]:
          undefined,
      }));
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    // Clear message error
    setErrors((prev) => ({
      ...prev,
      message: undefined,
    }));
  };

  return (
    <>
      {(selectVersion?.isLoading || settingList?.isLoading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Settings</div>
          <div className="divider2"></div>
          <form onSubmit={handleSubmit}>
            <div className="inputGrid gap-24">
              <div>
                <label className=" mb-10 fs-14 fw-500">Environment</label>
                <CustomSelect
                  options={["Stage", "Dev"]}
                  onChange={(value) => setEnvironment(value)}
                />
              </div>
              <div>
                <label className=" mb-10 fs-14 fw-500">Application Type*</label>
                <CustomSelect
                  options={["Customer", "Business"]}
                  value={application}
                  onChange={(value) => {
                    setApplication(value);
                    setErrors((prev) => ({
                      ...prev,
                      application: undefined,
                    }));
                  }}
                  // onChange={(value) => setApplication(value)}
                />
                {errors.application && (
                  <div className="mt-10 fw-500 fs-14 error">
                    {errors.application}
                  </div>
                )}
              </div>
            </div>
            <div className="divider2"></div>
            <div className="inputGrid gap-24">
              <div className="d-flex gap-24 flexColumn">
                <div className="d-flex align-center justify-between gap-10">
                  <label className=" mb-10 fs-14 fw-500 w-100">
                    iOS Version*
                  </label>
                  <div className="w-100">
                    <input
                      name=""
                      id=""
                      type="text"
                      value={ios.version}
                      onChange={(e) => handleVersionInput(e, "ios", "version")}
                      onKeyDown={handleKeyDown}
                      // className={errors.iosVersion ? "error" : ""}
                    />
                    {errors.iosVersion && (
                      <div className="mt-10 fw-500 fs-14 error">
                        {errors.iosVersion}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex align-center justify-between gap-10">
                  <label className=" mb-10 fs-14 fw-500 w-100">
                    Build Version*
                  </label>
                  <div className="w-100">
                    <input
                      name=""
                      id=""
                      type="text"
                      value={ios.build}
                      onChange={(e) => handleBuildInput(e, "ios", "build")}
                      onKeyDown={handleKeyDown}
                      // className={errors.iosBuild ? "error" : ""}
                    />
                    {errors.iosBuild && (
                      <div className="mt-10 fw-500 fs-14 error">
                        {errors.iosBuild}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex align-center justify-between gap-10">
                  <label className=" mb-10 fs-14 fw-500 w-100">
                    Min Force Version*
                  </label>
                  <div className="w-100">
                    <input
                      name=""
                      id=""
                      type="text"
                      value={ios.minForce}
                      onChange={(e) => handleVersionInput(e, "ios", "minForce")}
                      onKeyDown={handleKeyDown}
                      // className={errors.iosMinForce ? "error" : ""}
                    />
                    {errors.iosMinForce && (
                      <div className="mt-10 fw-500 fs-14 error">
                        {errors.iosMinForce}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex gap-24 flexColumn">
                  <div className="d-flex align-center justify-between gap-10">
                    <label className=" mb-10 fs-14 fw-500 w-100">
                      Android Version Name*
                    </label>
                    <div className="w-100">
                      <input
                        name=""
                        id=""
                        type="text"
                        value={android.version}
                        onChange={(e) =>
                          handleVersionInput(e, "android", "version")
                        }
                        onKeyDown={handleKeyDown}
                        // className={errors.androidVersion ? "error" : ""}
                      />
                      {errors.androidVersion && (
                        <div className="mt-10 fw-500 fs-14 error">
                          {errors.androidVersion}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-center justify-between gap-10">
                    <label className=" mb-10 fs-14 fw-500 w-100">
                      Build Version*
                    </label>
                    <div className="w-100">
                      <input
                        name=""
                        id=""
                        type="text"
                        value={android.build}
                        onChange={(e) =>
                          handleBuildInput(e, "android", "build")
                        }
                        onKeyDown={handleKeyDown}
                        // className={errors.androidBuild ? "error" : ""}
                      />
                      {errors.androidBuild && (
                        <div className="mt-10 fw-500 fs-14 error">
                          {errors.androidBuild}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-center justify-between gap-10">
                    <label className=" mb-10 fs-14 fw-500 w-100">
                      Min Force Version*
                    </label>
                    <div className="w-100">
                      <input
                        name=""
                        id=""
                        type="text"
                        value={android.minForce}
                        onChange={(e) =>
                          handleVersionInput(e, "android", "minForce")
                        }
                        onKeyDown={handleKeyDown}
                        // className={errors.androidMinForce ? "error" : ""}
                      />
                      {errors.androidMinForce && (
                        <div className="mt-10 fw-500 fs-14 error">
                          {errors.androidMinForce}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider2"></div>
            <div className="mb-20">
              <label className=" mb-10 fs-14 fw-500 w-100">Message*</label>
              <div className="w-100">
                <textarea
                  rows={5}
                  placeholder="Enter your message"
                  value={message}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPressSpace}
                ></textarea>
                {errors.message && (
                  <div className="mt-10 fw-500 fs-14 error">
                    {errors.message}
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-end">
              <button type="submit" className="btn p32">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="tabPadding">
          <SearchSelect onSearchChange={handleSearchChange} />
          <div className="divider2"></div>
          <div className="overflowy bordertable mb-20">
            <table className="table w-100">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Application Name</th>
                  <th>Message</th>
                  <th>iOS</th>
                  <th>Android</th>
                  <th>Min Force Version iOS</th>
                  <th>Min Force Version Android</th>
                </tr>
              </thead>
              {settingList?.data?.data?.records?.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.appType}</td>
                      <td>{item?.message}</td>
                      <td>{item?.ios?.minBuildVersion}</td>
                      <td>{item?.android?.currentVersion}</td>
                      <td>{item?.ios?.minVersion}</td>
                      <td>{item?.android?.minBuildVersion}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
      
          {settingList?.data?.data?.records?.length > 0 && (
                <CommonPagination
                  currentPage={pagination?.page}
                  pageSize={pagination?.limit}
                  totalCount={settingList?.data?.data?.recordsCount}
                  currentCount={
                    settingList?.data?.data?.records?.length
                  }
                  onPageChange={handlePaginationChange}
                  label="Settings"
                />
              )}
        </div>
      </div>
    </>
  );
};

export default Settings;
