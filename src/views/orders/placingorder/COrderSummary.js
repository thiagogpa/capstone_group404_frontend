import React from "react";
import { useFormikContext } from "formik";
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CCardFooter,
} from "@coreui/react";

import StripeCheckoutButton from "../../components/StripeButton";
import Order from "./OrderClass";

//this is part of the placing order stepper

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.env.REACT_APP_BACKEND,
});


const COrderSummary = () => {
  var isNewAddress=false;
  console.log("Order summary");
  const { values } = useFormikContext();
  //order to save:
  const order=values;
  const addressId = values.address.id;
  //get full address info to show user 
  if (addressId != " ") {
    order.address = values.client.addresses.find(
      (address) => address.id == addressId
    );
  }else{
    isNewAddress=true;
  }

  //re-calculating the price
  order.ordersBins = values.bins.filter((bin) => bin.isSelected == true);
  if (order.ordersBins.length > 0) {
    order.calculateTotal(); 
  }

   const handleSuccessfulPayment = async (event) => {
    //this.props.history.push("/");
    console.log("INSIDE HANDLE ");
    //if user has a new addres, it should be saved first
    try{
    if (isNewAddress){
     let newAddress={};
     let res = await axiosInstance.post("/api/address/", {
                    userId: order.client.id,
                    street: order.address.street,
                    numberStreet: order.address.numberStreet,
                    city: order.address.city,
                    province: order.address.province,
                    zipcode: order.address.zipcode,
                  });
      newAddress=res.data;
      order.address = newAddress;
      console.log(newAddress);
      console.log("Address Inserted");
    }//new address
     

   var orderToSave={
      orderDate: order.orderDate,
      dropOffDate : order.dropOffDateTime,
      pickUpDate : order.pickUpDateTime,
      subtotal : order.subtotal,
      taxes : order.taxes,
      userId : order.client.id,
      addressId : order.address.id,//should not be empty
      status: "initial",
      ordersbins :order.ordersBins,
    };

    let resOrder = await axiosInstance.post("/api/order/", orderToSave);
    const savedOrder = resOrder.data;
      console.log("Here is our saved order")
      console.log(savedOrder);
      order.id=savedOrder.id;
      return Promise.resolve(savedOrder);
  } catch(error){
    console.log(error);
  }
};


return (
  <CContainer fluid>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            {" "}
            <h5>Summary</h5>
          </CCardHeader>
          <CCardBody>
            <p>
              Client: {order.client.firstName} {order.client.lastName}
            </p>
            <p>
              Drop off date: {order.dropOffDate} time: {order.dropOffTime}{" "}
            </p>
            <p>
              Pickap date: {order.pickUpDate} time: {order.pickUpTime}{" "}
            </p>
            <p>Delivery address: {order.address.toString()}</p>
            <p>Order bins: </p>
            <ol>
              {order.ordersBins.length > 0 &&
                order.ordersBins.map((bin) => {
                  return (
                    <li key={bin.id.toString()}>
                      {bin.wasteType} {bin.getCapacity()} yard bin - $
                      {bin.totalPrice}CAD{" "}
                    </li>
                  );
                })}
            </ol>
            <p>Subtotal: {order.subtotal.toFixed(2)}</p>
            <p>Taxes: {order.taxes.toFixed(2)}</p>
          </CCardBody>
          <CCardFooter>
            <h6>Total   : {order.total.toFixed(2)} </h6>
          </CCardFooter>

        </CCard>
        <StripeCheckoutButton
          price={order.total}
          handleSuccessfulPayment={handleSuccessfulPayment}
        />
        <button onClick={()=>handleSuccessfulPayment()}>Test saving data</button>
      </CCol>
    </CRow>
    {/*  Uncomment here to enable the CSVLink component (export to CSV file)
            <CSVLink data={orderData} separator={","}>Export to CSV file</CSVLink>;
      */}
  </CContainer>
);
};

export default COrderSummary;
