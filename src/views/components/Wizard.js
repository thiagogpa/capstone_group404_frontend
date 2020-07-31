import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Debug } from './Debug';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter
    
  } from '@coreui/react'


//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit}) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = values => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = values => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <CCard>
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {formik => (
        <Form>
        <CCardHeader>
          <h5>
            Step {stepNumber + 1} of {totalSteps}
          </h5>
          </CCardHeader>
          <CCardBody>
          {step}
          </CCardBody>
          <CCardFooter>
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <CButton color={"primary"} size={"lg"} 
                        onClick={() => previous(formik.values)} type="button">
                {"<"}Back {"    "}
              </CButton>
            )}
            <div>
            {!isLastStep &&
              <CButton color={"primary"} size={"lg"} disabled={formik.isSubmitting} type="submit">
               {"Next>"}
              </CButton>}
            </div>
          </div>
          </CCardFooter>
        </Form>
      )}
    </Formik>
    </CCard>

  );
};

const WizardStep = ({ children }) => children;

export {Wizard,WizardStep}