import React from 'react';
import {
  CRow,
  CCol,
  CContainer
} from '@coreui/react'
import CInputFormik from '../../components/CInputFormik'

//import {useFormikContext} from 'formik';
const COrderDatesForm = () => {
//const {values}=useFormikContext();

  
  return (
    <CContainer>
    <CRow>
    <CCol>
      <CInputFormik
        name="dropOffDate"
        type="date"
        placeholder = "Select drop off date"
        label="Drop off date: " 
        helpText="drop off date"
      />
      </CCol>
      <CCol>
      <CInputFormik
        name="dropOffTime"
        type="time"
        placeholder = "Select drop off time"
        label="Drop Off time: " 
        helpText="drop off time"
      />
      </CCol>

      </CRow>
      <CRow>
      <CCol>     
      <CInputFormik
        name="pickUpDate"
        type="date"
        label="Pickup date:" 
        helpText="pickup date"
        placeholder = "Select pickup date"
      />
      </CCol>
      <CCol>     
      <CInputFormik
        name="pickUpTime"
        type="time"
        label="Pickup time:" 
        helpText="pickup time"
        placeholder = "Select pickup time"
      />
      </CCol>
      </CRow>
      </CContainer>
  );
};

export default COrderDatesForm;