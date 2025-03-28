import React, { useEffect, useState } from "react";
import qrImage from "../../../assets/images/qrImage.svg";
import arrowUp from "../../../assets/images/arrow-up.svg";
import addCircle from "../../../assets/images/addCircle.svg";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import uploadImage from "../../../assets/images/uploadImage.svg";
import AboutProfile from "./AboutProfile";
import AccountInfoProfile from "./AccountInfoProfile";
import HoursProfile from "./HoursProfile";
import restaurantCard from "../../../assets/images/restaurantCard.png";
import businessPhoto from "../../../assets/images/businessPhoto.png";
import ImageGallery from "./ImageGallery";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProfileHandler } from "../../../redux/action/businessAction/getProfile";
import Loader from "../../../common/Loader/Loader";
import { galleryListHandler } from "../../../redux/action/businessAction/galleryList";
import { useCommonMessage } from "../../../common/CommonMessage";
import {
  businessFileUploadAction,
  businessFileUploadHandler,
} from "../../../redux/action/businessAction/businessFileUpload";
import {
  addImageAction,
  addImageHandler,
} from "../../../redux/action/businessAction/addImage";
import qrCode from "../../../assets/images/qrcode.png"

const Profile = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("Additional");
  const [imagePreview, setImagePreview] = useState(null);
  const [fileObject, setFileObject] = useState();
  const [isSpecial, setIsSpecial] = useState(false);

  const fileuploadSelector = useSelector((state) => state?.businessFileUpload);

  const dispatch = useDispatch();
  const messageApi = useCommonMessage();

  const tabs = [
    { key: "additional", label: "Additional" },
    { key: "cover", label: "Cover" },
    { key: "profile", label: "Profile" },
    { key: "logo", label: "Logo" },
    { key: "food_drink", label: "Food & Drink" },
    { key: "menu", label: "Menu" },
    { key: "merchant_upload", label: "Merchant Upload" },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFileObject(file);
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        messageApi.open({
          type: "error",
          content: "Only JPG, JPEG, and PNG formats are allowed",
        });
        return;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        messageApi.open({
          type: "error",
          content: "File size must not exceed 5MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      let payload = {
        fileList: [{ fileName: file?.name }],
      };
      dispatch(businessFileUploadHandler(payload));
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      if (fileuploadSelector?.data?.statusCode === 200) {
        setLoading(true);
        try {
          const response = await fetch(
            fileuploadSelector?.data?.data?.[0]?.url,
            {
              method: "PUT",
              body: fileObject,
            }
          );

          if (!response.ok) {
            throw new Error("File upload failed");
          }
        } catch (error) {
          console.error("Error uploading file", error);
        } finally {
          setLoading(false);
        }
      }
    };

    uploadFile();
  }, [fileuploadSelector]);

  const handleDelete = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setModalOpen(false);
  };
  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const getSelectedBusinessData = JSON.parse(
    localStorage.getItem("selectedBusiness")
  );

  const getProfileDetailsSelector = useSelector(
    (state) => state?.getProfileDetails
  );

  const addImageDataSelector = useSelector((state) => state?.addImageData);

  useEffect(() => {
    dispatch(getProfileHandler(getSelectedBusinessData?._id));
  }, []);


  const handleCheckboxChange = (event) => {
    setIsSpecial(event.target.checked);
  };

  const handleUploadImage = () => {
    let payload = {
      title: activeTab,
      imageUrl: fileuploadSelector?.data?.data
        ?.map((item) => item?.src)
        .join(""),
      isSpecial: isSpecial,
      imageCategoryType: activeTab,
    };
    setModalOpen(false);
    dispatch(addImageHandler(payload));
    console.log(payload, "payload");
  };

  useEffect(() => {
    if (addImageDataSelector?.message) {
      messageApi.open({
        type: "error",
        content: addImageDataSelector?.message,
      });
      dispatch(addImageAction.addImageReset());
    }else if (addImageDataSelector?.data?.statusCode===200){
      messageApi.open({
        type: "success",
        content: addImageDataSelector?.data?.message,
      });
      setImagePreview(null)
      dispatch(addImageAction.addImageReset());
    }
  }, [addImageDataSelector]);

  const items = [
    {
      title: "About",
      content: (
        <AboutProfile getProfileDetailsSelector={getProfileDetailsSelector} />
      ),
    },
    {
      title: "Account Info",
      content: (
        <AccountInfoProfile
          getProfileDetailsSelector={getProfileDetailsSelector}
        />
      ),
    },
    {
      title: "Hours",
      content: (
        <HoursProfile getProfileDetailsSelector={getProfileDetailsSelector} />
      ),
    },
  ];
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const images = [
    businessPhoto,
    restaurantCard,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    restaurantCard,
    businessPhoto,
    restaurantCard,
    businessPhoto,
    restaurantCard,
  ];
