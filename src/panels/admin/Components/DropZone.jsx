import React from "react";
import { useDrop } from "react-dnd";
import addPlusIcon from "../../../assets/images/addPlusIcon.svg";
const DropZone = ({ onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => {
      onDrop(item); // Notify the parent about the dropped item
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
   <>
     <div ref={drop} className=" addThing">
      <img src={addPlusIcon} alt="addPlusIcon" />
    </div>
    <div className="fs-14 text-center threeSpace">
    Drag & Drop Brand from the left panel
    </div>
   </>
  );
};

export default DropZone;
