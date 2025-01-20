import React, { useState } from "react";
import coke from "../../../assets/images/coke.svg";
import pepsi from "../../../assets/images/pepsi.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import addPlusIcon from "../../../assets/images/addPlusIcon.svg";
import datePicker from "../../../assets/images/datePicker.svg";
import closeIcon from "../../../assets/images/closeIcon.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./DragItem";
import DropZone from "./DropZone";
import { TimePicker } from "antd";

const AddPromotion = () => {
  const [items, setItems] = useState([
    { id: 1, name: coke },
    { id: 2, name: pepsi },
    { id: 3, name: coke },
    { id: 4, name: pepsi },
    { id: 5, name: coke },
    { id: 6, name: pepsi },
    { id: 7, name: coke },
    { id: 8, name: pepsi },
    { id: 9, name: coke },
    { id: 10, name: pepsi },
    { id: 11, name: coke },
    { id: 12, name: pepsi },
    { id: 13, name: coke },
    { id: 14, name: pepsi },
    { id: 15, name: coke },
    { id: 16, name: pepsi },
  ]);
  const [droppedItem, setDroppedItem] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = (index) => {
    // setOpenIndex(openIndex === index ? null : index); // Toggle the clicked panel
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDragStart = (item) => {
    console.log(`Dragging item: ${item.name}`);
  };

  const handleDrop = (item) => {
    // Remove the item from the list and add it to the drop zone
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setDroppedItem(item);
  };

  const handleRemoveItem = () => {
    if (droppedItem) {
      // Return the dropped item back to the list
      setItems((prevItems) => [...prevItems, droppedItem]);
      setDroppedItem(null);
    }
  };

  return (
    <>
      <div className="dashboard">
        <DndProvider backend={HTML5Backend}>
          <div className="d-flex gap-20">
            {/* Brands List */}
            <div className="w-100">
              <div className="mb-20">
                <div className="padding20">
                  <div className="d-flex justify-between align-center gap-10">
                    <div className="fs-18 fw-700">Brands</div>
                    <div className="d-flex  align-center gap-16">
                      <div className="lineSearch w-100">
                        <input type="text" placeholder="Search Brands" />
                        <img
                          src={searchIcon}
                          alt=""
                          className="absoluteImage"
                        />
                      </div>
                      <div className="btn btnSecondary addPlus">
                        <img src={addPlusIcon} alt="addPlusIcon" />
                        Add
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paddingb20">
                  <div className="selectGrid3">
                    {items.map((item) => (
                      <DragItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        onDragStart={() => handleDragStart(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drop Area */}
            <div className="w-100">
              <div className="tabPadding mb-20">
                <input
                  type="text"
                  name="addTitleInput"
                  id="addTitleInput"
                  className="addTitleInput"
                  placeholder="Add promotion title here"
                />
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-18 fw-700">Add Brand</div>
                <div className="divider2"></div>
                <div className="selectGrid3">
                  {!droppedItem && <DropZone onDrop={handleDrop} />}
                  {droppedItem && (
                    <div className="brandItem">
                      <img src={droppedItem.name} alt={droppedItem.name} />
                      <div onClick={handleRemoveItem} className="closeIcon">
                        <img src={closeIcon} alt="" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="mt-10 d-flex align-end gap-10">
                  <div className="w-100">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      From
                    </label>
                    <div className="position-relative">
                      <TimePicker className="customTime input" />
                      <img
                        src={datePicker}
                        alt="datePicker"
                        className="datePickerImg"
                      />
                    </div>
                  </div>
                  <div className="w-100">
                    <label htmlFor="" className="fs-14 fw-500 mb-10">
                      to
                    </label>
                    <div className="position-relative">
                      <TimePicker className="customTime input" />
                      <img
                        src={datePicker}
                        alt="datePicker"
                        className="datePickerImg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion mb-20">
                <div className="accordion-item">
                  <div
                    className="accordion-header"
                    onClick={() => handleToggle(index)}
                  >
                    sdagfsdgfhg
                  </div>
                  {openIndex === index && (
                    <>
                      <div className="accordion-body">sdfdgf</div>
                    </>
                  )}
                  {/* {restaurantPerformance && <Test2 />} */}
                </div>
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default AddPromotion;
