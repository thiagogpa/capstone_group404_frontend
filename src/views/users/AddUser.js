import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import axios from "axios";

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

import ModalCustom from "../components/CustomComponents";

import { Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const User = ({ match }) => {
  const history = useHistory();

  const [userData, setUser] = useState([]);
  const [addressData, setAddress] = useState([]);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleSubmit = (e) => {
    let axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post("/api/login", {
        login: {
          username: e.username,
          password: e.password,
        },
        user: {
          firstName: e.firstName,
          lastName: e.lastName,
          phone: e.phone,
          email: e.email,
          staff: true,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("200");
          console.log(res);
          setSuccess(!success);
        } else {
          console.log(res);
          setFailure(!failure);
        }
      })
      .catch((err) => {
        console.error(err);
        setFailure(!failure);
      });
  };

  const phoneRegExp = /^[0-9]{11,15}$/;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
  });

  const handleUserCreated = () => {
    setSuccess(!success);
    history.push(`/users`)
  };

  return (
    <div>
      <ModalCustom
        willShow={success}
        type="success"
        title="Staff User creation successful"
        content="You have successfully created a new Staff member"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => handleUserCreated()}
        handleConfirmationClick={() => handleUserCreated()}
        handleCancelClick={() => handleUserCreated()}
      />

      <ModalCustom
        willShow={failure}
        type="danger"
        title="Staff User creation not successful"
        content="There was a problem creating the user"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => setFailure(!failure)}
        handleConfirmationClick={() => setFailure(!failure)}
        handleCancelClick={() => setFailure(!failure)}
      />

      <Formik
        validationSchema={validationSchema}
        onSubmit={(e) => handleSubmit(e)}
        initialValues={{
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
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
                  <CCardHeader>Login Info</CCardHeader>
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
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs="12">
                <CCard>
                  <CCardHeader> User info</CCardHeader>
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
};

export default User;
