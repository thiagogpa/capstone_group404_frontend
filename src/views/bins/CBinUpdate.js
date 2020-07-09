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
import {useControlledComponents} from './useControlledComponents';
const CBinUpdate = (props) => {

  //the hook to control the changes in react form 
  let bin = {};
  const isNewBin=props.isNewBin;
  if(!isNewBin){
    bin = props.bin;
  }else{
    bin = new BinClass();
  }
  const [input, handleInputChange] = useControlledComponents(bin);
  const binsContext = useContext(CBinContext);
  
  const [display, setDisplay] = useState(props.display);
  const handleClose=()=>{
    setDisplay(!display);
    props.setState(false);
  }
  
  const handleSubmit=()=>{
    console.log("=====inside handleSubmit of CBinUpdate Form===");
    bin.wasteType = input.wasteType;
    bin.sizeHeight = input.sizeHeight;
    bin.sizeLong = input.sizeLong;
    bin.sizeWide = input.sizeWide;
    bin.available = input.available;
    bin.amount = input.amount;
    bin.picture =  input.picture;
    bin.dailyCost = input.dailyCost;
    bin.description = input.description;
    console.log(bin);
   
    if(isNewBin){
      console.log("Adding bin....");
      binsContext.addBin(bin);  
    }else{
            binsContext.updateBin(bin);   
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
            
              {!isNewBin &&<CFormGroup row>
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
              <CSelect name="wasteType" id="wasteType" onChange={handleInputChange}>
              {isNewBin &&<option value="0">Please select</option>}
                  <option  {...(bin.wasteType=="CONSTRUCTION" ? {selected:true} : {})}
                            value="CONSTRUCTION">CONSTRUCTION</option>
                  <option { ...(bin.wasteType=="MIXED WASTE" ? {selected:true} :{})} 
                                value="MIXED WASTE">MIXED WASTE</option>
                  <option { ...(bin.wasteType=="CLEAN FILL" ? {selected:true} :{})} 
                                value="CLEAN FILL">CLEAN FILL</option>
              </CSelect>
              </CCol>
            </CFormGroup>


             <CFormGroup row>
                    <CCol md={2}>
                       <CLabel htmlFor="dailyCost">Daily Cost</CLabel>
                    </CCol>
                   <CCol xs="3" md="3" >
                        <CInput id="dailyCost" 
                            name="dailyCost"
                            defaultValue={bin.dailyCost}
                            onChange={handleInputChange} />
                    </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md={2}>
                    <CLabel htmlFor="amount">Amount</CLabel>
                </CCol>
                <CCol xs="3" md="3" >
                    <CInput id="amount" 
                            name="amount" 
                            defaultValue={bin.amount}
                            onChange={handleInputChange} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md={2}>
                    <CLabel htmlFor="available">Available</CLabel>
                </CCol>
                <CCol xs="3" md="3" >
                    <CInput id="available" 
                            name="available" 
                            defaultValue={bin.available}
                            onChange={handleInputChange} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>   
            <CCol md="2">
                    <CLabel>Size(feet):</CLabel>
                </CCol>
                    <CCol xs="3" md="1" >
                    <CInput id="sizeLong" name="sizeLong" 
                            defaultValue={bin.sizeLong}
                            onChange={handleInputChange}/>
                    <CFormText>Length</CFormText>
                    </CCol>X
                    <CCol xs="4" md="1">
                    <CInput id="sizeWide" name="sizeWide" 
                            defaultValue={bin.sizeWide}
                            onChange={handleInputChange}/>
                    <CFormText>Width</CFormText>
                    </CCol>X
                    <CCol xs="4" md="1">
                    <CInput id="sizeHeight" name="sizeHeight" 
                            defaultValue={bin.sizeHeight}
                            onChange={handleInputChange}/>
                    <CFormText>Length</CFormText>
                    </CCol>
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
                    defaultValue={bin.description}
                    onChange={handleInputChange} 
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                    <CCol md={2}>
                    <CLabel htmlFor="picture">Picture</CLabel>
                    </CCol>
                    <CCol xs="3" md="6" >
                    <CInput id="picture" name="picture" 
                            defaultValue={bin.picture}
                            onChange={handleInputChange}  />
           
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
