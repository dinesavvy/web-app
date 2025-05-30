import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SelectedItemChecker = () => {
  const { state } = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (state?.selectedItem) {
      setSelectedItem(state.selectedItem);
      checkSelectedItem(state.selectedItem);
    }
  }, [state?.selectedItem]);

  const checkSelectedItem = (item) => {
    if (!item) return;

    // Check if item matches the provided structure
    const hasValidStructure = 
      item._id &&
      typeof item.followerCount === 'number' &&
      typeof item.nudgeCount === 'number' &&
      item.customerPreferencesData &&
      item.userInfo;

    setIsSelected(hasValidStructure);

    if (hasValidStructure) {
      // Log specific details for verification
      // console.log('Selected Item Details:', {
      //   id: item._id,
      //   followerCount: item.followerCount,
      //   nudgeCount: item.nudgeCount,
      //   preferences: item.customerPreferencesData.personalPreference,
      //   userInfo: {
      //     displayName: item.userInfo.displayName,
      //     email: item.userInfo.email,
      //     status: item.userInfo.status
      //   }
      // });
    }
  };

  return (
    <div className="selected-item-checker">
      {selectedItem && (
        <div className="item-details">
          <h3>Selected Item Details</h3>
          <div className="detail-row">
            <span>ID:</span>
            <span>{selectedItem._id}</span>
          </div>
          <div className="detail-row">
            <span>Follower Count:</span>
            <span>{selectedItem.followerCount}</span>
          </div>
          <div className="detail-row">
            <span>Nudge Count:</span>
            <span>{selectedItem.nudgeCount}</span>
          </div>
          <div className="detail-row">
            <span>User Name:</span>
            <span>{selectedItem.userInfo?.displayName}</span>
          </div>
          <div className="detail-row">
            <span>Email:</span>
            <span>{selectedItem.userInfo?.email}</span>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <span>{selectedItem.userInfo?.status}</span>
          </div>
          <div className="detail-row">
            <span>Preferences:</span>
            <div className="preferences-list">
              {selectedItem.customerPreferencesData?.personalPreference?.map((pref, index) => (
                <span key={index} className="preference-tag">{pref}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedItemChecker; 