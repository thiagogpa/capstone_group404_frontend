import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { Form, Col } from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";

import ModalCustom from "../components/CustomComponents";

function ContactForm() {
  const [faqs, setFaq] = useState();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    setSuccess(!success);
    console.log(event);
  };

  const handleChange = (event) => {};

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <div>
      <ModalCustom
        willShow={success}
        type="success"
        title="Message sent"
        content="Your message has been sent. We will do our best to respond it as soon as possible!"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => setSuccess(!success)}
        handleConfirmationClick={() => setSuccess(!success)}
        handleCancelClick={() => setSuccess(!success)}
      />

      <Formik
        validationSchema={validationSchema}
        onSubmit={(event) => handleSubmit(event)}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <CRow>
              <CCol xs="12" sm="6">
                <CCard>
                  <CCardHeader>Contact us</CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs="12">
                        <Form.Group as={Col} controlId="validationFormik01">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="John"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName && touched.firstName}
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs="12">
                        <Form.Group as={Col} controlId="validationFormik01">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Doe"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName && touched.lastName}
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs="12">
                        <Form.Group as={Col} controlId="validationFormik02">
                          <Form.Label>E-mail</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="john.doe@example.com"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email && touched.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs="12">
                        <Form.Group as={Col} controlId="validationFormik03">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows="3"
                            placeholder="message"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            isInvalid={!!errors.message && touched.message}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </CCol>
                    </CRow>
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="success">
                      <CIcon name="cil-scrubber" /> Submit
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactForm;
