
// import React,{useState} from 'react';
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CDataTable,
//   CButton,
//   CImg,
//   CButtonGroup,
//   CCardFooter,
//   CInput
// } from '@coreui/react'

// import {CIcon} from  '@coreui/icons-react';
// import binsData from './BinsData'


// const fields = [
//   { 
//       key: 'picture', 
//      _style: { width: '10%'},
//       sorter: false,
//       filter: false
//   },
//   { key: 'waste_type', _style: { width: '10%'} },
//   { key: 'capacity', _style: { width: '10%'} },
//   { key: 'daily_cost', _style: { width: '10%'} },
//   { key: 'description', _style: { width: '15%'} },
//   {key: 'amount', _style: { width: '3%'}},
//   {
//     key: 'add',
//     label: '',
//     _style: { width: '1%' },
//     sorter: false,
//     filter: false
//   },

  
// ]


// const CBinPickerForm = () => {
//    return (
//     <> 
//         <CCard>
//             <CCardBody>
//             <CDataTable className='display-linebreak'
//               items={binsData}
//               fields={fields}
//               tableFilter
//               itemsPerPageSelect
//               itemsPerPage={5}
//               hover
//               sorter
//               pagination
//               striped
//               scopedSlots = {{
//                   'picture':
//                   (item)=>{
//                    return(
//                        <td> <CImg
//                        src={item.picture}
//                        className={"mb-3 shadow p-3 bg-white rounded"}
//                        height={80}
//                      /></td>
//                    )
//                   },
//                   'waste_type':
//                   (item)=>{
//                    return(
//                        <td className="align-middle"> {item.waste_type}
//                       </td>
//                    )
//                   },
//                   'capacity':
//                   (item)=>{
//                    return(
//                        <td className="align-middle"> {item.capacity + " yards"}
//                       </td>
//                    )
//                   },
//                   'measurement':
//                   (item)=>{
//                    return(
//                        <td className="align-middle"> {item.measurement}
//                       </td>
//                    )
//                   },
//                   'daily_cost':
//                   (item)=>{
//                    return(
//                        <td className="align-middle"> {item.daily_cost}
//                       </td>
//                    )
//                   },
//                   'description':
//                   (item)=>{
//                    return(
//                        <td className="align-middle"> {item.description}
//                       </td>
//                    )
//                   },
//                   'amount':
//                   (item)=>{
//                    return(
//                        <td className="align-middle">
//                        <CInput
//                        type="number"
//                        id="amount"
//                        name="amount"
//                      />
//                       </td>
//                    )
//                   },
//                   'add':
//                     (item, index)=>{
//                       return (
//                         <td className="py-2 align-middle">
//                             <CButton name ="edit" color={"primary"}>Add</CButton>
//                         </td>
//                         )
//                     },
                  
//                 }}
//             />
//             </CCardBody>
//           </CCard>
//     </>
//   )
// }

// export default CBinPickerForm
