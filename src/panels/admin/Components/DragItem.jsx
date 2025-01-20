
import React from 'react';
import { useDrag } from 'react-dnd';
import coke from "../../../assets/images/coke.svg";
import pepsi from "../../../assets/images/pepsi.svg";

const DragItem = ({ id, name, onDragStart }) => {
  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id, name }, // Pass the item's data
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="brandItem"
      onMouseDown={() => onDragStart({ id, name })}
    >
      <img src={name} alt="" />
    </div>
  );
};

export default DragItem;