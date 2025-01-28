import React from 'react'
import pdfIcon from "../../../assets/images/pdfIcon.svg";
import btnArrow from "../../../assets/images/btnArrow.svg";


const AccountInfoProfile = () => {
  return (
    <>
         <div className="inputGrid gap-20 mb-20">
            <div>
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Nudge credits
              </label>
              <input
                type="number"
                className="input"
                placeholder="100"
              />
            </div>
            <div className=" position-relative">
              <label htmlFor="name" className="grey mb-10 fs-16 fw-500">
              Date joined
              </label>
                <div className="input">22/06/2022</div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="d-flex align-center justify-end">
            <div className="btn gap-8 px16">
             <img src={pdfIcon} alt="" />Monthly reports <div className="lineBtn"></div> <img src={btnArrow} alt="" />
            </div>
          </div>
    </>
  )
}

export default AccountInfoProfile