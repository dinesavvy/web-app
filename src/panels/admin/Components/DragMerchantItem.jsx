import React from "react";
import { useDrag } from "react-dnd";
import noImageFound from "../../../assets/images/noImageFound.png";


const DragMerchantItem = ({ id, name, selectedMerchants, onClick, item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "merchant",
    item: { ids: selectedMerchants.length > 0 ? selectedMerchants : [id] }, // Include either selected items or just the dragged item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleDragStart = (event) => {
    // Create a blank image to use as the drag image
    const blankImage = new Image();
    event.dataTransfer.setDragImage(blankImage, 0, 0);
  };

  return (
    <div
      className="d-flex gap-20"
      ref={drag}
      onClick={onClick} // Click handler is now inside DragMerchantItem
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div className="brandItem mx167">
        <img
          // src={name?.imageUrl?.[0]}
          src={noImageFound}
          alt={`Brand ${id}`}
          onDragStart={handleDragStart}
          draggable="true"
        />
      </div>
      <div className="fs-14">
        <div className="d-flex gap-4 mb-10">
          <div className="w-80">Followers:</div>
          <div className="fw-700">{item?.followerCount}</div>
        </div>
        <div className="d-flex gap-4 mb-10">
          <div className="w-80">Promotions:</div>
          <div className="fw-700">10</div>
        </div>
        <div className="d-flex gap-4 mb-10">
          <div className="w-80">Avg Redm:</div>
          <div className="fw-700">11%</div>
        </div>
        <div className="d-flex gap-4 ">
          <div className="w-80">Location:</div>
          <div className="fw-700">
            {[
              item?.address?.addressLine1,
              item?.address?.administrativeDistrictLevel1,
              item?.address?.locality,
              item?.address?.postalCode,
            ]
              .filter((part) => part) // Filter out undefined or empty values
              .join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragMerchantItem;
