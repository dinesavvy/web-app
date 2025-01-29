import React, { useEffect, useState } from "react";
import addCircle from "../../../assets/images/addCircle.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import MemberHierarchy from "./MemberHierarchy";
import MemberPermissions from "./MemberPermissions";

const Hierarchy = () => {
   const [isMemberHierarchy, setIsMemberHierarchy] = useState(false);
          const toggleMemberHierarchy = (item) => {
            setIsMemberHierarchy((prevState) => !prevState);
          };
          useEffect(() => {
            if (isMemberHierarchy) {
              document.body.classList.add("overflow-Hidden");
            } else {
              document.body.classList.remove("overflow-Hidden");
            }
        
            // Cleanup on component unmount
            return () => {
              document.body.classList.remove("overflow-Hidden");
            };
          }, [isMemberHierarchy]);
   const [isMemberPermissions, setIsMemberPermissions] = useState(false);
          const toggleMemberPermissions = (item) => {
            setIsMemberPermissions((prevState) => !prevState);
          };
          useEffect(() => {
            if (isMemberPermissions) {
              document.body.classList.add("overflow-Hidden");
            } else {
              document.body.classList.remove("overflow-Hidden");
            }
        
            // Cleanup on component unmount
            return () => {
              document.body.classList.remove("overflow-Hidden");
            };
          }, [isMemberPermissions]);
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-30">
          <div className="fs-24 fw-600">Hierarchy </div>

          <div className="divider2"></div>
          <div className="d-flex align-center gap-20 mb-20">
            <div className="profileImage">gh</div>
            <div>
              <div className="fs-24 fw-600 mb-10">Myles Leighton</div>
              <div className="positionTag fs-16 fw-600">Owner</div>
            </div>
          </div>
          <div className="d-flex align-center justify-between mb-20">
            <div className="fs-20 fw-600">My team</div>
            <div className="addCircle cursor-pointer">
              <img src={addCircle} alt="" />
            </div>
          </div>
          <div className="merchantGrid">
            <div className="myteamFlex" onClick={()=>toggleMemberHierarchy()}>
              <div className="d-flex align-center gap-8">
                <div class="initialName fs-16">dr</div>
                <div>
                  <div className="fs-16 ">John Cooper</div>
                  <div className="fs-14  grey">Manager</div>
                </div>
              </div>
              <div className="d-flex align-center gap-4">
                <div className="blueTag fs-14">Pending</div>
                <img src={arrowRight} alt="arrowRight" className="arrowRight" />
              </div>
            </div>
            <div className="myteamFlex">
              <div className="d-flex align-center gap-8">
                <div class="initialName fs-16">dr</div>
                <div>
                  <div className="fs-16 ">John Cooper</div>
                  <div className="fs-14  grey">Manager</div>
                </div>
              </div>
              <div className="d-flex align-center gap-4">
                
                <img src={arrowRight} alt="arrowRight" className="arrowRight" />
              </div>
            </div>
            <div className="myteamFlex">
              <div className="d-flex align-center gap-8">
                <div class="initialName fs-16">dr</div>
                <div>
                  <div className="fs-16 ">John Cooper</div>
                  <div className="fs-14  grey">Manager</div>
                </div>
              </div>
              <div className="d-flex align-center gap-4">
                
                <img src={arrowRight} alt="arrowRight" className="arrowRight" />
              </div>
            </div>
            <div className="myteamFlex">
              <div className="d-flex align-center gap-8">
                <div class="initialName fs-16">dr</div>
                <div>
                  <div className="fs-16 ">John Cooper</div>
                  <div className="fs-14  grey">Manager</div>
                </div>
              </div>
              <div className="d-flex align-center gap-4">
                <div className="blueTag fs-14">Pending</div>
                <img src={arrowRight} alt="arrowRight" className="arrowRight" />
              </div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="fs-20 fw-600 mb-20">My Roles</div>
          <div className="merchantGrid">
            <div className="myteamFlex" onClick={()=>toggleMemberPermissions()}>
              <div className="d-flex align-center gap-8">
                <div>
                  <div className="fs-16 ">Manager</div>
                </div>
              </div>
              <div className="d-flex align-center gap-4">
                <img src={arrowRight} alt="arrowRight" className="arrowRight" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MemberHierarchy
        isMemberHierarchy={isMemberHierarchy}
        toggleMemberHierarchy={toggleMemberHierarchy} />
      <MemberPermissions
        isMemberPermissions={isMemberPermissions}
        toggleMemberPermissions={toggleMemberPermissions} />
    </>
  );
};

export default Hierarchy;
