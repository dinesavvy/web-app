import React from "react";
import { useDrop, useDragLayer } from "react-dnd";
import addPlusIcon from "../../../assets/images/addPlusIcon.svg";

const DropMerchantZone = ({ onDropMerchant, allowedType }) => {
  const [{ isOverMerchantZone }, drop] = useDrop({
    accept: allowedType, // Accept items of the allowed type
    drop: (draggedItem) => {
      onDropMerchant(draggedItem); // Handle drop when a merchant item is dropped
    },
    collect: (monitor) => ({
      isOverMerchantZone: monitor.isOver(), // Track if item is over the drop zone
    }),
  });

  const { itemType, isDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  // Only highlight the zone if the dragged item is of type "MERCHANT" and it's either being dragged or over the zone
  const highlightClass =
    (itemType === "merchant" && isOverMerchantZone) || (itemType === "merchant" && isDragging) 
      ? "highlight"
      : "";

  return (
    <>
      <div ref={drop} className={`addThing ${highlightClass}`}>
        <img src={addPlusIcon} alt="addPlusIcon" />
      </div>
      <div className="fs-14 text-center threeSpace">
        Drag & Drop a Merchant from the left panel
      </div>
    </>
  );
};

export default DropMerchantZone;
