import * as Yup from 'yup';

class Order{
      orderNumber;
      client; //object with data about client
      orderDate;
      dropOffDate; //timastamp
      dropOffTime;
      pickUpTime;
      pickUpDate; //timestamp
      deliveryAddress;
      subtotal;
      taxes;
      status;
      bins;//areay of bins
      constructor(jsonOrder = {}) {
        Object.assign(this, jsonOrder);
       }
      addBin(bin,amount){
          this.bins.push({bin:bin,
                          amount:amount});
      }
      setPickUpDate(date){
          this.pickUpDate = date;
      }
      setOrderDate(){
          this.orderDate = new Date();
      }

      static getDatesValidationSchema(){
        return Yup.object().shape({
            dropOffDate: Yup.date().min(new Date()),
            pickUpDate : Yup.date().min(new Date())
        });
    }
        static getBinsValidationSchema(){
            return Yup.object().shape({
        });
      }
      static getAddressValidationSchema(){
        return Yup.object().shape({
    });
}
    static getCreditCardValidationSchema(){
        return Yup.object().shape({
    });
  }
 


}
export default Order;