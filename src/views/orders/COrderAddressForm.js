import React,{} from 'react';
import { useFormik } from 'formik';

const COrderAddressForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      address: '',
      
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.address}
      /><br/><br/>
    </form>
  );
};

export default COrderAddressForm;