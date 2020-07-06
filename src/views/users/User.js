import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";

import usersData from "./UsersData";
import axios from "axios";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";

const User = ({ match }) => {
  const [userData, setUser] = useState([]);
  const [addressData, setAddress] = useState([]);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance.get("/api/user/" + match.params.id).then((response) => {
      setUser(response.data);
      setAddress(response.data.addresses);
    });
  }, []);

  const greetingMessage = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <Form>
          <CRow>
            <CCol xs="12">
              <CCard>
                <CCardHeader>Address info</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="12">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          name="Street"
                          value={value[0].street}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="number"
                          value={value[0].numberStreet}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                          type="text"
                          name="province"
                          value={value[0].province}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={value[0].city}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipcode"
                          value={value[0].zipcode}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs="12">
                      <Form.Group as={Col} controlId="validationFormik01">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          name="Street"
                          value={value[0].street}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CRow>


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
      <Form>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>User info</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        disabled
                      />
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
                        value={userData.lastName}
                        disabled
                      />
                    </Form.Group>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={userData.email}
                        disabled
                      />
                    </Form.Group>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={userData.phone}
                        disabled
                      />
                    </Form.Group>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </Form>
      {greetingMessage(addressData)}
    </div>
  );
};

export default User;
