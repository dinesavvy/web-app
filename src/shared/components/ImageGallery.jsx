import React, { useEffect, useState } from "react";

import dropdownArrow from "../../assets/images/dropdownArrow.svg"
import deleteList from "../../assets/images/deleteList.svg"

const SliderGallery = ({images , openImage, setOpenImage}) => {
 
console.log(openImage, "imagesimages")
  const [isModalOpen, setIsModalOpen] = useState(openImage || false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index = 0) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };


  useEffect(() => {
    if(openImage){
        setSelectedIndex(0);
    setIsModalOpen(true);
    }
  },[openImage])
  const closeModal = () => {
    setIsModalOpen(false);
    setOpenImage(false);

  };

  const nextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="">
      <div className="imgGrid">
        {images.slice(0, 4).map((image, index) => (
            <div key={index}>
          <img
            
            src={image}
            alt={`Gallery item ${index + 1}`}
            className="w-100 h-100"
            onClick={() => openModal(index)}
          />
          </div>
        ))}
      </div>


      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button onClick={prevImage} className="nav-btn prev-btn">
             <img src={dropdownArrow} alt="" />
            </button>
            <img
              src={images[selectedIndex]}
              alt="Selected"
              className="modal-image"
            />
            <button onClick={nextImage} className="nav-btn next-btn">
            <img src={dropdownArrow} alt="" />
            </button>
            <button onClick={closeModal} className="close-btn">
            <img src={deleteList} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderGallery;