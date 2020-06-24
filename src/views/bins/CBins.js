import React,{useState} from 'react';
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
import binsData from './BinsData'


const getBadge = availability => {
  if (availability > 0 ) {
    return 'success';
  }else{
    return 'danger'
  }
}

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
  { key: 'waste_type', _style: { width: '10%'} },
  { key: 'capacity', _style: { width: '10%'} },
  { key: 'measurement', _style: { width: '10%'} },
  { key: 'daily_cost', _style: { width: '10%'} },
  { key: 'availability', _style: { width: '5%'} },
  'description',
]


const CBins = () => {
   return (
    <> 
        <CCard>
          <CCardHeader>
              <h1>Our Bins</h1>
          </CCardHeader>
            <CCardBody>
            <CDataTable className='display-linebreak'
              items={binsData}
              fields={fields}
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              striped
              scopedSlots = {{
                'availability':
                  (item)=>(
                    <td className="align-middle">
                      <CBadge color={getBadge(item.availability)}>
                        {item.availability}
                      </CBadge>
                    </td>
                  ),
                  'picture':
                  (item)=>{
                   return(
                       <td> <CImg
                       src={item.picture}
                       className={"mb-3 shadow p-3 bg-white rounded"}
                       height={80}
                     /></td>
                   )
                  },
                  'waste_type':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.waste_type}
                      </td>
                   )
                  },
                  'capacity':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.capacity + " yards"}
                      </td>
                   )
                  },
                  'measurement':
                  (item)=>{
                   return(
                       <td className="align-middle"> {item.measurement}
                      </td>
                   )
                  },
                  'daily_cost':
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
                  'update-delete':
                    (item, index)=>{
                      return (
                        <td className="py-2 align-middle">
                          <CButtonGroup>
                            <CButton name ="edit" color={"primary"} variant={"ghost"}><CIcon name={'cilPencil'} /></CButton>
                            <CButton name="delete" color={"danger"}  variant={"ghost"}><CIcon name={'cilBasket'} /></CButton>
                          </CButtonGroup>
                        </td>
                        )
                    },
                  
                }}
            />
            </CCardBody>
            <CCardFooter>
            <CButton name ="edit" color={"primary"} className='shadow p-3 mb-5' >Add new bin to catalog</CButton>
          </CCardFooter>
          </CCard>
    </>
  )
}

export default CBins
