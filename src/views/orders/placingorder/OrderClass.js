import * as Yup from 'yup';
import BinClass from '../../bins/BinClass'

const TAX_PERCENT=0.13;
class Order{
      orderNumber;
      client; //object with data about client
      orderDate;
      totalDays=0;
      dropOffDate; //timastamp
      dropOffTime;
      pickUpTime;
      pickUpDate; //timestamp
      deliveryAddress;
      subtotal;
      taxes;
      status;
      bins;//areay of bins
      pickUpDateTime;
      dropOffDateTime;

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

      getDays(){
          return (this.pickUpDate - this.dropOffDate);
      }

      calculateSubtotal(){
        this.subtotal = this.bins.forEach(bin=>(bin.calculatePrice())).reduce((subtotal, bin) =>(this.subtotal+bin.price) , 0);
      }

      calculateTaxes(){
          this.taxes = (this.subtotal*TAX_PERCENT).toFixed(2);
      }

      calculateTotal(){
        this.calculateSubtotal()
        this.calculateTaxes()
        this.total = this.taxes+this.subtotal;
      }

      calculateTotalDays(){
        if(!(this.pickUpDate.length==0||this.pickUpTime.length==0 ||this.dropOffDate.length==0 ||this.dropOffTime.length==0)){
            console.log("Calculating period")
                this.pickUpDateTime= new Date (this.pickUpDate +" "+ this.pickUpTime);//local host datetame
                this.dropOffDateTime= new Date (this.dropOffDate +" "+ this.dropOffTime);//local host datetame
                this.totalDays= Math.floor((this.pickUpDateTime.getTime()  - this.dropOffDateTime.getTime())/ (1000*60*60*24)) 
        }else{
            console.log("setting to 1")
            this.totalDays = 1;
        }
    
      }


//====Static validation
      static getDatesValidationSchema(){
        return Yup.object().shape({
            // dropOffDate: Yup.date().required().min(new Date()),
            // dropOffTime: Yup.string().required(),
            // pickUpDate : Yup.date().required().min(Yup.ref("dropOffDate")),
            // pickUpTime : Yup.string().required(),
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


class OrderedBin extends BinClass{
    //selected = the amount selected bins in order
    totalPrice=0;
    isSelected=false;
    selected=0;

    static from(json){
        return Object.assign(new OrderedBin(), json);
      }
    
    setAmount(num){
        this.selected=num;
        if (num>0){
            this.isSelected=true;
        }else this.isSelected=false;
    }

    calculateTotalPrice(days){
        
        this.totalPrice=(this.dailyCost*days*this.selected).toFixed(2);
        return this.totalPrice;
       // this.totalPrice = 5;
    }
   
    
}


export {OrderedBin};
export default Order;