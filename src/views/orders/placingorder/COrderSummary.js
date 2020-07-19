import React from 'react';
import {useFormikContext } from 'formik';
import CCardForm from './CCardForm';
//this is part of the placing order stepper

const COrderSummary = (props) => {
  const { values } = useFormikContext();

  return (
    <>
      <h5>order summary</h5>
      <p>Your pickap date: {values.pickUpDate} time: {values.pickUpTime} </p>
      <p>Your drop off date: {values.dropOffDate} time: {values.dropOffTime} </p>
      <p>{values.address}</p>
      <p>{values.bins}</p>
      <CCardForm />
      {/* Uncomment here to enable the CSVLink component (export to CSV file)
            <CSVLink data={orderData} separator={","}>Export to CSV file</CSVLink>;
      */}
    </>

  )

}

export default COrderSummary