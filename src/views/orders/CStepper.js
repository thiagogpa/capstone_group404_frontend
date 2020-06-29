import React, { useState, useReducer, useContext} from 'react';
import { CDataTable, CBadge, CButton, CCollapse, CCardBody,CImg} from '@coreui/react'; 
import COrderDatesForm from './COrderDatesForm';
import CBinPickerForm from '../bins/CBinPickerForm';
import COrderAddressForm from './COrderAddressForm';

import COrderSummary from './COrderSummary';
import OrderContext from '../../contexts/OrderContext';



class Order { 
    client={};
    order_date = '';//today
    drop_off_date= '';//date
    pick_up_date="" ;
    subtotal= '';
    taxes='';
    status_id;
    bins=[];

}

const order = {
    client:{
        id:123,
        fname: 'Hans',
        lname: "Gretel",
    },
    
    order_date : '39-Jun-2020',
    drop_off_date : '04-Aug-2020',
    pick_up_date : '10-Aug-2020',
    subtotal: '',
    taxes: '',
    status_id: 'pending',
    bins: [],
}

const STEP_MAX = 4;
const STEP_MIN = 1;


function stepReducer(step, action) {
     switch (action) {
      case 'prev':
        return step - 1;
      case 'next':
        return step + 1;
      case 'reset':
        return STEP_MIN;
      default:
        throw new Error();
    }
  }


const CStepper =()=> {

    // const [, setStep] = useState(STEP_MIN);
    const [step, dispatchStep] = useReducer(stepReducer, STEP_MIN);
    const [order, setOrder]=useState(new Order());

    const  handleChange = (input) => e => {
        console.log("INSIDE THE HANDLE CHANGE")
        console.log(input);
        console.log(e.target.value);

        // order[input]=e.target.value;
        // setOrder(order);
    }
    
    return(
            <>
            <OrderContext.Provider value={order}>
                    <h2>Placing an order. Step {step} of {STEP_MAX}</h2>
                    <CStep step={step} handleChange={handleChange}/>
                <div>
                {step > STEP_MIN &&
                    <button className="Back" onClick={() => dispatchStep("prev")}>
                        « Back
                    </button>
                }
                {step < STEP_MAX &&
                    <button className="Next" onClick={() => dispatchStep("next")}>
                        Next »
                    </button>
                }
                </div>
            </OrderContext.Provider>
            </>
        );
}


const CStep = (props) => {
    const order = useContext(OrderContext);
    if(props.step === 1)
        return (
            <COrderDatesForm handleChange={props.handleChange}/>);
    if(props.step === 2)
        return (<CBinPickerForm
            handleChange={props.handleChange}
        />);
    if(props.step === 3)
       return (<COrderAddressForm
            handleChange={props.handleChange}
        />);
    if(props.step === 4)
        return (<COrderSummary 
            handleChange={props.handleChange}
               />);
}
export default CStepper