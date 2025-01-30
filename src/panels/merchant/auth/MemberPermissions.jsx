import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import { businessRoleUpdateHandler } from "../../../redux/action/businessAction/businessRoleUpdate";
import { useDispatch } from "react-redux";

const MemberPermissions = ({
  isMemberPermissions,
  toggleMemberPermissions,
  rolesItems,
}) => {

  const dispatch = useDispatch();

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const getSelectedBusiness = JSON.parse(localStorage.getItem("selectedBusiness"));

  useEffect(() => {
    if (rolesItems && rolesItems.permissions) {
      // Filter permissions with value 2 or 1 (those with permission)
      const filteredPermissions = Object.entries(rolesItems.permissions)
        .filter(([key, value]) => value === 2 || value === 1) // Filter permissions with value 2 or 1
        .map(([key, value]) => ({ key, value }));

      setSelectedPermissions(filteredPermissions); // Set the filtered permissions as default selected
    }
  }, [rolesItems]);

  const handleCheckboxChange = (key) => {
    setSelectedPermissions((prevState) => {
      // Find the index of the permission in the selected permissions list
      const permissionIndex = prevState.findIndex((perm) => perm.key === key);

      if (permissionIndex === -1) {
        // If the permission is not in the list, add it (checked, value 2)
        return [...prevState, { key, value: 2 }];
      } else {
        // If the permission is already in the list, toggle its checked state
        const updatedPermissions = [...prevState];
        updatedPermissions[permissionIndex] = {
          ...updatedPermissions[permissionIndex],
          value: updatedPermissions[permissionIndex].value === 2 ? 1 : 2, // Toggle value between 2 (checked) and 1 (unchecked)
        };
        return updatedPermissions;
      }
    });
  };

  const handleUpdateClick = () => {
    // Update the rolesItems.permissions object with the selected permissions
    const updatedPermissions = { ...rolesItems.permissions };

    // Update only the permissions that were selected/changed
    selectedPermissions.forEach(({ key, value }) => {
      updatedPermissions[key] = value; // Set permission to value (2 for checked, 1 for unchecked)
    });

    const payload = {
      businessRoleId: rolesItems?._id, // Business ID
      permissions: updatedPermissions, // Permissions object with updated values
    };

    dispatch(businessRoleUpdateHandler(payload)); // Dispatch the updated permissions
  };


console.log(selectedPermissions,"selectedPermissions")


  return (
    <>
      {isMemberPermissions && (
        <div className="overlay2" onClick={toggleMemberPermissions}></div>
      )}

      {/* Sidebar */}
      <div className={`rightSidebar ${isMemberPermissions ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">{rolesItems?.title}</div>
          <div className="closeSidebar" onClick={toggleMemberPermissions}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar">
          <div className="fs-16 fw-600 mb-16">Select permissions</div>

          <div className="mb-40">
            {selectedPermissions?.map((permission) => {
              const isChecked = permission?.value === 2;
              // const permissionTitles = {
              //   addTeamMembers: "Add Team Members",
              //   editSettings: "Edit Settings", 
              //   deleteUsers: "Delete Users",
              //   // Add more mappings as needed
              // };
            
              return (
                <label
                  className="selectPermission mb-12 fs-14"
                  key={permission?.key}
                >
                  {permission?.key} 
                  {/* {permissionTitles[permission?.key] || permission?.key} */}
                  <div className="custom-checkbox">
                    <label className="checkLabel">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(permission?.key)} // Handle checkbox change
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </label>
              );
            })}
          </div>
          <div className="btn w-100 gap-8" onClick={handleUpdateClick}>
            Update
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberPermissions;
