import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik,FieldArray } from "formik";
import * as Yup from "yup";
import OrderClass from './OrderClass';

import COrderAddressForm from './COrderAddressForm'
import COrderSummary from './COrderSummary1'

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    CInputRadio,
    CInputFile,
    CLabel,
    CSelect,
    CValidFeedback,
    CInvalidFeedback
  } from '@coreui/react'

import CInputFormik from '../components/CInputFormik' 
import {Wizard,WizardStep} from '../components/Wizard'
import COrderDatesForm from "./COrderDatesForm";
import CBinPickerForm from './CBinPickerForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const jsonOrder = {
  orderNumber:" ",
  orderDate: new Date(),
  client:{
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
  },
  bins:[]
}
  

const order = new OrderClass(jsonOrder);
console.log(order);

const COrderStepper = () => (
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
);

export default COrderStepper;