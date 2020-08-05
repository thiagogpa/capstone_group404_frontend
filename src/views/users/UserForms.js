import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

function UserForm({ handleSubmit, isStaff }) {
  const phoneRegExp = /^[0-9]{11,15}$/;

  const staffValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required()
      .label("Confirm password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
  });

  const clientValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required()
      .label("Confirm password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
    street: Yup.string().required("Street Name is required"),
    numberStreet: Yup.string().required("Street Number is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    zipcode: Yup.string().required("Zipcode is required"),
  });

  const validationSchema = isStaff
    ? staffValidationSchema
    : clientValidationSchema;

  const staffInitialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const clientInitialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    numberStreet: "",
    city: "",
    province: "",
    zipcode: "",
  };

  const initialValues = isStaff ? staffInitialValues : clientInitialValues;

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(e) => handleSubmit(e)}
      initialValues={initialValues}
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
                <CCardHeader>Login</CCardHeader>
                <CCardBody>
                  <Form.Group controlId="validationFormik01">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <Form.Control
                        type="username"
                        name="username"
                        placeholder="Enter username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username && touched.username}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </CInputGroup>
                  </Form.Group>

                  <Form.Group controlId="validationFormik02">
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="*********"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password && touched.password}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </CInputGroup>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password confirmation</Form.Label>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="*********"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={
                          !!errors.confirmPassword && touched.confirmPassword
                        }
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </CInputGroup>
                  </Form.Group>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs="12">
              <CCard>
                <CCardHeader> User</CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="6">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          isInvalid={!!errors.firstName && touched.firstName}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>

                    <CCol md="6">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          value={values.lastName}
                          isInvalid={!!errors.lastName && touched.lastName}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="6">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="john.doe@gmail.com"
                          value={values.email}
                          isInvalid={!!errors.email && touched.email}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>

                    <CCol md="6">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="16476620236"
                          value={values.phone}
                          isInvalid={!!errors.phone && touched.phone}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </CCol>
                  </CFormGroup>
                </CCardBody>

                {isStaff === true && (
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="success">
                      <CIcon name="cil-scrubber" /> Submit
                    </CButton>
                  </CCardFooter>
                )}
              </CCard>
            </CCol>

            {isStaff === false && (
              <CCol xs="12">
                <CCard>
                  <CCardHeader>Delivery address</CCardHeader>
                  <CCardBody>
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
                  </CCardBody>
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="success">
                      <CIcon name="cil-scrubber" /> Submit
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            )}
          </CRow>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
