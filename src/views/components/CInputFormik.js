import React from 'react';
import { useField } from 'formik';
import {

    CFormText,
    CInput,
    CLabel,
    CInvalidFeedback,
    CFormGroup,
    CSelect
  } from '@coreui/react'
 
//by Marina Khatnyuk
//this component should be used only insede <Formik/> tag of with useFormik() hook

  const CInputFormik=({ label,helpText, ...props })=> {
    // this will return field props for an <input />
   const [field, meta, helpers] = useField(props.name);
   //console.log(field);
 
    return (
      <>
      <CFormGroup>
        <CLabel htmlFor={field}>{label}</CLabel>
        <CInput invalid={meta.touched&&!!meta.error} 
                valid={meta.touched&&!meta.error} 
                {...field} {...props} />
        <CFormText className="help-block">{helpText}</CFormText>
        {meta.error && meta.touched &&<CInvalidFeedback>{meta.error}</CInvalidFeedback>}
      </CFormGroup>

      </>
    );
  }



  const CSelectFormik=({ label,helpText, ...props })=> {
    // this will return field props for an <input />
   const [field, meta, helpers] = useField(props.name);
   //console.log(field);
 
    return (
      <>
      <CFormGroup>
        <CLabel htmlFor={field}>{label}</CLabel>
        <CSelect invalid={meta.touched&&!!meta.error} 
                valid={meta.touched&&!meta.error} 
                {...field} {...props} />
        <CFormText className="help-block">{helpText}</CFormText>
        {meta.error && meta.touched &&<CInvalidFeedback>{meta.error}</CInvalidFeedback>}
      </CFormGroup>

      </>
    );
  }


export default CInputFormik;
export {CSelectFormik}