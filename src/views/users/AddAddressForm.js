import React from "react";

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  } from "@coreui/react";
  
import CInputFormik from '../components/CInputFormik'
import { useFormikContext } from "formik";
  
const AddAddressForm = () => {
 const {values}= useFormikContext;

return(
              <CCard>
                <CCardHeader>Another address</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md="10">
                    < CInputFormik  
                          label= "Street"
                          type="text"
                          name="address.street"
                      />
                    </CCol>

                    <CCol md="2">
                    < CInputFormik
                          type="text"
                          name="address.numberStreet"
                          label="Street number"
                        />
                    </CCol>
                    </CRow>
          

                  <CRow>
                    <CCol md="2">
                    < CInputFormik
                          type="text"
                          name="address.zipcode"
                          label="zipcode"
                        />
                    </CCol>
                    <CCol md="5">
                        <CInputFormik
                          type="text"
                          name="address.province"
                          label="Province"
                          
                        />
                    </CCol>

                    <CCol md="5">
                        <CInputFormik
                          type="text"
                          name="address.city"
                          label="City"/>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
      )
    };


export default AddAddressForm;  