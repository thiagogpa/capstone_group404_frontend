import React, { useState, useContext } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  CInputFile,
  CLabel,
  CSelect,
  CValidFeedback,
  CInvalidFeedback,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";

const AddressModal = ({ willShow, addressData, handleClose, handleSubmit }) => {
  const validationSchema = Yup.object().shape({
    street: Yup.string().required("Street Name is required"),
    numberStreet: Yup.string().required("Street Number is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    zipcode: Yup.string().required("Zipcode is required"),
  });

  const initialValues =
    addressData != null
      ? {
          street: addressData.street,
          numberStreet: addressData.numberStreet,
          city: addressData.city,
          province: addressData.province,
          zipcode: addressData.zipcode,
        }
      : {
          street: "",
          numberStreet: "",
          city: "",
          province: "",
          zipcode: "",
        };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={(e) => handleSubmit(e)}
        initialValues={initialValues}
        enableReinitialize
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
          <CModal
            show={willShow}
            onClose={handleClose}
            size="lg"
            color="primary"
          >
            <Form noValidate onSubmit={handleSubmit}>
              <CModalHeader>
                <CModalTitle>User Address</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CCol xs="12">
                  <CFormGroup row>
                    <CCol md="10">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          name="street"
                          value={values.street}
                          isInvalid={!!errors.street && touched.street}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.street}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>

                    <CCol md="2">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="numberStreet"
                          value={values.numberStreet}
                          isInvalid={
                            !!errors.numberStreet && touched.numberStreet
                          }
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.numberStreet}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="2">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipcode"
                          value={values.zipcode}
                          isInvalid={!!errors.zipcode && touched.zipcode}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.zipcode}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>

                    <CCol md="5">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                          type="text"
                          name="province"
                          value={values.province}
                          isInvalid={!!errors.province && touched.province}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.province}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>

                    <CCol md="5">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={values.city}
                          isInvalid={!!errors.city && touched.city}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CModalBody>
              <CModalFooter>
                <CButton type="submit" color="primary">
                  Submit
                </CButton>{" "}
                <CButton type="button" color="secondary" onClick={handleClose}>
                  Cancel
                </CButton>
              </CModalFooter>
            </Form>
          </CModal>
        )}
      </Formik>
    </>
  ); //end of return
};
export default AddressModal;
