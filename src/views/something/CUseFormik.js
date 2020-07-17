import React from 'react';
import { useFormikContext, Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';
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

 

  //stepper will contain the form, different forma are going to be rendered as input formik



  const InnerForm = () => {

    //    Grab values and submitForm from context
// const {values,validateOnChange} = useFormikContext();

return(
  <>
   <Field name="dtl" type="datetime-local"/>
   <CInputFormik name="f1" type="time" label="Field1" helpText="Enter time"/>
   <CInputFormik name="f2" type="datetime-local" label="Field2" helpText="Enter date"/>
   </>
  );  
};


const validationSchema=Yup.object().shape({
    f1: Yup.string().required("f1 is required"),
    f2: Yup.date().required().min(new Date()),
    dtl: Yup.string().required("f1 is required"),
    f3 :Yup.number().required("f2 is required").min(5)
    //f2 :Yup.number().required("f2 is required").min(Yup.ref("f1"))
});

const f={f1:"",f2:"30"};
const ff={...f};
 const CUseFormik = () => (
   <div>
     <h1>UseFormik</h1>
     <h2>{ff.f2}</h2>  
     <Formik
       initialValues={{f1:"",
                       f2: new Date()}}
       onSubmit={(values, actions) => {
         setTimeout(() => {
         alert(JSON.stringify(values, null, 2));
         actions.setSubmitting(false);
         }, 1000);
       }}
       validationSchema={validationSchema}
       validateOnChange
     >{(props)=>(
         <Form>
         <p>Hello</p>
         <CInputFormik name="f3" type="number" /><br/>
         <InnerForm/>
         <CButton type="submit" value="submit">Submit</CButton>
         <CButton onClick = {()=>console.log(props.values)}>Log</CButton>
         </Form>)}
     </Formik>
   </div>

 );

 export default CUseFormik;