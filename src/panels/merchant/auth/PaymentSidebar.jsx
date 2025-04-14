// import React, { useEffect, useState } from "react";
// import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
// import google from "../../../assets/images/google.svg";
// import apple from "../../../assets/images/apple.svg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   businessAddNudgeCreditAction,
//   businessAddNudgeCreditHandler,
// } from "../../../redux/action/businessAction/businessAddNudgeCredit";
// import { useCommonMessage } from "../../../common/CommonMessage";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm"; // Make sure you have this form to handle the payment process
// import { Modal } from "antd";

// const stripePromise = loadStripe(
//   "pk_test_51QhDunE3An7OFziSHkki0YdsnYqIM3tg0ZYHSvovC2F6FFphzxZu58bZII3VKVtpy8Kl43Q4kaIQ7V7UmbYz36zf00c5PLSjvH"
// );

// const PaymentSidebar = ({
//   isPaymentSidebar,
//   togglePaymentSidebar,
//   activeNudge,
// }) => {
//   const [clientSecret, setClientSecret] = useState("");
//   const dispatch = useDispatch();
//   const messageApi = useCommonMessage();

//   const businessAddNudgeCreditSelector = useSelector(
//     (state) => state?.businessAddNudgeCredit
//   );

//   const nudgePaymentGooglePay = () => {
//     let payload = {
//       nudgeCredit: activeNudge,
//       nudgeAmount: activeNudge,
//       currency: "INR",
//     };
//     dispatch(businessAddNudgeCreditHandler(payload));
//   };

//   const createStripePrice = async () => {
//     try {
//       const res = await fetch("https://api.stripe.com/v1/prices", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer sk_test_51QhDunE3An7OFziSoNkwsbbgiI4VRtOjzX4CyDdobRvuuDrkSr7I5VvF4Sd8iVrkZnRQqzBR5gYYIbTUVNti9WZZ00A2vlz00M`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },

//         body: new URLSearchParams({
//           currency: "usd",
//           unit_amount: activeNudge,
//           // "recurring[interval]": "month",
//           "product_data[name]": "Nudge credit",
//         }),
//       });

//       const data = await res.json();
//       if (data?.id) {
//         // const res1 = await fetch("https://api.stripe.com/v1/payment_links", {
//         //   method: "POST",
//         //   headers: {
//         //     Authorization: `Bearer sk_test_51QhDunE3An7OFziSoNkwsbbgiI4VRtOjzX4CyDdobRvuuDrkSr7I5VvF4Sd8iVrkZnRQqzBR5gYYIbTUVNti9WZZ00A2vlz00M`,
//         //     "Content-Type": "application/x-www-form-urlencoded",
//         //   },
//         //   body: new URLSearchParams({
//         //     "line_items[0][price]": data?.id,
//         //     "line_items[0][quantity]": activeNudge,
//         //     "after_completion[type]": "redirect",
//         //     "after_completion[redirect][url]":
//         //       "http://localhost:3001/merchant/nudges",
//         //   }),
//         // });
//         const res1 = await fetch("https://api.stripe.com/v1/checkout/sessions", {
//           method: "POST",
//           // headers: {
//           //   Authorization: `Bearer sk_test_51QhDunE3An7OFziSoNkwsbbgiI4VRtOjzX4CyDdobRvuuDrkSr7I5VvF4Sd8iVrkZnRQqzBR5gYYIbTUVNti9WZZ00A2vlz00M`,
//           //   "Content-Type": "application/x-www-form-urlencoded",
//           // },
//           body: new URLSearchParams({
//             "line_items[0][price]": data?.id,
//             "line_items[0][quantity]": activeNudge,
//             mode: "payment",
//             currency: "usd", // optional here if price already defines it
//             "success_url": "http://localhost:3001/merchant/nudges?success=true",
//             "cancel_url": "http://localhost:3001/merchant/nudges?cancelled=true",
//           }),
//         });
//         const finalUrl = await res1.json();

//         window.open(finalUrl.url, "_blank");
//       }
//     } catch (err) {
//       console.error("Error creating Stripe price:", err);
//     }
//   };

//   useEffect(() => {
//     if (businessAddNudgeCreditSelector?.data?.statusCode === 200) {
//       messageApi.open({
//         type: "success",
//         content: businessAddNudgeCreditSelector?.data?.message,
//       });
//       setClientSecret(businessAddNudgeCreditSelector?.data?.data?.clientSecret);
//       createStripePrice();
//       dispatch(businessAddNudgeCreditAction.businessAddNudgCreditReset());
//     } else if (businessAddNudgeCreditSelector?.message) {
//       messageApi.open({
//         type: "error",
//         content: businessAddNudgeCreditSelector?.message,
//       });
//       dispatch(businessAddNudgeCreditAction.businessAddNudgCreditReset());
//     }
//   }, [businessAddNudgeCreditSelector]);

//   return (
//     <>
//       {isPaymentSidebar && (
//         <div className="overlay2" onClick={togglePaymentSidebar}></div>
//       )}

//       <div className={`rightSidebar ${isPaymentSidebar ? "open" : ""}`}>
//         <div className="d-flex justify-between align-center">
//           <div className="fs-20 fw-600">Payment</div>
//           <div className="closeSidebar" onClick={togglePaymentSidebar}>
//             <img src={closeRightSidebar} alt="closeRightSidebar" />
//           </div>
//         </div>

//         <div className="overflowSidebar">
//           <div className="divider2"></div>
//           <div className="d-flex justify-between align-center gap-20 mb-20">
//             <div className="fs-14">Nudge Credit you’re adding</div>
//             <div className="fs-18 fw-600">{activeNudge}</div>
//           </div>

//           <div className="d-flex justify-between align-center gap-20">
//             <div className="fs-14">1 Nudge credit cost</div>
//             <div className="fs-18 fw-600">$1</div>
//           </div>

//           <div className="divider2"></div>

//           <div className="d-flex justify-between align-center gap-20 mb-20">
//             <div className="fs-14">Total</div>
//             <div className="fs-18 fw-600">${activeNudge}</div>
//           </div>

//           <button className="add-credit-btn" onClick={nudgePaymentGooglePay}>
//             Checkout
//           </button>

//           {/* {clientSecret && (
//               <Elements stripe={stripePromise} options={{ clientSecret }}>
//                 <CheckoutForm />
//               </Elements>
//             )} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentSidebar;
