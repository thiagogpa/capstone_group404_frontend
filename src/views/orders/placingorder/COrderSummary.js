import React from 'react';
import {useFormikContext } from 'formik';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CCardFooter
} from "@coreui/react";

import CCardForm from './CCardForm';
//this is part of the placing order stepper

const COrderSummary = () => {
console.log("Order summary");
  const { values } = useFormikContext();
  const order = values;//probably cast to order class here 
  const addressId = values.address.id;
  if(addressId !== " "){
    order.address = values.client.addresses.find(address=>address.id == addressId);
  }
  order.ordersBins=values.bins.filter(bin=>bin.isSelected==true);
  if(order.ordersBins.length>0){
       values.calculateTotal();
  }

  return (
    <CContainer fluid>
    <CRow>
      <CCol>
        <CCard>
        <CCardHeader> <h5>Summary</h5></CCardHeader>
        <CCardBody>
          <p>Client: {order.client.firstName} {order.client.lastName}</p>
          <p>Drop off date: {order.dropOffDate} time: {order.dropOffTime} </p>
          <p>Pickap date: {order.pickUpDate} time: {order.pickUpTime} </p>
          <p>Delivery address: {order.address.toString()}</p>
          <p>Order bins: </p>
          <ol>
          {order.ordersBins.length>0 && order.ordersBins.map(bin=>{
            return(  
            <li key={bin.id.toString()}>{bin.wasteType}   {bin.getCapacity()} yard bin   -  ${bin.totalPrice}CAD </li>)

          })}
          </ol>
          <p>Subtotal: {order.subtotal.toFixed(2)}</p>
          <p>Taxes: {order.taxes.toFixed(2)}</p>
          </CCardBody>
          <CCardFooter>
          <h6>Total: {order.total.toFixed(2)}  </h6>
          </CCardFooter>
          </CCard>
      </CCol>
      
      <CCol>
        <CCardForm />
      </CCol>
      </CRow>
      
      {/*  Uncomment here to enable the CSVLink component (export to CSV file)
            <CSVLink data={orderData} separator={","}>Export to CSV file</CSVLink>;
      */}
      </CContainer>

  );

}


export default COrderSummary