import React, { useState, useEffect } from "react";

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

export default function DateFilter({ handleOnChange, handleSubmit , topLabel}) {
  return (
    <div>
      <Form noValidate onSubmit={handleSubmit}>
        <CForm inline id="myForm">
          <CFormGroup className="pr-1">
            <CLabel htmlFor={topLabel} className="pr-1">
              From
            </CLabel>
            <CInput
              type="date"
              id="orderDateFrom"
              placeholder="date"
              onChange={handleOnChange}
            />
          </CFormGroup>

          <CFormGroup className="pr-1">
            <CLabel htmlFor="OrderDateTo" className="pr-1">
              To
            </CLabel>
            <CInput
              type="date"
              id="orderDateTo"
              placeholder="date"
              onChange={handleOnChange}
            />
          </CFormGroup>

          <CButton color="secondary" variant="outline" type="submit">
            Clear
          </CButton>
        </CForm>
      </Form>
    </div>
  );
}
