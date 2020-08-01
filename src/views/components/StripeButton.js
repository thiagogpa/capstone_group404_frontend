import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import ModalCustom from "../components/CustomComponents";

const StripeCheckoutButton = ({ price, handleSuccessfulPayment }) => {
  const [success, setSuccess] = useState(false);
  
  const successModal = {
    type: "success",
    title: "Thanks for your order",
    content: "Your payment was processed successfully, your order will be now be processed by our team"
  };

  const failureModal = {
    type: "danger",
    title: "Order was not processed",
    content: "There was a problem processing your payment, please check your information and try again"
  };

  const [modalParameters, setModalParameters] = useState(successModal);

  const priceForStripe = price * 100;
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  const onToken = (token) => {
    let axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post("/payment", {
        amount: priceForStripe,
        stripeToken: token,
      })
      .then((response) => {
        console.log("Successfull payment");
        handleSuccessfulPayment();
        setModalParameters(successModal)
        setSuccess(!success);
        
      })
      .catch((error) => {        
        console.log("Payment Error: ", error);
        setModalParameters(failureModal)
        setSuccess(!success);
      });
  };

  return (
    <div>
      <StripeCheckout
        label="Pay Now"
        name="WallUp Bin Rental"
        billingAddress
        shippingAddress
        image="http://www.wall-upcarpentry.ca/img/favicon.png"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />

      <ModalCustom
        willShow={success}
        type={modalParameters.type}
        title={modalParameters.title}
        content={modalParameters.content}
        confirmationButtonText="Close"
        showCancelButton={false}
        cancelButtonText=""
        handleClose={() => setSuccess(!success)}
        handleConfirmationClick={() => setSuccess(!success)}
        handleCancelClick={() => setSuccess(!success)}
      />
    </div>
  );
};

export default StripeCheckoutButton;
