import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import axios from "axios";

const getBadge = (staff) => {
  switch (staff) {
    case "true":
      return "primary";
    case "false":
      return "success";
    default:
      return "primary";
  }
};

const Users = () => {
  const history = useHistory();

  const [usersData, setUsers] = useState([]);


  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance.get("/api/user").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const checkStaff = (value) => {
    return value.staff === true ? (
      <CBadge color={getBadge(value.staff.toString())}>Staff</CBadge>
    ) : (
      <CBadge color={getBadge(value.staff.toString())}>Client</CBadge>
    );
  };

  const fields = [
    {
      key: "firstName",
      _classes: "font-weight-bold",
      sorter: true,
      filter: true,
    },
    {
      key: "lastName",
      sorter: true,
      filter: true,
    },
    {
      key: "email",
      sorter: true,
      filter: true,
    },
    {
      key: "staff",
      label: "Role",
      sorter: true,
      filter: false,
    },
  ];

  
  const handleChange = (event) => {};

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              columnFilter
              sorter              
              striped
              pagination
              itemsPerPage={10}              
              clickableRows
              onColumnFilterChange={(event) => handleChange(event)}
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                staff: (item) => <td>{checkStaff(item)}</td>,
              }}
            />

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
