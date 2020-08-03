import * as Yup from "yup";
import BinClass from "../../bins/BinClass";
//have to add address class translation here as well as userClass
const TAX_PERCENT = 0.13;
class Order {
  orderNumber;
  client; //object with data about client
  orderDate;
  totalDays = 0;
  dropOffDate; //timastamp
  dropOffTime;
  pickUpTime;
  pickUpDate; //timestamp
  deliveryAddress;
  subtotal = 0;
  taxes = 0;
  total = 0;
  status;
  //bins=[];
  ordersBins = []; //array of bins
  pickUpDateTime;
  dropOffDateTime;

  constructor(jsonOrder = {}) {
    Object.assign(this, jsonOrder);
  }

  setPickUpDate(date) {
    this.pickUpDate = date;
  }
  setOrderDate() {
    this.orderDate = new Date();
  }

  calculateSubtotal() {
    console.log("Calculating order subtotal");
    console.log(this.ordersBins);
    console.log(this.totalDays);
    if (this.totalDays === 0) this.calculateTotalDays();
    this.ordersBins.forEach((bin) => bin.calculateTotalPrice(this.totalDays));
    this.subtotal = this.ordersBins.reduce(
      (subtotal, bin) => subtotal + bin.totalPrice,
      0
    );
    this.subtotal = Math.round(this.subtotal * 100) / 100;
    console.log("Subtotal: " + this.subtotal);
    return this.subtotal;
  }

  calculateTaxes() {
    this.taxes = Math.round(this.subtotal * TAX_PERCENT * 100) / 100;
  }

  calculateTotal() {
    this.calculateSubtotal();
    this.calculateTaxes();
    this.total = Math.round((this.taxes + this.subtotal) * 100) / 100;
  }

  calculateTotalDays() {
    if (
      !(
        this.pickUpDate.length === 0 ||
        this.pickUpTime.length === 0 ||
        this.dropOffDate.length === 0 ||
        this.dropOffTime.length === 0
      )
    ) {
      console.log("Calculating period");
      this.pickUpDateTime = new Date(this.pickUpDate + " " + this.pickUpTime); //local host datetame
      this.dropOffDateTime = new Date(
        this.dropOffDate + " " + this.dropOffTime
      ); //local host datetame
      this.totalDays = Math.floor(
        (this.pickUpDateTime.getTime() - this.dropOffDateTime.getTime()) /
          (1000 * 60 * 60 * 24)
      );
    } else {
      console.log("setting to 1");
      this.totalDays = 1;
    }
  }

  //====Static validation
  static getDatesValidationSchema() {
    return Yup.object().shape({
      dropOffDate: Yup.date().required().min(new Date()),
      dropOffTime: Yup.string().required(),
      pickUpDate: Yup.date().required().min(Yup.ref("dropOffDate")),
      pickUpTime: Yup.string().required(),
    });
  }
  static getBinsValidationSchema() {
    return Yup.object().shape({});
  }
  static getAddressValidationSchema() {
    return Yup.object().shape({
      address: Yup.mixed().required(),
    });
  }
  static getCreditCardValidationSchema() {
    return Yup.object().shape({});
  }
}

class OrderedBin extends BinClass {
  //selected = the amount selected bins in order
  totalPrice = 0;
  isSelected = false;
  selected = 0;

  static from(json) {
    return Object.assign(new OrderedBin(), json);
  }

  setAmount(num) {
    this.selected = num;
    if (num > 0) {
      this.isSelected = true;
    } else this.isSelected = false;
  }

  calculateTotalPrice(days) {
    this.totalPrice =
      Math.round(this.dailyCost * days * this.selected * 100) / 100;
    return this.totalPrice;
    // this.totalPrice = 5;
  }
}

export { OrderedBin };
export default Order;
