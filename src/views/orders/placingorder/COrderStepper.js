import React, { useEffect, useState } from "react";
import { ErrorMessage, FieldArray } from "formik";
import OrderClass, { OrderedBin } from "./OrderClass";
import ClientClass from "./ClientClass";
import AddressClass from "./AddressClass";

import COrderAddressForm from "./COrderAddressForm";
import COrderSummary from "./COrderSummary";
import axios from "axios";
import { Wizard, WizardStep } from "../../components/Wizard";
import COrderDatesForm from "./COrderDatesForm";
import CBinPickerForm from "./CBinPickerForm";

import { useSelector, useDispatch } from "react-redux";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//this is going to be removed soon
//use redux useStore to read data from the redux

const COrderStepper = () => {
  const [alertMessage, setAlertMessage] = useState("");
  let axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: process.env.REACT_APP_BACKEND,
  });

  const dispatch = useDispatch();

  const [currentLogin, setCurrentLogin] = useState(
    useSelector((state) => state.user.username)
  );
  const [currentUser, setCurrentUser] = useState([]);

  //have to define all form foelds to make them controlled components
  const jsonOrder = {
    orderNumber: " ",
    orderDate: new Date(),
    dropOffDate: "",
    dropOffTime: "",
    dropOddDateTime: "",
    pickUpDate: "",
    pickUpTime: "",
    pickUpDateTime: "",
    address: {},
    bins: [],
    client: null,
  };
  //getting data for initial stages

  const order = new OrderClass(jsonOrder);
  //order.address = new AddressClass();

  useEffect(() => {
    console.log("CAlling login" + currentLogin);
    axiosInstance.get("/api/login/" + currentLogin).then((response) => {
      console.log(response.data);

      //setCurrentUser(response.data.user);
      //setMustRefresh(!mustRefresh);

      const client = new ClientClass(response.data.user);

      order.client = client;

      order.address = new AddressClass();
    });
  }, [currentLogin]);

  //getting data and transform for use in the table

  useEffect(() => {
    axiosInstance
      .get("/api/bin")
      .then((response) => {
        order.bins = response.data.map((item) => {
          let bin = OrderedBin.from(item);
          bin.selected = 0;
          bin.isSelected = false;
          bin.totalPrice = 0;
          return bin;
        });
        for (let i = 0; i < order.bins.length; i++) {
          order.bins[i].index = i;
        }
      })
      .catch((error) => setAlertMessage(error.message));
  }, []);

  return (
    <div>
      <h1>Placing order</h1>
      <Wizard
        initialValues={order}
        onSubmit={async (values) =>
          sleep(300).then(() => console.log("Wizard submit", values))
        }
      >
        <WizardStep
          onSubmit={() => console.log("Dates onSubmit")}
          validationSchema={OrderClass.getDatesValidationSchema()}
          onSubmit={(values) => {
            console.log("Dated and times onSubmit");
            values.calculateTotalDays();
            console.log(values);
          }}
        >
          <div>
            <COrderDatesForm />
          </div>
        </WizardStep>
        <WizardStep
          onSubmit={() => console.log("Bins onSubmit")}
          validationSchema={OrderClass.getBinsValidationSchema()}
        >
          <div>
            <FieldArray name="bins" component={CBinPickerForm} />
          </div>
        </WizardStep>

        <WizardStep onSubmit={() => console.log("Dates onSubmit")}>
          <div>
            <COrderAddressForm />
          </div>
        </WizardStep>
        <WizardStep onSubmit={() => console.log("OrderSummary onSubmit")}>
          <COrderSummary />
        </WizardStep>
      </Wizard>
    </div>
  );
};

export default COrderStepper;
