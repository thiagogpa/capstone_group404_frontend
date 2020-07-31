import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";

import { Formik } from "formik";
import * as Yup from "yup";

import ModalCustom from "../../components/CustomComponents";
import UserForm from "../../users/UserForms";

const Register = () => {
  const history = useHistory();
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
          staff: false,
        },
        address: {
          street: e.street,
          numberStreet: e.numberStreet,
          city: e.city,
          province: e.province,
          zipcode: e.zipcode,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(e.username);
          console.log(e.password);

          //Logs in to get a TOKEN
          axiosInstance
            .post("/api/authenticate", {
              username: e.username,
              password: e.password,
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
        } else {
          console.log(res);
          console.log("other");
          setFailure(!failure);
        }
      })
      .catch((err) => {
        console.error(err);
        setFailure(!failure);
      });
  };

  const handleUserCreated = () => {
    setSuccess(!success);
    history.push(`/users`);
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <ModalCustom
        willShow={success}
        type="success"
        title="User creation successful"
        content="Your account has been created !"
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
        title="User creation not successful"
        content="There was a problem creating the user"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => setFailure(!failure)}
        handleConfirmationClick={() => setFailure(!failure)}
        handleCancelClick={() => setFailure(!failure)}
      />

      <CContainer>
        <CRow className="justify-content-center">
          
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <UserForm
                    handleSubmit={(e) => handleSubmit(e)}
                    isStaff={false}
                  />
                </CForm>
              </CCardBody>
            </CCard>
          
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
