import React, { useEffect, useState } from "react";

import dropdownArrow from "../../../assets/images/dropdownArrow.svg";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import { galleryListHandler } from "../../../redux/action/businessAction/galleryList";
import {
  deleteImageAction,
  deleteImageHandler,
} from "../../../redux/action/businessAction/deleteImage";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import moment from "moment";
import { useCommonMessage } from "../../../common/CommonMessage";

const ImageGallery = ({
  images,
  openImage,
  setOpenImage,
  // galleryListSelector,
  activeTab,
  addImageDataSelector,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(openImage || false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});

  const dispatch = useDispatch();

  const messageApi = useCommonMessage();

  const galleryListSelector = useSelector((state) => state?.galleryList);

  const deleteImageSelector = useSelector((state) => state?.deleteImage);

  const openModal = (item, index = 0) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  useEffect(() => {
    if (openImage) {
      setSelectedIndex(0);
      setIsModalOpen(true);
    }
  }, [openImage]);

  const deleteImage = () => {
    let payload = {
      imageId: selectedItem?._id,
    };
    dispatch(deleteImageHandler(payload));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOpenImage(false);
  };

  useEffect(() => {
    if (deleteImageSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: deleteImageSelector?.data?.message,
      });
      setIsModalOpen(false);
      setOpenImage(false);
      dispatch(deleteImageAction.deleteImageReset());
    }
  }, [deleteImageSelector]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-Hidden");
    } else {
      document.body.classList.remove("overflow-Hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-Hidden");
    };
  }, [isModalOpen]);

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (activeTab) {
      let payload = {
        page: 1,
        limit: 10,
        imageCategoryType: activeTab,
      };
      dispatch(galleryListHandler(payload));
    }
  }, [activeTab, addImageDataSelector, deleteImageSelector]);

  return (
    <>
      {(galleryListSelector?.isLoading || deleteImageSelector?.isLoading) && (
        <Loader />
      )}
      <div className="w-100">
        <div className="imgGrid mb-20">
          {galleryListSelector?.data?.data?.records?.length > 0 ? (
            <>
              {galleryListSelector?.data?.data?.records?.map((item, index) => (
                <div key={index}>
                  <img
                    src={item?.imageUrl}
                    alt={`Gallery item ${index + 1}`}
                    className="w-100 h-100"
                    onClick={() => {
                      if (activeTab === "Merchant Upload") {
                        openModal(item, index);
                      }
                    }}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="noDataFound">No data available</div>
          )}
        </div>
        {galleryListSelector?.data?.data?.records?.length > 8 && (
          <div className="viewMoreBtn">View More</div>
        )}

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-content p20"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className=" d-flex justify-between align-center">
                <div className="fs-18 fw-700">Image Details </div>
                <div className="closeSidebar" onClick={closeModal}>
                  <img src={closeRightSidebar} alt="closeRightSidebar" />
                </div>
              </div>
              <div className="divider2"></div>
              <div className="image-details">
                <div className="image-preview mb-20">
                  <img
                    // src={images[selectedIndex]}
                    src={selectedItem?.imageUrl}
                    alt={selectedItem?.title}
                    className="w-100 h-100"
                  />
                </div>
                <div className="details">
                  {/* <div className="mb-10 fs-20 fw-700">
                    {images[selectedIndex]}
                  </div> */}
                  <div className="d-flex align-center justify-between gap-10 fs-14 mb-10">
                    Uploaded by:{" "}
                    <span className="fw-500">
                      {selectedItem?.createdBy?.displayName}
                    </span>{" "}
                  </div>
                  <div className="d-flex align-center justify-between gap-10 fs-14 ">
                    Date{" "}
                    <span className="fw-500">
                      {moment(selectedItem).fromNow()}
                    </span>{" "}
                  </div>
                  <div className="divider2 my-16"></div>
                  <div className="mb-30">
                    <div className="custom-checkbox">
                      <label className="checkLabel">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Mark as Special
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={deleteImage}
                    className="btn deleteBtnfull w-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <button onClick={prevImage} className="nav-btn prev-btn">
                <img src={dropdownArrow} alt="" />
              </button>
              {/* <img
              src={images[selectedIndex]}
              alt="Selected"
              className="modal-image"
            /> */}
              <button onClick={nextImage} className="nav-btn next-btn">
                <img src={dropdownArrow} alt="" />
              </button>
              {/* <button onClick={closeModal} className="close-btn">
            <img src={deleteList} alt="" />
            </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
