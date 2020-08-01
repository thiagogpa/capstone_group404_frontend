import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import axios from "axios";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CDataTable,
  CCol,
  CRow,
  CFormGroup,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownDivider,
  CDropdownItem,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import ModalCustom from "../components/CustomComponents";

import { useHistory, useLocation } from "react-router-dom";

const User = ({ match }) => {
  const [orderData, setOrder] = useState([]);
  const [userData, setUser] = useState([]);
  const [addressData, setAddress] = useState([]);
  const [binsData, setBins] = useState([]);

  const [success, setSuccess] = useState(false);

  const [tempStatus, setTempStatus] = useState([]);

  const isStaff = useSelector((state) => state.user.isStaff);
  const currentUserId = useSelector((state) => state.user.userId);

  const history = useHistory();

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance.get("/api/order/" + match.params.id).then((response) => {

      setOrder(response.data);
      setUser(response.data.user);
      setAddress(response.data.address);
      setBins(response.data.bins);
    });
  }, []);

  const displayOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "America/Toronto",
  };

  const getBadge = (status) => {
    switch (status) {
      case "In progress":
        return "warning";
      case "Delivered":
        return "primary";
      case "Complete":
        return "success";
      default:
        return "primary";
    }
  };

  const handleStatusUpdate = (event) => {
    setTempStatus(event.target.name);

    setSuccess(!success);
  };

  const handleStatusWillUpdate = (event) => {
    let updatedOrder = Object.assign({}, orderData);

    updatedOrder.status = tempStatus;
    setOrder(updatedOrder);
    setSuccess(!success);

    let axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance.put("/api/order/" + match.params.id, {
      status: tempStatus,
    });
  };

  const statusUpdateDropDown = (value) => {
    if (isStaff) {
      return (
        <CDropdownToggle color={getBadge(value.status)}>
          {value.status}
        </CDropdownToggle>
      );
    } else {
      return (
        <CDropdownToggle color={getBadge(value.status)} disabled>
          {value.status}
        </CDropdownToggle>
      );
    }
  };

  const orderSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <ModalCustom
          willShow={success}
          type="success"
          title="Order status update"
          content="Are you sure you want to update the order status ?"
          confirmationButtonText="Yes"
          showCancelButton={true}
          cancelButtonText="No"
          handleClose={() => setSuccess(!success)}
          handleConfirmationClick={() => handleStatusWillUpdate()}
          handleCancelClick={() => setSuccess(!success)}
        />

        <Form>
          <CRow>
            <CCol xs="12">
              <CCard>
                <CCardHeader>Order information &nbsp; </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="4">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Order date</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={new Intl.DateTimeFormat(
                            "en-CA",
                            displayOptions
                          ).format(new Date(value.orderDate))}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="4">
                      <Form.Group controlId="validationFormik01">
                        <Form.Label>Drop off date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          value={new Intl.DateTimeFormat(
                            "en-CA",
                            displayOptions
                          ).format(new Date(value.dropOffDate))}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="4">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>Pick up date</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={new Intl.DateTimeFormat(
                            "en-CA",
                            displayOptions
                          ).format(new Date(value.pickUpDate))}
                          disabled
                        />
                      </Form.Group>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="4">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>Subtotal</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={value.subtotal}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="4">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>Taxes</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={value.taxes}
                          disabled
                        />
                      </Form.Group>
                    </CCol>

                    <CCol md="4">
                      <Form.Group controlId="validationFormik02">
                        <Form.Label>Status</Form.Label>
                        <br></br>
                        <CDropdown className="m-1 btn-group">
                          {statusUpdateDropDown(value)}
                          <CDropdownMenu>
                            <CDropdownItem
                              onClick={(event) => handleStatusUpdate(event)}
                              name="In progress"
                            >
                              In progress
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={(event) => handleStatusUpdate(event)}
                              name="Delivered"
                            >
                              Delivered
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={(event) => handleStatusUpdate(event)}
                              name="Complete"
                            >
                              {" "}
                              Complete
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
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

  const userSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <Form>
          <CRow>
            <CCol xs="12">
              <CCard>
                <CCardHeader>User info &nbsp;</CCardHeader>
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
                          value={value.street}
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
                          value={value.numberStreet}
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
                          value={value.zipcode}
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
                          value={value.province}
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
                          value={value.city}
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

  const fields = [
    {
      key: "wasteType",
      _classes: "font-weight-bold",
      sorter: true,
      filter: false,
    },
    {
      key: "description",
      sorter: true,
      filter: false,
    },
  ];

  const binsSection = (value) => {
    return value.length == 0 ? (
      <div></div>
    ) : (
      <div>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Bins</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={binsData}
                  fields={fields}
                  hover
                  itemsPerPage={20}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  };

  return (
    <div>
      {orderSection(orderData)}
      {userSection(userData)}
      {addressSection(addressData)}
      {binsSection(binsData)}
    </div>
  );
};

export default User;
