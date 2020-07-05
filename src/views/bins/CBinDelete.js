import React, { useState, useContext } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,

} from '@coreui/react'

import CBinContext from '../../contexts/BinContext';


const CBinDelete = (props) => {
  
  const binsContext = useContext(CBinContext);
  const [display, setDisplay] = useState(props.display);

  const handleClose=()=>{
    console.log("inside handleClose of CBinDelete Modal");
    console.log(binsContext.bin);
    console.log(props);
    setDisplay(!display);
    props.setState(false);
  }
  const handleDelete=()=>{
    console.log("inside handleDelete of CBinDelete Modal");
    binsContext.removeBin(binsContext.bin.id);
    handleClose();
  }

  
  return (
        <CModal 
            show={display} 
            onClose={() => handleClose() }
            centered
            color= "danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Bin delition confirmation</CModalTitle>
              </CModalHeader>
              <CModalBody>
               Do you want to delete the bin? 
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() => handleDelete()}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => handleClose()}>Cancel</CButton>
              </CModalFooter>
            </CModal>
  
  )
}

export default CBinDelete 
