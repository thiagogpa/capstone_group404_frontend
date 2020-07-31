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
  CDataTable,
  CButtonGroup,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserFormForUpdate({
  userID,
  handleUpdateUserInfo,
  handleUpdateLogin,
  userData,
  addressData,
  handleEditAddress,
  handleAddressClick,
  handleDeleteAddress,
  handleAddAddress
}) {
  const loginValidationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
  });

  const loginInitialValues = {
    password: "",
  };

  const passwordSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <Formik
          validationSchema={loginValidationSchema}
          onSubmit={(e) => handleUpdateLogin(e)}
          initialValues={loginInitialValues}
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
            <Form noValidate onSubmit={handleSubmit}>
              <CRow>
                <CCol xs="12" sm="6">
                  <CCard>
                    <CCardHeader>Login</CCardHeader>
                    <CCardBody>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
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

                    <CCardFooter>
                      <CButton type="submit" size="sm" color="warning">
                        Update password
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

  const phoneRegExp = /^[0-9]{11,15}$/;

  const userInfoValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone is required"),
  });

  const userInfoInitialValues = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
  };

  const handleUpdateButton = () => {
    console.log("Inside handleUpdateButton");
  };

  const userSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <Formik
          validationSchema={userInfoValidationSchema}
          onSubmit={(e) => handleUpdateUserInfo(e)}
          initialValues={userInfoInitialValues}
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
            <Form noValidate onSubmit={handleSubmit}>
              <CRow>
                <CCol xs="12">
                  <CCard>
                    <CCardHeader> User</CCardHeader>
                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="6">
                          <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={values.firstName}
                              isInvalid={
                                !!errors.firstName && touched.firstName
                              }
                              onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.firstName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </CCol>

                        <CCol md="6">
                          <Form.Group>
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
                          <Form.Group>
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
                          <Form.Group>
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
                      <CButton type="submit" size="sm" color="warning">
                        Update user info
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

  const fields = [
    {
      key: "update-delete",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "street",
      _classes: "font-weight-bold",
      sorter: true,
      filter: true,
    },
    {
      key: "numberStreet",
      sorter: true,
      filter: true,
    },
    {
      key: "city",
      sorter: true,
      filter: true,
    },
    {
      key: "province",
      sorter: true,
      filter: true,
    },
    {
      key: "zipcode",
      sorter: true,
      filter: true,
    },
  ];

  const addressSection = (value) => {
    return userData.staff == true ? (
      <div></div>
    ) : (
      <div>
        <Form>
          <CRow>
            <CCol xs="12">
              <CCard>
                <CCardHeader>Addresses</CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={value}
                    fields={fields}
                    hover
                    sorter
                    striped
                    pagination
                    itemsPerPage={10}
                    clickableRows
                    onRowClick={handleAddressClick}
                    scopedSlots={{
                      "update-delete": (item, index) => {
                        return (
                          <CButtonGroup>
                            <CButton
                              name="update"
                              onClick={handleEditAddress}
                              color={"primary"}
                              variant={"ghost"}
                            >
                              <CIcon name={"cilPencil"} />
                            </CButton>
                            <CButton
                              name="delete"
                              onClick={handleDeleteAddress}
                              color={"danger"}
                              variant={"ghost"}
                            >
                              <CIcon name={"cilTrash"} />
                            </CButton>
                          </CButtonGroup>
                        );
                      },
                    }}
                  />
                </CCardBody>

                <CCardFooter>
                  <CButton size="sm" color="success" onClick={handleAddAddress}>
                    Add new Address
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </Form>
      </div>
    );
  };

  return (
    <>
      {passwordSection(userData)}
      {userSection(userData)}
      {addressSection(addressData)}
    </>
  );
}

export default UserFormForUpdate;
