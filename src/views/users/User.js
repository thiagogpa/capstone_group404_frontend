import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import ModalCustom from "../components/CustomComponents";

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
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";

const User = ({ match }) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [userData, setUser] = useState([]);
  const [addressData, setAddress] = useState([]);

  const history = useHistory();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
  });

  useEffect(() => {
    axiosInstance.get("/api/user/" + match.params.id).then((response) => {
      setUser(response.data);
      setAddress(response.data.addresses);
    });
  }, []);

  const getUserBadge = (staff) => {
    switch (staff) {
      case "true":
        return "primary";
      case "false":
        return "success";
      default:
        return "primary";
    }
  };

  const checkStaff = (value) => {
    return value === true ? (
      <CBadge color={getUserBadge(userData.staff.toString())}>Staff</CBadge>
    ) : (
      <CBadge color={getUserBadge(userData.staff.toString())}>Client</CBadge>
    );
  };

  const handleDeleteUser = () => {
    axiosInstance
      .delete("/api/user/" + match.params.id)
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


  const handleUserDeleted = () => {
    setSuccess(!success);
    history.push(`/users`)
  };



  const userSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <Form>
          <CRow>
            <CCol xs="12">
              <CCard>
                <CCardHeader>
                  User info &nbsp; {checkStaff(userData.staff)}
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="6">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={userData.firstName}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="6">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          value={userData.lastName}
                          disabled
                        />
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
                          value={userData.email}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="6">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={userData.phone}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CFormGroup>
                </CCardBody>

                {userData.staff === true && (
                  <CCardFooter>
                    <CButton
                      type="submit"
                      size="sm"
                      color="danger"
                      onClick={handleDeleteUser}
                    >
                      <CIcon name="cil-scrubber" /> Delete
                    </CButton>
                  </CCardFooter>
                )}
              </CCard>
            </CCol>
          </CRow>
        </Form>
      </div>
    );
  };

  const addressSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <Form>
          <CRow>
            <CCol xs="12">
              <CCard>
                <CCardHeader>Delivery address info</CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="10">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          name="Street"
                          value={value[0].street}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="2">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="number"
                          value={value[0].numberStreet}
                          disabled
                        />
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
                          value={value[0].zipcode}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="5">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                          type="text"
                          name="province"
                          value={value[0].province}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="5">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={value[0].city}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </Form>
      </div>
    );
  };

  return (
    <div>
      {
        <ModalCustom
          willShow={success}
          type="success"
          title="Staff deleted successfully"
          content="You have successfully deleted this Staff member"
          confirmationButtonText="OK"
          showCancelButton={false}
          cancelButtonText={null}
          handleClose={() => handleUserDeleted()}
          handleConfirmationClick={() => handleUserDeleted()}
          handleCancelClick={() => handleUserDeleted()}
        />
      }
      {
        <ModalCustom
          willShow={failure}
          type="danger"
          title="Staff delete wast not successful"
          content="There was a problem while deleting the user"
          confirmationButtonText="OK"
          showCancelButton={false}
          cancelButtonText={null}
          handleClose={() => setFailure(!failure)}
          handleConfirmationClick={() => setFailure(!failure)}
          handleCancelClick={() => setFailure(!failure)}
        />
      }
      {userSection(userData)}
      {addressSection(addressData)}
    </div>
  );
};

export default User;
