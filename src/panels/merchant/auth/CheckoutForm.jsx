import React, { useEffect, useState } from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Confirm the payment using Stripe's confirmPayment method
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3001/merchant/nudges",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Payment successful
      setSuccessMessage("Payment successful! Thank you for your purchase.");
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" className  = "btn w-100 mt-10" disabled={!stripe || !elements} >
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* Show success message to your customers */}
      {successMessage && <div>{successMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