const [qrCodeModal,setQrCodeModal] = useState(false)

  const qrCodeModalMain = () =>{
    setQrCodeModal(true)
  }

  return (
    <>
      {(getProfileDetailsSelector?.isLoading ||
        addImageDataSelector?.isLoading ||
        fileuploadSelector?.isLoading ||
        loading) && <Loader />}
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex justify-between align-center">
            <div className="fs-24 fw-600">Basic Info</div>
            <div className="qrImage cursor-pointer" onClick = {qrCodeModalMain}>
              <img src={qrImage} alt="" />
            </div>
          </div>
          <div className="divider2"></div>
          <div className="d-flex align-center gap-20">
            <div className="profileImage">
              {JSON.parse(
                localStorage.getItem("loginResponse")
              )?.firstName?.charAt(0)}
              {JSON.parse(
                localStorage.getItem("loginResponse")
              )?.lastName?.charAt(0)}
            </div>
            <div>
              <div className="fs-24 fw-600 mb-10"></div>
              <div className="positionTag fs-16 fw-600">
                {getSelectedBusinessData?.roleTitle}
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="inputGrid gap-20">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Business name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Business name"
                defaultValue={
                  getProfileDetailsSelector?.data?.data?.businessName
                }
              />
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Street address
              </label>
              <input
                type="text"
                className="input"
                placeholder="Street address"
                defaultValue={
                  getProfileDetailsSelector?.data?.data?.address?.addressLine1
                }
              />
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Location
              </label>
              <input
                type="text"
                className="input"
                placeholder="Street address"
                defaultValue={[
                  getProfileDetailsSelector?.data?.data?.address?.locality,
                  getProfileDetailsSelector?.data?.data?.address
                    ?.administrativeDistrictLevel1,
                  getProfileDetailsSelector?.data?.data?.address?.country,
                  getProfileDetailsSelector?.data?.data?.address?.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              />
            </div>
          </div>
        </div>
        <div className="accordionCustom nudgeAccourdian">
          {items.map((item, index) => (
            <>
              <div key={index} className=" accordionItem  mb-30">
                <div
                  className="accordionHeader fs-20 fw-600"
                  onClick={() => toggleAccordion(index)}
                >
                  <div>{item.title}</div>
                  <div className="d-flex align-center gap-16">
                    <div
                      className={`arrow ${openIndex === index ? "open" : ""}`}
                    >
                      <img src={arrowUp} alt="arrowUp" className="arrowUp" />
                    </div>
                  </div>
                </div>
                <div
                  className={` accordion-content ${
                    openIndex === index ? "open" : ""
                  }`}
                >
                  {item.content}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="tabPadding">
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-20 fw-600">Gallery</div>
            {activeTab === "Merchant Upload" && (
              <div
                className="addCircle cursor-pointer"
                onClick={() => toggleModal()}
              >
                <img src={addCircle} alt="" />
              </div>
            )}
          </div>
          <div className="tabs-container tab3 tabFull mb-20">
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-button ${
                    activeTab === tab.label ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <ImageGallery
            images={images}
            openImage={openImage}
            setOpenImage={setOpenImage}
            // galleryListSelector={galleryListSelector}
            activeTab={activeTab}
            addImageDataSelector={addImageDataSelector}
          />
        </div>
      </div>
      {/* Upload Image modal */}
      <Modal
        centered
        visible={isModalOpen} // Control the visibility of the modal  // Handle close
        footer={null} // Hide the footer (buttons)
        closable={false}
        className="selecModal"
      >
        <div className="p20">
          <div className=" d-flex justify-between align-center">
            <div className="fs-18 fw-700">
              {!imagePreview ? "Upload Photo" : "Image Details"}{" "}
            </div>
            <div
              className="closeSidebar"
              onClick={() => {
                setModalOpen(false);
                setImagePreview(null);
              }}
            >
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          <div className="divider2"></div>
          {!imagePreview ? (
            <label className="uploadDrag text-center" htmlFor="file">
              <input
                type="file"
                id="file"
                className="d-none"
                onChange={handleImageUpload}
              />
              <div>
                <div className="fs-14 mb-16">Drag images here</div>
                <div className="fs-14 grey mb-16">or</div>
                <div className="btn gap-8 px16 fw-500">
                  <img src="upload-icon.png" alt="" />
                  Choose from gallery
                </div>
              </div>
            </label>
          ) : (
            <div className="image-details">
              <div className="image-preview mb-20">
                <img
                  src={imagePreview}
                  // alt={uploadedImage.name}
                  className="w-100 h-100"
                />
              </div>
              <div className="details">
                {/* <div className="fs-20 fw-700 mb-20">{uploadedImage.name}</div> */}
                <div>
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        checked={isSpecial}
                        onChange={handleCheckboxChange}
                      />
                      <span className="checkmark"></span>
                      Mark as Special
                    </label>
                  </div>
                </div>
                <div className="divider2 my-16"></div>
                <div className="d-flex gap-10 justify-end flexBtn">
                  <div
                    className="btnSecondary w-100 btn"
                    onClick={handleDelete}
                  >
                    Cancel
                  </div>
                  <div
                    className="w-100 btn"
                    // onClick={() => {
                    //   setModalOpen(false);
                    //   handleDelete();
                    // }}
                    onClick={handleUploadImage}
                  >
                    Upload
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>


{/* QR Code Modal */}
      <Modal
        centered
        visible={qrCodeModal} // Control the visibility of the modal  // Handle close
        footer={null} // Hide the footer (buttons)
        closable={false}
        className="selecModal"
      >
        <div className="p20 bgPrimary">
          <div className=" d-flex justify-center align-center ">
            <div className="fs-18 fw-700 ">
              {/* {!imagePreview ? "Upload Photo" : "Image Details"}{" "} */}
              <img src = {qrCode} className="w-100" />
            </div>
            <div
              className="closeRightSidebarModals"
              onClick={() => {
                setQrCodeModal(false)
              }}
            >
              <img src={closeRightSidebar} alt="closeRightSidebar" className="closeRightSidebarModalsIcon"  />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
