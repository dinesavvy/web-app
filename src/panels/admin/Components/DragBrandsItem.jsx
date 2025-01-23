import React from "react";
import { useDrag } from "react-dnd";
import coke from "../../../assets/images/coke.svg";
import pepsi from "../../../assets/images/pepsi.svg";
import { Tooltip } from "react-tooltip";

const DragBrandsItem = ({ id, name, selectedBrands = [], onClick, info }) => {
  console.log("info", info);
  const [{ isDragging }, drag] = useDrag({
    type: "brand",
    item: { id, name, selectedBrands }, // Correctly pass the item data
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      <div
        ref={drag}
        onClick={onClick}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
        className="brandItem"
        data-tooltip-id={`brand-tooltip-${id}`}
      >
        {/* <img src={name} alt={`Brand ${id}`} /> */}
        <img src={name} alt={`Brand ${id}`} />
      </div>
      <Tooltip id={`brand-tooltip-${id}`} place="right-start">
        <div className="fs-12">
          <div className="color80 mb-4">Brand</div>
          <div className="fw-600 mb-16">{info?.name}</div>
          <div className="color80 mb-4">MSRP</div>
          <div className="fw-600 mb-16">{info?.price}</div>
          <div className="color80 mb-4">Description</div>
          <div className="fw-600 mb-16">{info?.description}</div>
          <div className="color80 mb-4">SKU</div>
          <div className="fw-600">{info?.sku}</div>
        </div>
      </Tooltip>
    </>
  );
};

export default DragBrandsItem;