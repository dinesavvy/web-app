import React from "react";
import { useDrag } from "react-dnd";

const DragMerchantItem = ({ id, name, selectedMerchants, onClick }) => {
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
          src={name}
          alt={`Brand ${id}`}
          onDragStart={handleDragStart}
          draggable="true"
        />
      </div>
      <div className="fs-14">
        <div className="d-flex gap-4 mb-10">
          <div className="w-80">Nudges:</div>
          <div className="fw-700">256</div>
        </div>
        <div className="d-flex gap-4 mb-10">
          <div className="w-80">Promotion:</div>
          <div className="fw-700">10</div>
        </div>
        <div className="d-flex gap-4 mb-10">
          <div className="w-80">Promotion:</div>
          <div className="fw-700">10</div>
        </div>
        <div className="d-flex gap-4 ">
          <div className="w-80">Location:</div>
          <div className="fw-700">123 Maple St, Springfield, IL</div>
        </div>
      </div>
    </div>
  );
};

export default DragMerchantItem;
