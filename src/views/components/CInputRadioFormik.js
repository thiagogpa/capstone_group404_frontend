

import React from 'react';
import { useField } from 'formik';
import {
    CInput,
    CInputRadio,
    CLabel,
    CFormGroup,
  } from '@coreui/react'
 
//by Marina Khatnyuk
//this component should be used only insede <Formik/> tag of with useFormik() hook

  const CInputRadioFormik=({ label, ...props })=> {
    // this will return field props for an <input />
   const [field, meta, helpers] = useField(props.name);
   //console.log(field);

    return (
      <>
      <CFormGroup inline>
        <CInputRadio {...field} {...props} />
        <CLabel htmlFor={field}>{label}</CLabel>
      </CFormGroup>
      </>
    );
  }

  export default CInputRadioFormik;