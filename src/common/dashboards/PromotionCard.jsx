import React from "react";
import PropTypes from "prop-types";

const PromotionCard = ({
  title = "Promotions",
  count = 0,
  chartPromotionImage,
  buttonText = "See promotions",
  onButtonClick,
  middleComponent,
}) => {
  return (
    <div className="card">
      <div className="d-flex gap-20">
        {chartPromotionImage && (
          <img src={chartPromotionImage} className="hchartImage" alt={title} />
        )}
        <div>
          <div className="fs-16">{title}</div>
          <div className="fs-26 fw-700">{count}</div>
        </div>
      </div>
      <div className="divider2"></div>
      <div className="mb-20">
        {/* <img src={chartImage} className="w-100" alt={`${title} chart`} /> */}
        {middleComponent}
      </div>

      <div className="btn" onClick={onButtonClick}>
        {buttonText}
      </div>
    </div>
  );
};

PromotionCard.propTypes = {
  title: PropTypes.string, // Title of the card
  count: PropTypes.number, // Numeric value to display
  chartPromotionImage: PropTypes.string, // URL or path to the promotion chart image
  buttonText: PropTypes.string, // Text to display on the button
  onButtonClick: PropTypes.func, // Callback function for button click
  labels: PropTypes.array,
  data: PropTypes.array,
  middleComponent: PropTypes.any,
};
export default PromotionCard;
