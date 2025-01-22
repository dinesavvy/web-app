import React from "react";
import { useDragLayer } from "react-dnd";

const CustomDragLayer = ({ merchants }) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const { ids = [] } = item;

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: currentOffset.y,
        left: currentOffset.x,
        transform: "translate(50%, 50%)",
      }}
      className="custom-drag-preview"
    >
      {ids.map((id, index) => (
      
         <div
         key={id}
         className="custom-drag-item d-flex gap-20"
         style={{
           top: `${index * 25}px`,
           left: `${index * 25}px`,
           transform: "translate(300px, 0)",
           boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.08)",
           border: "1px solid rgba(0, 0, 0, 0.08)",
           background: "white",
           padding: "16px",
           borderRadius: "8px",
           overflow: "hidden",
           zIndex:5,
         }}
       >
         <div className="brandItem mx167 w-100">
         <img
            src={merchants.find((merchant) => merchant.id === id)?.name}
            alt={`Merchant ${id}`}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "none",
            }}
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
      ))}
    </div>
    
  );
};

export default CustomDragLayer;
