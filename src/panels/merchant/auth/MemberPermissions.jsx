import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import {
  businessRoleUpdateAction,
  businessRoleUpdateHandler,
} from "../../../redux/action/businessAction/businessRoleUpdate";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../common/CommonMessage";

const MemberPermissions = ({
  isMemberPermissions,
  setIsMemberPermissions,
  toggleMemberPermissions,
  rolesItems,
}) => {
  const dispatch = useDispatch();
  const messageApi = useCommonMessage();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const businessRoleUpdateSelector = useSelector(
    (state) => state?.businessRoleUpdate
  );

  useEffect(() => {
    if (rolesItems && rolesItems?.permissions) {
      const filteredPermissions = Object.entries(rolesItems?.permissions)
        .filter(([key, value]) => value === 2 || value === 1)
        .map(([key, value]) => ({ key, value }));
      setSelectedPermissions(filteredPermissions);
    }
  }, [rolesItems]);

  const handleCheckboxChange = (key) => {
    setSelectedPermissions((prevState) => {
      const permissionIndex = prevState.findIndex((perm) => perm.key === key);

      if (permissionIndex === -1) {
        return [...prevState, { key, value: 2 }];
      } else {
        const updatedPermissions = [...prevState];
        updatedPermissions[permissionIndex] = {
          ...updatedPermissions[permissionIndex],
          value: updatedPermissions[permissionIndex].value === 2 ? 1 : 2,
        };
        return updatedPermissions;
      }
    });
  };

  const handleUpdateClick = () => {
    const updatedPermissions = { ...rolesItems?.permissions };

    selectedPermissions.forEach(({ key, value }) => {
      updatedPermissions[key] = value;
    });

    const payload = {
      businessRoleId: rolesItems?._id,
      permissions: updatedPermissions,
    };

    dispatch(businessRoleUpdateHandler(payload));
  };

  useEffect(() => {
    if (businessRoleUpdateSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: businessRoleUpdateSelector?.data?.message,
      });
      setIsMemberPermissions(false);
      dispatch(businessRoleUpdateAction.businessRoleUpdateReset());
    } else if (businessRoleUpdateSelector?.message) {
      messageApi.open({
        type: "error",
        content: businessRoleUpdateSelector?.message,
      });
      dispatch(businessRoleUpdateAction.businessRoleUpdateReset());
    }
  }, [businessRoleUpdateSelector]);

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
              const permissionTitles = {
                editSettings: "Edit Settings",
                deleteUsers: "Delete Users",
                editAccount: "Edit account",
                addTeamMembers: "Add Team members",
                editRoles: "Edit Roles",
                editGallery: "Edit Gallery",
                viewAnalytics: "Analytics",
                editGoals: "Edit Goals",
                editMetrics: "Edit Metrics",
                viewFollowers: "View Followers",
                addFollowers: "Add Followers",
                sendNudges: "Send Nudges",
                sendTriggers: "Send Triggers",
                // Add more mappings as needed
              };

              return (
                <label
                  className="selectPermission mb-12 fs-14"
                  key={permission?.key}
                >
                  {/* {permission?.key}  */}
                  {permissionTitles[permission?.key] || permission?.key}
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
