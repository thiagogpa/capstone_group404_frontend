import React,{useState, useContext} from 'react';
import { useFormik } from 'formik';
import {
  CForm,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
} from '@coreui/react'
import CInputFormik from '../components/CInputFormik'

const COrderAddressForm = () => {
  return (
    <>
      <CInputFormik
        id="address"
        name="address"
        type="text"
        label="Address: "
        /><br/><br/>
    </>
  );
};

export default COrderAddressForm;