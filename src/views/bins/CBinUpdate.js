import React, { useState, useContext } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CInputFile,
  CLabel,
  CSelect,
  CValidFeedback,
  CInvalidFeedback,
} from "@coreui/react";

import CBinContext from "../../contexts/BinContext";
import BinClass from "./BinClass";
//import {useControlledComponents} from './useControlledComponents';

//component form to add/update a bin

const CBinUpdate = (props) => {
  //initializing bin
  let bin = {};
  const isNewBin = props.isNewBin;
  if (!isNewBin) {
    bin = props.bin;
  } else {
    bin = new BinClass();
  }

  //CRUD operations and visibility setting are passed through context
  const binsContext = useContext(CBinContext);
  const [display, setDisplay] = useState(props.display);
  const handleClose = () => {
    setDisplay(!display);
    props.setState(false);
  };

  //this function handles submission
  const handleFormSubmit = (values) => {
    console.log("=====inside handleSubmit of CBinUpdate Form===");
    bin.updateBin(values);
    console.log(bin);

    if (isNewBin) {
      console.log("Adding bin....");
      console.log(bin)
      binsContext.addBin(bin);
    } else {
      binsContext.updateBin(bin);
    }
    handleClose();
  };

  return (
    <>
      <Formik
        initialValues={bin}
        onSubmit={(data) => {
          console.log("on submit");
          console.log(data);
          handleFormSubmit(data);
        }}
        validationSchema={BinClass.getValidationSchema()}
      >
        {({
          touched,
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          // console.log("======FORMIK FORM HANDLING=======")
          // console.log("values:" + values);
          // console.log("errors:" + errors);
          return (
            <CModal
              show={display}
              onClose={() => handleClose()}
              size="lg"
              color="primary"
            >
              <CModalHeader closeButton>
                <CModalTitle>{props.title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm
                  onSubmit={handleSubmit}
                  method="post"
                  className="form-horizontal"
                >
                  {!isNewBin && (
                    <CFormGroup row>
                      <CCol md="2">
                        <CLabel>Bin ID:</CLabel>
                      </CCol>
                      <CCol xs="12" md="2">
                        <p className="form-control-static">{bin.id}</p>
                      </CCol>
                    </CFormGroup>
                  )}

                  <CFormGroup row>
                    <CCol md={2}>
                      <CLabel htmlFor="select">Waste Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="7">
                      <CSelect
                        name="wasteType"
                        invalid={!!errors.wasteType && touched.wasteType}
                        onChange={handleChange}
                      >
                        {isNewBin && <option value="0">Please select</option>}
                        <option
                          {...(values.wasteType == "CONSTRUCTION"
                            ? { selected: true }
                            : {})}
                          value="CONSTRUCTION"
                        >
                          CONSTRUCTION
                        </option>
                        <option
                          {...(values.wasteType == "MIXED WASTE"
                            ? { selected: true }
                            : {})}
                          value="MIXED WASTE"
                        >
                          MIXED WASTE
                        </option>
                        <option
                          {...(values.wasteType == "CLEAN FILL"
                            ? { selected: true }
                            : {})}
                          value="CLEAN FILL"
                        >
                          CLEAN FILL
                        </option>
                      </CSelect>
                      <CInvalidFeedback>{errors.wasteType}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md={2}>
                      <CLabel htmlFor="dailyCost">Daily Cost</CLabel>
                    </CCol>
                    <CCol xs="3" md="3">
                      <CInput
                        name="dailyCost"
                        defaultValue={values.dailyCost}
                        onChange={handleChange}
                        invalid={!!errors.dailyCost && touched.dailyCost}
                      />
                      <CValidFeedback>Cool! Input is valid</CValidFeedback>
                      <CInvalidFeedback>{errors.dailyCost}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md={2}>
                      <CLabel htmlFor="amount">Amount</CLabel>
                    </CCol>
                    <CCol xs="3" md="3">
                      <CInput
                        name="amount"
                        defaultValue={values.amount}
                        onChange={handleChange}
                        invalid={!!errors.amount && touched.amount}
                      />
                      <CInvalidFeedback>{errors.amount}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Size(feet):</CLabel>
                    </CCol>
                    <CCol xs="3" md="1">
                      <CInput
                        id="sizeLong"
                        name="sizeLong"
                        defaultValue={values.sizeLong}
                        onChange={handleChange}
                        invalid={errors.sizeLong && touched.sizeLong}
                      />
                      <CFormText>Length</CFormText>
                      <CInvalidFeedback>{errors.sizeLong}</CInvalidFeedback>
                    </CCol>
                    X
                    <CCol xs="4" md="1">
                      <CInput
                        id="sizeWide"
                        name="sizeWide"
                        defaultValue={values.sizeWide}
                        onChange={handleChange}
                        invalid={errors.sizeWide && touched.sizeWide}
                      />
                      <CFormText>Width</CFormText>
                      <CInvalidFeedback>{errors.sizeWide}</CInvalidFeedback>
                    </CCol>
                    X
                    <CCol xs="4" md="1">
                      <CInput
                        id="sizeHeight"
                        name="sizeHeight"
                        defaultValue={values.sizeHeight}
                        onChange={handleChange}
                        invalid={errors.sizeHeight && touched.sizeHeight}
                      />
                      <CFormText>Length</CFormText>
                      <CInvalidFeedback>{errors.sizeHeight}</CInvalidFeedback>
                    </CCol>
                    <CInvalidFeedback>
                      {errors.sizeLong}
                      <br />
                      {errors.sizeHeight}
                      <br />
                      {errors.sizeWide}
                    </CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="description">Description</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="description"
                        id="description"
                        rows="9"
                        placeholder="Description..."
                        defaultValue={values.description}
                        onChange={handleChange}
                        invalid={errors.description && touched.description}
                      />
                      <CInvalidFeedback>{errors.description}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter>
                <CButton
                  type="submit"
                  onClick={() => handleSubmit()}
                  color="primary"
                >
                  Submit
                </CButton>{" "}
                <CButton color="secondary" onClick={() => handleClose()}>
                  Cancel
                </CButton>
              </CModalFooter>
            </CModal>
          );
        }}
      </Formik>
    </>
  ); //end of return
};
export default CBinUpdate;
