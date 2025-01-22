import React, { useState } from "react";
import coke from "../../../assets/images/coke.svg";
import pepsi from "../../../assets/images/pepsi.svg";
import searchIcon from "../../../assets/images/searchIcon.svg";
import addPlusIcon from "../../../assets/images/addPlusIcon.svg";
import datePicker from "../../../assets/images/datePicker.svg";
import closeIcon from "../../../assets/images/closeIcon.svg";
import arrow from "../../../assets/images/arrow-up.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragMerchantItem from "./DragMerchantItem";
import DropMerchantZone from "./DropMerchantZone";
import { TimePicker } from "antd";
import DropBrandsZone from "./DropBrandsZone";
import DragBrandsItem from "./DragBrandsItem";

const AddPromotion = () => {
  const [mercahnts, setMercahnts] = useState([
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
  const [droppedMerchants, setDroppedMerchants] = useState([]);
  const [selectedMerchants, setSelectedMerchants] = useState([]);

  const handleCheckboxChange = (itemId) => {
    setSelectedMerchants((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleRemoveDroppedMerchants = (id) => {
    const removedItem = droppedMerchants.find((item) => item.id === id);
    setDroppedMerchants((prevDroppedMerchants) =>
      prevDroppedMerchants.filter((item) => item.id !== id)
    );
    setMercahnts((prevMercahnts) => [...prevMercahnts, removedItem]);
  };

  const handleDragStart2 = (item) => {
    console.log("Dragging Item:", item);
    console.log("Selected Items:", selectedMerchants);
  };

  const handleDrop2 = (draggedItem) => {
    const draggedIds = draggedItem.ids || [];
    const draggedItems = mercahnts.filter((item) =>
      draggedIds.includes(item.id)
    );

    // Remove dropped items from the available list
    setMercahnts((prevMercahnts) =>
      prevMercahnts.filter((item) => !draggedIds.includes(item.id))
    );

    // Add the dragged items to the drop zone
    setDroppedMerchants((prevDropped) => [...prevDropped, ...draggedItems]);

    // Clear selected items
    setSelectedMerchants([]);
  };



  // Brands


 const [brands, setBrands] = useState([
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
  const [droppedBrand, setDroppedBrand] = useState(null);

  const handleBrandDrop = (item) => {
    // Remove the item from the list and add it to the drop zone
    setBrands((prevBrands) => prevBrands.filter((i) => i.id !== item.id));
    setDroppedBrand(item);
  };

  const handleBrandClick = (item) => {
    // Same behavior as drop: remove from list and add to drop zone
    setBrands((prevBrands) => prevBrands.filter((i) => i.id !== item.id));
    setDroppedBrand(item);
  };
  const handleDragStart = (item) => {
    console.log(`Dragging item: ${item.name}`);
  };
  const handleRemoveBrand = () => {
    if (droppedBrand) {
      // Return the dropped item back to the list
      setBrands((prevBrands) => [...prevBrands, droppedBrand]);
      setDroppedBrand(null);
    }
  };



  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };
  const accordionItems = [
    {
      title: "Accordion 1",
      content: "This is the content for accordion 1.",
    },
    {
      title: "Accordion 2",
      content: "This is the content for accordion 2.",
    },
    {
      title: "Accordion 3",
      content: "This is the content for accordion 3.",
    },
  ];
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
                    {brands.map((item) => (
                      <>
                        <div
                          key={item.id}
                          onClick={() => handleBrandClick(item)}
                          style={{ cursor: "pointer" }}
                        >
                          <DragBrandsItem
                            id={item.id}
                            name={item.name}
                            selectedBrands={setDroppedBrand} 
                            onDragStart={() => handleDragStart(item)}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-20">
                <div className="padding20">
                  <div className="d-flex justify-between align-center gap-10">
                    <div className="fs-18 fw-700">Merchants</div>
                    <div className="d-flex  align-center gap-16">
                      <div className="lineSearch w-100">
                        <input type="text" placeholder="Search Merchants" />
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
                <div className="tabs-container tab3 tabFull">
                    <div className="tabs">
                      <button className="tab-button active">Merchants</button>
                      <button className="tab-button ">Groups</button>
                    </div>
                  </div>
                  <div className="selectGrid3">
                    {mercahnts.map((item) => (
                      <div key={item.id} style={{ cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={selectedMerchants.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <DragMerchantItem
                          id={item.id}
                          name={item.name}
                          selectedMerchants={selectedMerchants} // Pass selected items
                          onDragStart={() => handleDragStart2(item)}
                        />
                      </div>
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
                  {!droppedBrand && <DropBrandsZone onDrop={handleBrandDrop} />}
                  {droppedBrand && (
                    <div className="brandItem">
                      <img src={droppedBrand.name} alt={droppedBrand.name} />
                      <div onClick={handleRemoveBrand} className="closeIcon">
                        <img src={closeIcon} alt="Remove" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-18 fw-700">Add Merchants</div>
                <div className="divider2"></div>
                <div className="selectGrid3">
                  <DropMerchantZone onDrop={handleDrop2} />
                  {droppedMerchants.map((item) => (
                    <div key={item.id} className="brandItem">
                      <img src={item.name} alt={item.name} />
                      <div
                        onClick={() => handleRemoveDroppedMerchants(item.id)}
                        className="closeIcon"
                      >
                        <img src={closeIcon} alt="Remove" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tabPadding mb-20">
                <div className="fs-18 fw-700"> Promotion timeframe</div>
                <div className="divider2"></div>
                <div className=" d-flex align-end gap-10">
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
              <div className="accordion-container">
                <div className="accordionItem accordion-item">
                  <div className={`accordionHeader fs-18 fw-700 `}>
                    <div>Merchant</div>
                  </div>
                  <div className="accordion-content">
                    <div className="d-flex gap-20">
                      <div className="brandItem mx167">
                        <img src={coke} alt="" />
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
                        <div className="d-flex gap-4 ">
                          <div className="w-80">Location:</div>
                          <div className="fw-700">
                            123 Maple St, Springfield, IL
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="divider2"></div>
                    <div className="grid2 gap-1020">
                      <div>
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          Quantity/Nudge Credits
                        </label>
                        <input type="text" placeholder="Enter Quantity" />
                      </div>
                      <div>
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          Promotional Funds
                        </label>
                        <input type="text" placeholder="Enter Amount" />
                      </div>
                      <div>
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          MSRP
                        </label>
                        <input type="text" placeholder="Enter Price" />
                      </div>
                      <div>
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          Price for Reimbursement
                        </label>
                        <input type="text" placeholder="Enter Price" />
                      </div>
                      <div>
                        <label htmlFor="" className="fs-14 fw-500 mb-10">
                          Fund Amount
                        </label>
                        <input type="text" placeholder="$1000" />
                      </div>
                    </div>
                  </div>
                </div>
                {accordionItems.map((item, index) => (
                  <div className="accordionItem accordion-item" key={index}>
                    <div
                      className={`accordionHeader fs-18 fw-700 ${
                        openIndex === index ? "open" : ""
                      }`}
                      onClick={() => handleToggle(index)}
                    >
                      <div>{item.title}</div>
                      <img
                        src={arrow}
                        alt=""
                        className={`arrow ${openIndex === index ? "open" : ""}`}
                      />
                    </div>
                    {openIndex === index && (
                      <div className="accordion-content">
                        <div className="d-flex gap-20">
                          <div className="brandItem mx167">
                            <img src={coke} alt="" />
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
                            <div className="d-flex gap-4 ">
                              <div className="w-80">Location:</div>
                              <div className="fw-700">
                                123 Maple St, Springfield, IL
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="divider2"></div>
                        <div className="grid2 gap-1020">
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Quantity/Nudge Credits
                            </label>
                            <input type="text" placeholder="Enter Quantity" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Promotional Funds
                            </label>
                            <input type="text" placeholder="Enter Amount" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              MSRP
                            </label>
                            <input type="text" placeholder="Enter Price" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Price for Reimbursement
                            </label>
                            <input type="text" placeholder="Enter Price" />
                          </div>
                          <div>
                            <label htmlFor="" className="fs-14 fw-500 mb-10">
                              Fund Amount
                            </label>
                            <input type="text" placeholder="$1000" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default AddPromotion;
