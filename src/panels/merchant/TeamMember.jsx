import { Breadcrumb } from "antd";
import React, { useState } from "react";
import "./merchant.css";
import backButton from "../../assets/images/backButton.svg";
import editMember from "../../assets/images/editMember.svg";
import deleteMember from "../../assets/images/deleteMember.svg";
import breadCrumbIcon from "../../assets/images/breadCrumb.svg";
import deleteModal from "../../assets/images/deleteModal.svg";
import CommonModal from "../../shared/components/CommonModal";
import { useNavigate } from "react-router-dom";

const TeamMember = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const navigate = useNavigate()
  return (
    <>
      <div className="dashboard">
        <div className="tabPadding">
          <div className="d-flex align-center gap-20 mb-20 w-100">
            <img src={backButton} alt="backButton" className="cursor-pointer" />
            <div>
              <div className="fs-24 fw-600 mb-4">Team Members</div>
              <Breadcrumb
                separator={<img src={breadCrumbIcon} />}
                items={[
                  {
                    title: "Merchants",
                  },
                  {
                    title: "Team Members",
                  },
                ]}
              />
            </div>
          </div>
          <div className="merchantGrid ">
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="d-flex align-center gap-12">
                <div className="initialName">dr</div>
                <div>
                  <div className="fw-700">Dianne Russell</div>
                  <div className="fs-14 fw-300 o5">June, 2024</div>
                </div>
              </div>
              <div className="divider2"></div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-10">
                <div className="">
                Followers added:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex justify-between align-center gap-12 fs-14 mb-20">
                <div className="">
                Nudges sent:
                </div>
                <div className=" fw-500">32</div>
              </div>
              <div className="d-flex align-center gap-10">
                <div className="btn btnSecondary w-100 gap-8" onClick={()=>navigate("/merchant/edit-member")}>
                    <img src={editMember} alt="" />
                Edit
                </div>
                <div className="deleteBtn btn" onClick={() => setModal2Open(true)}>
                    <img src={deleteMember} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <CommonModal modal2Open={modal2Open} setModal2Open={setModal2Open} modalImage={deleteModal}/>
    </>
  );
};

export default TeamMember;
