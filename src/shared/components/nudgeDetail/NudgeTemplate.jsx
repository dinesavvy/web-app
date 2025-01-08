import React, { useEffect, useState } from "react";
import backButton from "../../../assets/images/backButton.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import templateImage from "../../../assets/images/templateImage.png";
import dish from "../../../assets/images/dish.png";
import NudgeCart from "./NudgeCart";

const NudgeTemplate = () => {
     const [isCartOpen, setIsCartOpen] = useState(false);
    
      useEffect(() => {
        if (isCartOpen) {
          document.body.classList.add("overflow-Hidden");
        } else {
          document.body.classList.remove("overflow-Hidden");
        }
    
        // Cleanup on component unmount
        return () => {
          document.body.classList.remove("overflow-Hidden");
        };
      }, [isCartOpen]);
      const toggleCart = () => {
        setIsCartOpen((prevState) => !prevState);
      };


  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-20">
          <div className="d-flex align-center gap-20 mb-30 w-100">
            <img src={backButton} alt="backButton" className="cursor-pointer" />
            <div>
              <div className="fs-24 fw-600">Nudges Template</div>
            </div>
          </div>
          <div className="templateGrid">
            <div className="templateImage">
              <img src={templateImage} alt="" />
              <div className="fs-18 fw-600 absoluteTemplateText">
                Free drink
              </div>
            </div>
            <div className="templateImage">
              <img src={templateImage} alt="" />
              <div className="fs-18 fw-600 absoluteTemplateText">
                Free drink
              </div>
            </div>
            <div className="templateImage">
              <img src={templateImage} alt="" />
              <div className="fs-18 fw-600 absoluteTemplateText">
                Free drink
              </div>
            </div>
            <div className="templateImage">
              <img src={templateImage} alt="" />
              <div className="fs-18 fw-600 absoluteTemplateText">
                Free drink
              </div>
            </div>
            <div className="templateImage">
              <img src={templateImage} alt="" />
              <div className="fs-18 fw-600 absoluteTemplateText">
                Free drink
              </div>
            </div>
            <div className="templateImage">
              <img src={templateImage} alt="" />
              <div className="fs-18 fw-600 absoluteTemplateText">
                Free drink
              </div>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="fs-24 fw-600">Nudges Template</div>
          <div className="divider"></div>
          <div className="d-flex align-end gap-16 mb-20 flexWrapsm">
            <div className="reflectImage">
              <img src={templateImage} alt="" />
            </div>
            <div className="btn w240">Change Photo</div>
          </div>
          <div className="inputGrid gap-20">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Title
              </label>
              <input type="text" placeholder="Free appetizer" />
            </div>
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
                Description
              </label>
              <input
                type="text"
                placeholder="Free appetizer on Happy Hours! From 07:00 PM to 08:00 PM"
              />
            </div>
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="d-flex justify-between align-center gap-20 w-100">
            <div>
              <div className="fs-20 fw-600 mb-10">Select your audience</div>
              <div className="fs-16 darkBlack">
                By default all your followers will be sent this Nudge.
              </div>
            </div>
            <div>
              <img src={arrowRight} alt="arrowRight" />
            </div>
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="d-flex align-center justify-between gap-20">
            <div className="fs-20 fw-700">Total</div>
            <div className="fs-16 darkBlack">$99.99</div>
          </div>
        </div>
        <div className="tabPadding mb-40">
          <div className="fs-20 fw-700 mb-20">Preview</div>
          <div className="d-flex gap-12">
            <div className="image80">
              <img src={dish} alt="dish" />
            </div>
           <div>
           <div className="fs-20 fw-600">
            Free drink
            </div>
            <div className="fs-14">
            Free drink on Happy Hours! From <br /> 07:00 PM to 08:00 PM
            </div>
           </div>
          </div>
        </div>
        <div className="d-flex justify-end">
            <div className="btn w164 " onClick={toggleCart}>
                Add to Cart
            </div>
        </div>
      </div>
      <NudgeCart isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default NudgeTemplate;
