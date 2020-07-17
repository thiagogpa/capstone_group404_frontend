import React from 'react';
import { useFormik, useFormikContext } from 'formik';
import CCardForm from './CCardForm';

const COrderSummary = (props) => {
  const  {values} = useFormikContext();

return(
<>
<h5>order summary</h5>
<p>Your pickap date: {values.pickUpDate} time: {values.pickUpTime} </p>
<p>Your drop off date: {values.dropOffDate} time: {values.dropOffTime} </p>
<p>{values.address}</p>
<p>{values.bins}</p>
<CCardForm/>


</>

)

}

export default COrderSummary