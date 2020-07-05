import React, { useState, useContext } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CLabel,
  CSelect,
} from '@coreui/react'

import CBinContext from '../../contexts/BinContext';
import BinClass from './BinClass';
const CBinUpdate = (props) => {
  
  const binsContext = useContext(CBinContext);
  let bin = {};
  let newBinFlag=false;
  if(props.bin){
    bin = props.bin;
  }else{
    newBinFlag = true;
    bin = new BinClass();
  }

  const [display, setDisplay] = useState(props.display);

  const handleClose=()=>{
    console.log("inside handleClose of CBinDelete Modal");
    console.log(props);
    setDisplay(!display);
    props.setState(false);
  }
  const handleSubmit=()=>{
    console.log("inside handleDelete of CBinDelete Modal");
    if(binsContext.updateBin){
        binsContext.updateBin(bin);
    }
    if(binsContext.addBin){
        binsContext.updateBin(bin)
    }
    handleClose();
  }

  
  return (
        <CModal 
            show={display} 
            onClose={() => handleClose() }
            size = "lg"
            color= "primary"
            >
              <CModalHeader closeButton>
                <CModalTitle>{props.title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                
              <CForm action="" method="post"  className="form-horizontal">
            
              {!newBinFlag &&<CFormGroup row>
                <CCol md="1">
                  <CLabel>Bin ID:</CLabel>
                </CCol>
                <CCol xs="12" md="2">
                  <p className="form-control-static">{bin.id}</p>
                </CCol>
              </CFormGroup>
             }

              <CFormGroup row>
                    <CCol md={2}>
                    <CLabel htmlFor="select">Waste Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="7">
                    <CSelect custom name="wasteType" id="select" value = {bin.wasteType}>
                        <option value="0">Please select</option>
                        <option value="CONSTRACTION">CONSTRACTION</option>
                        <option value="MIXED WASTE">MIXED WASTE</option>
                        <option value="CLEAN FILL">CLEAN FILL</option>
                    </CSelect>
                    </CCol>
            </CFormGroup>


            <CFormGroup row>
                    <CCol md={2}>
                    <CLabel htmlFor="dailyCost">Daily Cost</CLabel>
                    </CCol>
                   
                    <CCol xs="3" md="3" >
                    <CInput id="dailyCost" name="dailyCost" value={bin.dailyCost} />
           
                    </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md={2}>
                <CLabel htmlFor="amount">Amount</CLabel>
                </CCol>
                <CCol xs="3" md="3" >
                <CInput id="amount" name="amount" value={bin.amount} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>   
            <CCol md="2">
                    <CLabel>Size(feet):</CLabel>
                </CCol>
                    <CCol xs="3" md="1" >
                    <CInput id="text-input" name="sizeLong" value={bin.sizeLong}  placeholder="Size Long " />
                    <CFormText>Length</CFormText>
                    </CCol>X
                    <CCol xs="4" md="1">
                    <CInput id="text-input" name="sizeWide" value={bin.sizeWide}  placeholder="Size Wide " />
                    <CFormText>Width</CFormText>
                    </CCol>X
                    <CCol xs="4" md="1">
                    <CInput id="text-input" name="sizeHeight" value={bin.sizeHeight}  placeholder="Size Height " />
                    <CFormText>Length</CFormText>
                    </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="textarea-input">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea 
                    name="textarea-input" 
                    id="textarea-input" 
                    rows="9"
                    placeholder="Description..."
                    value={bin.description} 
                  />
                </CCol>
              </CFormGroup>
              
              <CFormGroup row>
                <CLabel col md={2}>Bin picture</CLabel>
                <CCol xs="12" md="8">
                  <CInputFile custom id="custom-file-input"/>
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    Select file...
                  </CLabel>
                </CCol>
              </CFormGroup>
            </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={() => handleSubmit()}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => handleClose()}>Cancel</CButton>
              </CModalFooter>
            </CModal>
  
  )
}

export default CBinUpdate 
