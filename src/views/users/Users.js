import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import axios from "axios";

//import usersData from './UsersData'

const getBadge = staff => {
  switch (staff) {
    case 'true': return 'primary'
    case 'false': return 'success'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [usersData, setUsers] = useState([]);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

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

  return (
    <CRow>
      <CCol >
        <CCard>
          <CCardHeader>
            Users
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={[
              { key: 'firstName', _classes: 'font-weight-bold' },
              'lastName', 'email', { key: 'staff', label: 'Role' },
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'staff':
                (item)=>(
                  <td>
                    {checkStaff(item)}
                  </td>
                  
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
