import React, { useEffect, useState } from "react";
import { ErrorMessage,FieldArray} from "formik";
import OrderClass, {OrderedBin}  from './OrderClass';


import COrderAddressForm from './COrderAddressForm'
import COrderSummary from './COrderSummary'
import axios from 'axios'
import {Wizard,WizardStep} from '../../components/Wizard'
import COrderDatesForm from "./COrderDatesForm";
import CBinPickerForm from './CBinPickerForm';


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//this is going to be removed soon

const client = {
  id:25,
  fname: 'Hans',
  lname: "Gretel",
  addresses:[{
          id: "123",
          street: "First street",
          numberStreet: 23,
          city: "Toronto",
          province: "Ontario",
          zipcode: "M3B1X4"
      },
      {
          id: "124",
          street: "Second street",
          numberStreet: 55,
          city: "Toronto",
          province: "Ontario",
          zipcode: "M3B1X4"
      }],
};

//have to define all form foelds to make them controlled components
const jsonOrder = {
  orderNumber:" ",
  orderDate: new Date(),
  dropOffDate:"",
  dropOffTime:"",
  dropOddDateTime:"",
  pickUpDate:"",
  pickUpTime:"",
  pickUpDateTime:"",
  bins:[]
}
  

const COrderStepper = () => {

  //getting data for initial stages

  const order = new OrderClass(jsonOrder);
  
  console.log(order);
  
 const [ alertMessage, setAlertMessage] = useState('');
 let axiosInstance = axios.create({
   withCredentials: true,
   headers: {
     "Content-Type": "application/json",
   },
   baseURL: process.env.REACT_APP_BACKEND,
 });
 
 //getting data and transform for use in the table  


  useEffect(() => {
    axiosInstance.get("/api/bin")
      .then((response) => {
        order.bins = response.data.map((item) => { let bin = OrderedBin.from(item);
                                                     bin.selected=0;
                                                     bin.ifSelected=false;
                                                     bin.totalPrice=0;
                                                     return bin;
                                                });
          for(let i=0;i<order.bins.length;i++){
            order.bins[i].index=i;
          }                                        
        console.log(order.bins);
      }).catch(error => setAlertMessage(error.message));
  }, []);
  
    
  return (
  <div>
    <h1>Placing order</h1>
    <Wizard
      initialValues={order}
      onSubmit={async values =>
        sleep(300).then(() => console.log("Wizard submit", values))
      }
    >
      <WizardStep
        onSubmit={() => console.log("Dates onSubmit")}
        validationSchema={OrderClass.getDatesValidationSchema()}
        onSubmit={(values) => {
                          console.log("Dated and times onSubmit");
                          values.calculateTotalDays();
                          console.log(values);
                        }}
      >
        <div>
            <COrderDatesForm/>
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log("Bins onSubmit")}
        validationSchema={OrderClass.getBinsValidationSchema()}
      >
        <div>
        <FieldArray
           name="bins"
           component={CBinPickerForm}
         />
        </div>
      </WizardStep>
      <WizardStep
          onSubmit={() => console.log("Dates onSubmit")}
          validationSchema={OrderClass.getAddressValidationSchema()}
        >
      <div>
          <COrderAddressForm/>
      </div>
    </WizardStep>
    <WizardStep
         onSubmit={() => console.log("Dates onSubmit")}
        >
      <div>
          <COrderSummary/>
      </div>
    </WizardStep>
    </Wizard>
  </div>
)};

export default COrderStepper;