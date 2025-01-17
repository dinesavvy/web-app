import React, { useState } from "react";
import coke from "../../../assets/images/coke.svg";
import pepsi from "../../../assets/images/pepsi.svg";
import Draggable from "react-draggable";

const AddPromotion = () => {
  const [brands, setBrands] = useState([
    { id: 1, src: coke, alt: "Coke" },
    { id: 2, src: pepsi, alt: "Pepsi" },
    { id: 3, src: coke, alt: "Sprite" },
    { id: 4, src: pepsi, alt: "Fanta" },
  ]);

  const [selectedItems, setSelectedItems] = useState([]); // Tracks selected items
  const [droppedItems, setDroppedItems] = useState([]); // Tracks dropped items

  // Toggle selection of a brandItem
  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle drag start
  const handleDragStart = (e) => {
    const selectedBrands = brands.filter((brand) =>
      selectedItems.includes(brand.id)
    );
    e.dataTransfer.setData("selectedBrands", JSON.stringify(selectedBrands));
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("selectedBrands");

    if (!data) {
      console.error("No data found in drag event");
      return;
    }

    try {
      const draggedItems = JSON.parse(data);

      // Add dropped items to the new container without removing them from the original list
      setDroppedItems((prev) => {
        const newItems = draggedItems.filter(
          (item) => !prev.some((droppedItem) => droppedItem.id === item.id)
        );
        return [...prev, ...newItems];
      });
      setSelectedItems([]); // Clear selection
    } catch (error) {
      console.error("Failed to parse drag data:", error);
    }
  };

  return (
   <>
     <div className="dashboard">
      <div className="d-flex gap-20">
        {/* Brands List */}
        <div className="w-100">
          <div className="mb-20">
            <div className="padding20">
              <div className="d-flex justify-between align-center">
                <div className="fs-18 fw-700">Brands</div>
              </div>
            </div>
            <div className="paddingb20">
              <div className="selectGrid3">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className={`brandItem ${
                      selectedItems.includes(brand.id) ? "selected" : ""
                    }`}
                    draggable={
                      selectedItems.length > 0 &&
                      selectedItems.includes(brand.id)
                    }
                    onClick={() => handleSelect(brand.id)} // Toggle selection
                    onDragStart={handleDragStart}
                  >
                    <img src={brand.src} alt={brand.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Draggable>
            <div>I can now be moved around!1</div>
          </Draggable>
          <Draggable>
            <div>I can now be moved around!2</div>
          </Draggable>
        </div>

        {/* Drop Area */}
        <div className="w-100">
          <div className="tabPadding">
            <div className="fs-18 fw-700">Add Brand</div>
            <div className="divider2"></div>
            <div
              className={droppedItems.length ? "addedThing" : "addThing"}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {droppedItems.length > 0 ? (
                droppedItems.map((item) => (
                  <div key={item.id} className="brandItem">
                    <img src={item.src} alt={item.alt} />
                  </div>
                ))
              ) : (
                <p>Drop brands here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default AddPromotion;
