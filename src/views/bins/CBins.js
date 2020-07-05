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
  CCardFooter
} from '@coreui/react'

import {CIcon} from  '@coreui/icons-react';
import BinClass from './BinClass';
import { CBinProvider } from '../../contexts/BinContext';
import CBinDelete from './CBinDelete';
import CBinUpdate from './CBinUpdate';

const binsAPI = require('./BinsAPI');

console.log("===============CBin====================");

//defining fields for the table 
const fields = [
  {
    key: 'update-delete',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  { 
      key: 'picture', 
     _style: { width: '15%'},
      sorter: false,
      filter: false
  },
  { key: 'wasteType',
   _style: { width: '10%'},
    filter: true },
  { key: 'capacity', _style: { width: '10%'} },
  { key: 'measurement', _style: { width: '10%'} },
  { key: 'dailyCost', _style: { width: '10%'} },
  { key: 'available', _style: { width: '5%'} },
  { key: 'amount', _style: { width: '5%'} },
  'description',
]


/// function returns component 
const CBins = () => {

//getting data and transform for use in the table  
useEffect(() => {
  axios.get(binsAPI.bins)
       .then((response) => {
        const transformedBinList = response.data.map(item => BinClass.from(item));
        setBinsList(transformedBinList);
        //console.log(trantformedBinList);
  }).catch (error=>setAlertMessage(error.message));
}, []);

const [ binsList, setBinsList] = useState([]);
const[currentBin,setCurrentBin] = useState({}); 
  
//define CRUD operations on binlist
const removeBin = (binId) => {
        console.log("Remove bin ",binId);
        axios.delete(binsAPI.bins+"/"+binId)
        .then((response)=>setBinsList(binsList.filter(bin=>!(bin.id===binId))))
        .catch(error=>setAlertMessage(error.message));
 };

const addBin = (bin) => {
          console.log("Add bin",bin);
          axios.post(binsAPI.bins, bin)
          .then(()=>setBinsList(binsList.push(bin)))
          .catch(error=>setAlertMessage(error.message));
    }

const updateBin = (bin) => {
      console.log("Update bin ",bin.id);
      let binIndex = binsList.findIndex((b => b.id === bin.id));
      binsList[binIndex] = bin;
      setBinsList([...binsList]); 
};
  
//all functions are set as context to pass to other components

const [ alertMessage, setAlertMessage] = useState('');

//states defining visibility of the helping CRUD forms
const [ deleteFormState,setDeleteFormState] = useState(false);
const [ addFormState,setAddFormState] = useState(false);
const [ updateFormState,setUpdateFormState] = useState(false);


//passing all CRUD function and current bin through context 
const binContextValue = {
      addBin:addBin,
      updateBin:updateBin,
      removeBin:removeBin,
      bin: currentBin,
    };

//Form Event handlers 

const handleDeleteButton = ()=>{
    console.log("Inside handle delete");
    console.log(currentBin);
    setDeleteFormState(true);
  }


const handleUpdateButton = ()=>{
    console.log("Inside handleUpdateButton");
    console.log(currentBin);
    setUpdateFormState(true);

}

const handleAddButton=()=>{
  console.log("Inside handleUpdateButton");
  console.log(currentBin);
  setAddFormState(true);
}



//return table component
   return (
    <> 
        <CCard>
          <CCardHeader>
              <h1>Our Bins</h1>
          </CCardHeader>
            <CCardBody>
            <CBinProvider value={binContextValue}>
            {deleteFormState &&<CBinDelete display = {true} setState={setDeleteFormState} bin={currentBin} />}
            {updateFormState &&<CBinUpdate display = {true} setState={setUpdateFormState} bin={currentBin} title={"Update Bin"} />}
            {addFormState &&<CBinUpdate display = {true} setState={setAddFormState} title={"Add new Bin"} />}
            
            <CDataTable className='display-linebreak'
              items={binsList}
              fields={fields}
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
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
                       <td className="align-middle"> {item.daily_cost}
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
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.amount}
                      </td>
                   )
                  },
                  'update-delete':
                    (item, index)=>{
                      return (
                        <td className="py-2 align-middle">
                          <CButtonGroup>
                            <CButton name ="update" onClick={()=>handleUpdateButton()}color={"primary"} variant={"ghost"}><CIcon name={'cilPencil'} /></CButton>
                            <CButton name="delete" onClick={()=>handleDeleteButton()} color={"danger"}  variant={"ghost"}><CIcon name={'cilBasket'} /></CButton>
                          </CButtonGroup>
                        </td>
                        )
                    },
                  
                }}
            />
            </CBinProvider>
            </CCardBody>
            <CCardFooter>
            <CButton name ="add" onClick={()=>handleAddButton()} color={"primary"} className='shadow p-3 mb-5' >Add new bin to catalog</CButton>
          </CCardFooter>
          </CCard>
    </>
  )
}

export default CBins
