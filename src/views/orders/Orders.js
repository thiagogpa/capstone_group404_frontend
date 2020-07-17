import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

// Import CSV package
// This requires npm install react-csv
// You can use the 'separator' parameter to select the character to be used as a separator
import { CSVLink, CSVDownload } from "react-csv";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CInput,
  CForm,
  CFormGroup,
  CLabel,
  CCardFooter,
  CButton,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";

import DateFilter from "./dateFilter";

import axios from "axios";

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

const Orders = () => {
  const history = useHistory();

  const [allOrdersData, setAllOrders] = useState([]);
  const [filteredOrdersData, setFilteredOrders] = useState([]);
  const [orderDateFilter, setOrderDateFilter] = useState([]);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance.get("/api/order").then((response) => {
      setAllOrders(response.data);
      setFilteredOrders(response.data);
    });
  }, []);

  const fields = [
    {
      key: "orderDate",
      _classes: "font-weight-bold",
      sorter: true,
      filter: true,
    },
    {
      key: "dropOffDate",
      sorter: true,
      filter: true,
    },
    {
      key: "pickUpDate",
      sorter: true,
      filter: true,
    },
    {
      key: "status",
      sorter: true,
      filter: true,
    },
  ];

  const handleOnChange = (event) => {
    try {
      var dt = new Date(event.target.value);
      dt.setTime(dt.getTime() + dt.getTimezoneOffset() * 60 * 1000);

      setOrderDateFilter({
        ...orderDateFilter,
        [event.target.id]: new Intl.DateTimeFormat(
          "en-CA",
          compareOptions
        ).format(dt),
      });
    } catch (error) {
      console.log("Error while converting");
      setFilteredOrders(allOrdersData);
      return;
    }
  };

  useEffect(() => {
    console.log("Changing date");
    console.log(orderDateFilter);
    if (!orderDateFilter.orderDateFrom || !orderDateFilter.orderDateTo) {
      setFilteredOrders(allOrdersData);
      return;
    }

    let filteredOrders = allOrdersData.filter((order) => {
      //var orderDate = new Date(order.orderDate);

      var formatedOrderDate = new Intl.DateTimeFormat(
        "en-CA",
        compareOptions
      ).format(new Date(order.orderDate));

      return (
        formatedOrderDate >= orderDateFilter.orderDateFrom &&
        formatedOrderDate <= orderDateFilter.orderDateTo
      );
    });

    setFilteredOrders(filteredOrders);

    console.log(orderDateFilter);
  }, [orderDateFilter]);

  const handleSubmit = (event) => {
    setOrderDateFilter([]);
    document.getElementById("myForm").reset();
  };

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

  const compareOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "America/Toronto",
  };

  var ordersList = filteredOrdersData;

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Orders</CCardHeader>
          <CCardBody>
            <CCard>
              <CCardHeader>Order date filter</CCardHeader>
              <CCardBody>
                <DateFilter
                  handleOnChange={(event) => handleOnChange(event)}
                  handleSubmit={handleSubmit}
                  topLabel="Order date filter"
                />
              </CCardBody>
            </CCard>

            <CDataTable
              items={filteredOrdersData}
              fields={fields}
              hover
              tableFilter
              sorter
              striped
              pagination
              itemsPerPageSelect
              itemsPerPage={5}
              clickableRows
              onRowClick={(item) => history.push(`/Orders/${item.id}`)}
              scopedSlots={{
                orderDate: (item) => (
                  <td className="align-middle">
                    {new Intl.DateTimeFormat("en-CA", displayOptions).format(
                      new Date(item.orderDate)
                    )}
                  </td>
                ),

                dropOffDate: (item) => (
                  <td className="align-middle">
                    {new Intl.DateTimeFormat("en-CA", displayOptions).format(
                      new Date(item.dropOffDate)
                    )}
                  </td>
                ),

                pickUpDate: (item) => (
                  <td className="align-middle">
                    {new Intl.DateTimeFormat("en-CA", displayOptions).format(
                      new Date(item.pickUpDate)
                    )}
                  </td>
                ),

                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),

              }}
            />
          </CCardBody>
        </CCard>
        <CButton color="primary" variant="outline" type="submit" class="btn btn-secondary" mr-1 mb-1>
          <CSVLink data={ordersList} separator={","}>Export orders list to CSV file</CSVLink>
        </CButton>
      </CCol>
    </CRow>
  );
};

export default Orders;
