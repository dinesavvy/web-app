import React, { useState } from "react";
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

const Profile = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage({
        name: file.name,
        url: imageUrl,
        uploader: "John Cooper",
        uploadDate: "1 month ago",
      });
    }
  };

  const handleDelete = () => {
    setUploadedImage(null);
  };
  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const items = [
    {
      title: "About",
      content: <AboutProfile />,
    },
    {
      title: "Account Info",
      content: <AccountInfoProfile />,
    },
    {
      title: "Hours",
      content: <HoursProfile />,
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
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="d-flex justify-between align-center">
            <div className="fs-24 fw-600">Basic Info</div>
            <div className="qrImage">
              <img src={qrImage} alt="" />
            </div>
          </div>
          <div className="divider2"></div>
          <div className="d-flex align-center gap-20">
            <div className="profileImage">gh</div>
            <div>
              <div className="fs-24 fw-600 mb-10">Myles Leighton</div>
              <div className="positionTag fs-16 fw-600">Owner</div>
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
            <div
              className="addCircle cursor-pointer"
              onClick={() => toggleModal()}
            >
              <img src={addCircle} alt="" />
            </div>
          </div>
          <div className="tabs-container tab3 tabFull mb-20">
            <div className="tabs">
              <button className="tab-button active">Drinks</button>
              <button className="tab-button ">Appetizers</button>
              <button className="tab-button ">Meals</button>
              <button className="tab-button ">Restaurant</button>
              <button className="tab-button ">Customer Submitted</button>
            </div>
          </div>
          <ImageGallery
            images={images}
            openImage={openImage}
            setOpenImage={setOpenImage}
          />
        </div>
      </div>
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
              {!uploadedImage ? "Upload Photo" : "Image Details"}{" "}
            </div>
            <div className="closeSidebar" onClick={() => setModalOpen(false)}>
              <img src={closeRightSidebar} alt="closeRightSidebar" />
            </div>
          </div>
          <div className="divider2"></div>
          {!uploadedImage ? (
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
                  src={uploadedImage.url}
                  alt={uploadedImage.name}
                  className="w-100 h-100"
                />
              </div>
              <div className="details">
                <div className="fs-20 fw-700 mb-20">{uploadedImage.name}</div>
                <div>
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input type="checkbox" />
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
                  <div className="w-100 btn" onClick={()=>{setModalOpen(false);handleDelete()}}>Upload</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Profile;
