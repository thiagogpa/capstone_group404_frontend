import React, { useState, useContext } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import {
  CRow,
  CContainer,
  CButton,
  CCol
} from '@coreui/react'
import CInputRadioFormik from '../../components/CInputRadioFormik'
import AddAddressForm from '../../users/AddAddressForm';

//radio to choose address from existing
//add new address button will call for AddAddressForm 

const COrderAddressForm = () => {
  console.log("=======CHOOSING ADDRESS========")
  const { values } = useFormikContext();
  console.log(values.client.addresses);


  return (

    <FieldArray
      name="client.addresses"
      render={arrayHelpers => (
        <CContainer>
          {values.client.addresses && values.client.addresses.length > 0 ? (
            values.client.addresses.map((address, index) => (
              <CRow key={index.toString()}>
               <CCol>
                <CInputRadioFormik
                  name="address.id"
                  label={address.toString()}
                  value={address.id}
                  checked = {values.address.id === address.id}
                />
                </CCol>
              </CRow>))

          ) : (<CRow>{"No addresses found"}</CRow>)
          }
           <CRow>
            <CCol>
                <CInputRadioFormik
                  name="address.id"
                  label={"Another address"}
                  value={" "}
                  checked = {values.address.id ===" "}
                />
              </CCol>
           </CRow>
          {values.address.id == " " &&
            
            <><AddAddressForm/></> }  

          </CContainer>

      )}
    />
  );
};

export default COrderAddressForm;