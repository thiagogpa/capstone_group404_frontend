import React,{useEffect,useState} from 'react';
import CInputFormik from '../../components/CInputFormik';
import axios from "axios";
import OrderedBin from "./OrderClass";

import { useFormikContext, FieldArray } from 'formik';


import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CImg
} from '@coreui/react'


console.log("===============Bins====================");

// input fields isSelected(checkbox) and selected(number) are synchronized
//if isSelected is chosed, then selected is set to 1
//if selected is set to a number more then 0 , then isSelected is set


//defining fields for the table 
const fields = [
  {
    key: 'isSelected',
    label: " ",
    _style: { width: '8%' },
    sorter: true,
    filter: false
  },  
  'description',
  {
    key: 'wasteType',
    _style: { width: '10%' },
    filter: true
  },
  { key: 'capacity', _style: { width: '7%' } },
  { key: 'measurement', _style: { width: '10%' } },
  { key: 'dailyCost', _style: { width: '5%' } },
  { key: 'available', _style: { width: '5%' } },
  {
    key: 'selectedInput',
    label: 'Select amount',
    _style: { width: '15%' },
    sorter: false,
    filter: false
  },
  {
    key: 'subtotal',
    label: 'Subtotal',
    _style: { width: '15%' },
    sorter: true,
    filter: false
  }
]


/// function returns component 
const CBins = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const { values, handleChange, setFieldValue, setFieldTouched } = useFormikContext();
  let axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },


    
    baseURL: process.env.REACT_APP_BACKEND,
  });

  useEffect(() => {
    console.log("Searching for available bins");
    console.log(values.dropOffDateTime);
    console.log(values.pickUpDateTime);
    axiosInstance
      .post("/api/bin/available", {
        dateFrom: values.dropOffDateTime,
        dateTo: values.pickUpDateTime,
      })
      .then((response) => {
        values.bins = response.data.map((item) => {
          let bin = OrderedBin.from(item);
          bin.selected = 0;
          bin.isSelected = false;
          bin.totalPrice = 0;
          return bin;
        });
        for (let i = 0; i < values.bins.length; i++) {
          values.bins[i].index = i;
        }
      })
      .catch((error) => setAlertMessage(error.message));
  }, []);




  //cusomized change handlers to synchronize selected and isSelected Fields 
  //amount selected input number onChange handler 
  const handleSelected = (event, index) => {
    handleChange(event);
  
    if (event.target.value > 0) {
      setFieldValue(`bins[${index}].isSelected`, true, false);
    } else {
      setFieldValue(`bins[${index}].isSelected`, false, false);
    }
  }

  //isSelected checkbox onChange handler
  const handleIsSelected = (event, index) => {
    handleChange(event);
    //the previous state value of isSelected-- find out wth
    if (!values.bins[index].isSelected) {
      setFieldValue(`bins[${index}].selected`, 1, false)
      setFieldTouched(`bins[${index}].selected`, true, true)
    } else {
      setFieldValue(`bins[${index}].selected`, 0, false)
    }


  }

return (
  <FieldArray
    name="bins"
    render={() => (
      <CCard>
        <CCardBody>
          <CDataTable
            items={values.bins}
            fields={fields}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={3}
            hover
            sorter
            pagination
            striped
            sorter
            scopedSlots={{
              'available':
                (item) => (
                  <td className="align-middle">
                    <CBadge color={item.available > 0 ? "success" : "danger"}>
                      {item.available}
                    </CBadge>
                  </td>
                ),              
              'wasteType':
                (item) => {
                  return (
                    <td className="align-middle"> {item.wasteType}
                    </td>
                  )
                },
              'capacity':
                (item) => {
                  return (
                    <td className="align-middle"> {item.getCapacity() + " yards"}
                    </td>
                  )
                },
              'measurement':
                (item) => {
                  return (
                    <td className="align-middle"> {item.getMeasurementString()}
                    </td>
                  )
                },
              'dailyCost':
                (item) => {
                  return (
                    <td className="align-middle"> {item.dailyCost}
                    </td>
                  )
                },
              'description':
                (item) => {
                  return (
                    <td className="align-middle"> {item.description}
                    </td>
                  )
                },
                'subtotal':
                (item) => {
                  return (
                   
                    <td className="align-middle">
                    {item.calculateTotalPrice(values.totalDays)}
                    </td>
                  )
                },
              'selectedInput':
                (item) => {
                  return (
                  
                    <td className="py-2 align-middle">
                      <CInputFormik xs="4" md="1" type="number"
                        name={`bins[${item.index}].selected`}
                        reset={values.bins[item.index].selected < 1}
                        onChange={(event) => handleSelected(event, item.index)}
                      />
                    </td>
                  )
                },
              'isSelected':
                (item, index) => {
                  return (
                    <td className="py-2 align-middle">
                    <CInputFormik type="checkbox"
                        name={`bins[${item.index}].isSelected`}
                        reset={!values.bins[item.index].isSelected}
                        onChange={(event)=>handleIsSelected(event,item.index)}
                        checked={values.bins[item.index].selected > 0}

                      />
                    </td>
                  )
                },
            }}
          />
        </CCardBody>
      </CCard>)
    } />
)
      }

export default CBins
