import React,{} from 'react';
import { useFormik } from 'formik';

const COrderDatesForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      drop_off_date: '',
      pick_up_date : ''
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="drop off date">Drop off date</label>
      <input
        id="drop_off_date"
        name="drop_off_date"
        type="date"
        onChange={formik.handleChange}
        value={formik.values.drop_off_date}
      /><br/><br/>
      <label htmlFor="pick_up_date">Pick up date</label>
      <input
        id="pick_up_date"
        name="pick_up_date"
        type="date"
        onChange={formik.handleChange}
        value={formik.values.pick_up_date}
      />
      </form>
  );
};

export default COrderDatesForm;