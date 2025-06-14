import React, { useEffect } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import apple from "../../../assets/images/apple.svg";
import google from "../../../assets/images/google.svg";
import restaurantCard from "../../../assets/images/restaurantCard.png";
import {
  createNudgeAction,
  createNudgeHandler,
} from "../../../redux/action/create-nudge";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import { useCommonMessage } from "../../../common/CommonMessage";
import { useNavigate } from "react-router-dom";

const NudgeCart = ({
  isOpen,
  toggleCart,
  uploadedImage,
  nudgesCards,
  values,
  state,
  fileuploadSelector,
  setIsCartOpen,
  selectedItems
}) => {
  const createNudgeSelector = useSelector((state) => state?.createNudge);
  const messageApi = useCommonMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendNudge = () => {
    let payload = {
      locationId: localStorage.getItem("merchantId"),
      title: values?.title,
      message: values?.description,
      isPublic: false,
      followerList:  selectedItems?.map(
        (item) => item?.userInfo?.customerId
      ),
      photoURL:
        nudgesCards?.imageUrl?.[0] ||
        state?.locationId?.nudgePrev?.imageUrl?.[0] ||
        fileuploadSelector?.data?.data?.map((item) => item?.src),
      deactivateAt: Date.now() + 24 * 60 * 60 * 1000,
      imageId: "",
      totalQuantity: Number(values?.quantity),
    };
    dispatch(createNudgeHandler(payload));
  };

  useEffect(() => {
    if (createNudgeSelector?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: createNudgeSelector?.data?.message,
      });
      setIsCartOpen(false);
      dispatch(createNudgeAction.createNudgeReset());
      navigate("/admin/merchant/list");
    } else if (createNudgeSelector?.message) {
      messageApi.open({
        type: "error",
        content: createNudgeSelector?.message,
      });
      dispatch(createNudgeAction.createNudgeReset());
    }
  }, [createNudgeSelector]);

  return (
    <>
      {createNudgeSelector?.isLoading && <Loader />}
      {isOpen && <div className="overlay2" onClick={toggleCart}></div>}

      <div className={`rightSidebar ${isOpen ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Cart</div>
          <div className="closeSidebar" onClick={toggleCart}>
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowCart">
          <div className="">
            <div className="dividerbtn">
              <img
                className="w-100 merchantImg br10 mb-6"
                src={
                  uploadedImage ||
                  nudgesCards?.imageUrl?.[0] ||
                  state?.locationId?.nudgePrev?.imageUrl?.[0]
                }
                alt={nudgesCards?.title}
              />
              <div className="fs-16 fw-600">{values?.title}</div>
              <div className="fs-14 mb-10">
                {/* Free drink on Happy Hours! From 07:00 PM to 08:00 PM */}
                {values?.description}
              </div>
              {/* <div className="lightBlack fs-14 mb-4">Recipients:</div>
              <div className="d-flex justify-between align-center gap-20">
                <div className="fs-14 fw-600">200</div>
                <div className="fs-14 fw-600 darkBlack ">$200</div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="fixedBottom">
          {/* <div className="divider2"></div>
          <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-14  ">Nudge Credit Balance</div>
            <div className="fs-18 fw-600">10</div>
          </div>
          <div className="d-flex justify-between align-center gap-20">
            <div className="fs-14  ">Additional Credits required</div>
            <div className="fs-18 fw-600">590</div>
          </div>
          <div className="divider2"></div>

          <div className="d-flex justify-between align-center gap-20 mb-20">
            <div className="fs-14  ">Total</div>
            <div className="fs-18 fw-600">$590</div>
          </div>
          <div className="d-flex align-center gap-10 mb-20">
            <div className="btn btnSecondary gap-10 w-100">
              <img src={google} alt="" /> Pay
            </div>
            <div className="btn btnSecondary gap-10 w-100">
              <img src={apple} alt="" /> Pay
            </div>
          </div> */}
          <div className="btn" onClick={() => sendNudge()}>
            Send
          </div>
        </div>
      </div>
    </>
  );
};

export default NudgeCart;
