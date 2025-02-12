import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import uploadsupllierImage from "../../../../assets/images/uploadsupllierImage.svg";

const SupplierDetails = ({ isOpen, toggleDetails }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG and PNG formats are allowed.");
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size must not exceed 5MB.");
        return;
      }

      // Read and set image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {isOpen && <div className="overlay2" onClick={toggleDetails}></div>}

      <div className={`rightSidebar rightSidebar2 ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Add Supplier</div>
          <div className="closeSidebar" onClick={toggleDetails}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowCart2 overflowCart">
          <div className="fs-14 mb-10 fw-500">Supplier logo</div>

          {imagePreview ? (
            <div className="brandImagePromo mb-10">
              <img src={imagePreview} alt="Uploaded Preview" />
            </div>
          ) : (
            <>
              <label className="uploadImage cursor-pointer mb-10">
                <input
                  type="file"
                  className="d-none"
                  onChange={handleImageUpload}
                />
                <div className="text-center">
                  <img
                    src={uploadsupllierImage}
                    alt="Upload Preview"
                    className="mb-20 uploadsupllierImage"
                  />
                  <div className="fs-14">
                    Drag & drop files or{" "}
                    <u className="fw-700 pc">Choose File</u>
                  </div>
                </div>
              </label>

              <div className="d-flex align-center justify-between fs-12">
                <div>Supported formats: JPEG, PNG</div>
                <div>Maximum Size: 5MB</div>
              </div>
            </>
          )}
          <div className="divider2"></div>
          <div className="mb-40">
            <div className="mb-20">
              <label htmlFor="" className="fs-14 fw-500 mb-10">
              Supplier name
              </label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="mb-20">
              <label htmlFor="" className="fs-14 fw-500 mb-10">
              Contact name
              </label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="mb-20">
              <label htmlFor="" className="fs-14 fw-500 mb-10">
              Contact position
              </label>
              <input type="text" placeholder="Enter position" />
            </div>
            <div className="mb-20">
              <label htmlFor="" className="fs-14 fw-500 mb-10">
              Contact email
              </label>
              <input type="text" placeholder="Enter email   " />
            </div>
            <div className="mb-20">
              <label htmlFor="" className="fs-14 fw-500 mb-10">
              Contact 
              </label>
              <input type="number" placeholder="Enter phone number" />
            </div>
          </div>
          <div className="btn" onClick={toggleDetails}>
          Add Supplier
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierDetails;
