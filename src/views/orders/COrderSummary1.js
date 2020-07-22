import React from "react";
import { useFormik, useFormikContext } from "formik";
import CCardForm from "./CCardForm";
import StripeCheckoutButton from "../components/StripeButton";

const COrderSummary = (props) => {
  const { values } = useFormikContext();

  const handleSuccessfulPayment = (event) => {
    //this.props.history.push("/");
  };

  return (
    <>
      <h5>order summary</h5>
      <p>
        Your pickup date: {values.pickUpDate} time: {values.pickUpTime}{" "}
      </p>
      <p>
        Your drop off date: {values.dropOffDate} time: {values.dropOffTime}{" "}
      </p>
      <p>{values.address}</p>
      <p>{values.bins}</p>

      <StripeCheckoutButton price={100} handleSuccessfulPayment={handleSuccessfulPayment}/>
    </>
  );
};

export default COrderSummary;
