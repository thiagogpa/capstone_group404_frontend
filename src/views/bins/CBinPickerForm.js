import React,{useState, useEffect} from 'react';
import axios from 'axios'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CImg,
  CButtonGroup,
  CCardFooter,
  CInput,
  CInputCheckbox,
  CForm,
  CFormGroup
} from '@coreui/react'

import {CIcon} from  '@coreui/icons-react';
import BinClass from './BinClass';
import { CBinProvider } from '../../contexts/BinContext';

console.log("===============CBin====================");

//defining fields for the table 
const fields = [
     { 
      key: 'picture', 
      label: " ",
     _style: { width: '15%'},
      sorter: false,
      filter: false
  },
  'description',
  { key: 'wasteType',
   _style: { width: '10%'},
    filter: true },
  { key: 'capacity', _style: { width: '7%'} },
  { key: 'measurement', _style: { width: '10%'} },
  { key: 'dailyCost', _style: { width: '5%'} },
  { key: 'available', _style: { width: '5%'} },
  {
    key: 'amount',
    label: 'Select amount',
    _style: { width: '15%' },
    sorter: false,
    filter: false
  }
]


/// function returns component 
const CBins = () => {

let axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: process.env.REACT_APP_BACKEND,
  }); 
//getting data and transform for use in the table  
useEffect(() => {
  axiosInstance.get("/api/bin")
       .then((response) => {
        const transformedBinList = response.data.map(item => BinClass.from(item));
        setBinsList(transformedBinList);
        //console.log(trantformedBinList);
  }).catch (error=>setAlertMessage(error.message));
}, []);


const [ binsList, setBinsList] = useState([]);
const[currentBin,setCurrentBin] = useState({}); 
  
const [ alertMessage, setAlertMessage] = useState('');

const handleSelectBin = ()=>{
    console.log("Inside handle delete");
    console.log(currentBin);
}


   return (
    <> 
        <CDataTable
              items={binsList}
              fields={fields}
              tableFilter
              itemsPerPageSelect
              itemsPerPage={3}
              hover
              sorter
              pagination
              striped
              onRowClick = {(bin)=>{ setCurrentBin(bin)}}
              scopedSlots = {{
                'available':
                  (item)=>(
                    <td className="align-middle">
                      <CBadge color={item.available>0? "success":"danger"}>
                        {item.available}
                      </CBadge>
                    </td>
                  ),
                  'picture':
                  (item)=>{
                   return(
                       <td> <CImg
                       src={item.getPicturePath(process.env.PUBLIC_URL+'/bins/')}
                       className={"mb-3 shadow p-3 bg-white rounded"}
                       height={80}
                     /></td>
                   )
                  },
                  'wasteType':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.wasteType}
                      </td>
                   )
                  },
                  'capacity':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.getCapacity() + " yards"}
                      </td>
                   )
                  },
                  'measurement':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.getMeasurementString()}
                      </td> 
                   )
                  },
                  'dailyCost':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.dailyCost}
                      </td>
                   )
                  },
                  'description':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.description}
                      </td>
                   )
                  },
                  'amount':
                    (item, index)=>{
                      return (
                        <td className="py-2 align-middle">
                            <CForm inline>
                            <CFormGroup row>
                            <CInput name="amount" xs="4" md="1"></CInput>
                            <CInputCheckbox name="selected" onSelect={handleSelectBin} ></CInputCheckbox>
                            </CFormGroup>
                            </CForm>
                        </td>
                        )
                    },
                  
                }}
            />

    </>
  )
}

export default CBins
