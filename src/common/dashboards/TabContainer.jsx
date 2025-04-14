import React from "react";
import PropTypes from "prop-types";
const TabContainer = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="h-100">
      <div className="tabs-container h-100">
        {/* Tab Buttons */}
        <div className="tabs mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab-panel  ${
                activeTab === tab.id ? "visible" : "hidden"
              }`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TabContainer.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabContainer;
