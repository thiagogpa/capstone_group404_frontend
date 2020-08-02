import React,{useState, useEffect} from 'react';


const OrderConfirmation = (props) => {
  return (
      <div>
        <h3>Order confirmation</h3>
        <p>Your order # {props.order.orderId} was successfully placed</p>

      </div>
  )
}

export default OrderConfirmation
