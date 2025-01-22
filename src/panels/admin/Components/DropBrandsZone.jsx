import React from "react";
import { useDrop, useDragLayer } from "react-dnd";
import addPlusIcon from "../../../assets/images/addPlusIcon.svg";

const DropBrandsZone = ({ onDropBrand, allowedType }) => {
  const [{ isOverBrandZone }, drop] = useDrop({
    accept: allowedType, // Accept items of the allowed type
    drop: (draggedItem) => {
      onDropBrand(draggedItem); // Handle drop when a brand item is dropped
    },
    collect: (monitor) => ({
      isOverBrandZone: monitor.isOver(), // Track if item is over the drop zone
    }),
  });

  const { itemType, isDragging } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }));

  // Only highlight the zone if the dragged item is of type "BRAND" and it's either being dragged or over the zone
  const highlightClass =
    (itemType === "brand" && isOverBrandZone) || (itemType === "brand" && isDragging) 
      ? "highlight"
      : "";

  return (
    <>
      <div ref={drop} className={`addThing ${highlightClass}`}>
        <img src={addPlusIcon} alt="addPlusIcon" />
      </div>
      <div className="fs-14 text-center threeSpace">
        Drag & Drop Brand from the left panel
      </div>
    </>
  );
};

export default DropBrandsZone;
