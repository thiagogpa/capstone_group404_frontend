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



const OrdersList = ({ordersList, handleOrderClick}) => {

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

  const history = useHistory();

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

  return (
    <CDataTable
      items={ordersList}
      fields={fields}
      hover
      tableFilter
      sorter
      striped
      pagination
      itemsPerPageSelect
      itemsPerPage={5}
      clickableRows
      onRowClick={handleOrderClick}
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
  );
};

export default OrdersList;
