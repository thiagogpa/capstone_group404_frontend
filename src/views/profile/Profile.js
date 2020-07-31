import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import ModalCustom from "../components/CustomComponents";
import AddressModal from "../users/address/AddressModal";

import { useSelector, useDispatch } from "react-redux";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CRow,
  CDataTable,
} from "@coreui/react";

import { Form, Col } from "react-bootstrap";

import UserFormForUpdate from "../users/UserFormsForUpdate";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentLogin, setCurrentLogin] = useState(
    useSelector((state) => state.user.username)
  );
  const [currentUser, setCurrentUser] = useState([]);

  const [mustRefresh, setMustRefresh] = useState(false);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [addressDelete, setAddressDelete] = useState(false);

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);

  const [userData, setUser] = useState([]);
  const [addressesData, setAddresses] = useState([]);

  const [currentAddressData, setCurrentAddress] = useState([]);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
  });

  useEffect(() => {
    console.log("CAlling login" + currentLogin);
    axiosInstance.get("/api/login/" + currentLogin).then((response) => {
      console.log(response.data);

      setCurrentUser(response.data.userId);
      setMustRefresh(!mustRefresh);
    });
  }, [currentLogin]);

  useEffect(() => {
    axiosInstance.get("/api/user/" + currentUser).then((response) => {
      setUser(response.data);
      setAddresses(response.data.addresses);
    });
  }, [mustRefresh]);

  const handleUpdateUserInfo = (e) => {
    console.log("handleUpdateUserInfo");
    axiosInstance
      .put("/api/user/" + currentUser, {
        firstName: e.firstName,
        lastName: e.lastName,
        phone: e.phone,
        email: e.email,
      })
      .then((response) => {
        console.log("PASSWORD UPDATED");
        setSuccess(!success);
      })
      .catch((err) => {
        console.error(err);
        setFailure(!failure);
      });
  };

  const handleUpdateLogin = (e) => {
    axiosInstance
      .put("/api/login/" + currentLogin, {
        password: e.password,
      })
      .then((response) => {
        console.log("PASSWORD UPDATED");
        setSuccess(!success);
      })
      .catch((err) => {
        console.error(err);
        setFailure(!failure);
      });
  };

  const handleDeleteAddress = () => {
    axiosInstance
      .delete("/api/address/" + currentAddressData.id)
      .then((response) => {
        console.log("Address deleted");
        setAddressDelete(!addressDelete);
        setMustRefresh(!mustRefresh);
      })
      .catch((err) => {
        console.error(err);
        setAddressDelete(!addressDelete);
        setFailure(!failure);
      });
  };

  const handleUpdateAddress = (e) => {
    axiosInstance
      .put("/api/address/" + currentAddressData.id, {
        street: e.street,
        numberStreet: e.numberStreet,
        city: e.city,
        province: e.province,
        zipcode: e.zipcode,
      })
      .then((response) => {
        console.log("Address UPDATED");
        setShowEditAddressModal(!showEditAddressModal);
        setMustRefresh(!mustRefresh);
      })
      .catch((err) => {
        console.error(err);
        setShowEditAddressModal(!showEditAddressModal);
        setFailure(!failure);
      });
  };

  const handleEditAddress = (e) => {
    setShowEditAddressModal(!showEditAddressModal);
  };

  const handleInsertAddress = (e) => {
    axiosInstance
      .post("/api/address/", {
        userId: e.userId,
        street: e.street,
        numberStreet: e.numberStreet,
        city: e.city,
        province: e.province,
        zipcode: e.zipcode,
        userId: currentUser,
      })
      .then((response) => {
        console.log("Address Inserted");
        setShowAddAddressModal(!showAddAddressModal);
        setMustRefresh(!mustRefresh);
      })
      .catch((err) => {
        console.error(err);
        setShowAddAddressModal(!showAddAddressModal);
        setFailure(!failure);
      });
  };

  return (
    <div>
      <ModalCustom
        willShow={success}
        type="success"
        title="Info update"
        content="Info has been updated successfully"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => setSuccess(!success)}
        handleConfirmationClick={() => setSuccess(!success)}
        handleCancelClick={(e) => setSuccess(!success)}
      />

      <ModalCustom
        willShow={failure}
        type="danger"
        title="Info update"
        content="There was a problem while updating"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => setFailure(!failure)}
        handleConfirmationClick={() => setFailure(!failure)}
        handleCancelClick={() => setFailure(!failure)}
      />

      <ModalCustom
        willShow={addressDelete}
        type="danger"
        title="Address deletion"
        content="Are you sure you want to delete this address ?"
        confirmationButtonText="Yes"
        showCancelButton={true}
        cancelButtonText="No"
        handleClose={() => setAddressDelete(!addressDelete)}
        handleConfirmationClick={() => handleDeleteAddress()}
        handleCancelClick={() => setAddressDelete(!addressDelete)}
      />

      <AddressModal
        willShow={showEditAddressModal}
        handleSubmit={(e) => handleUpdateAddress(e)}
        handleClose={() => setShowEditAddressModal(!showEditAddressModal)}
        addressData={currentAddressData}
      />

      <AddressModal
        willShow={showAddAddressModal}
        handleSubmit={(e) => handleInsertAddress(e)}
        handleClose={() => setShowAddAddressModal(!showAddAddressModal)}
        addressData={null}
      />

      <UserFormForUpdate
        handleUpdateLogin={(e) => handleUpdateLogin(e)}
        handleUpdateUserInfo={(e) => handleUpdateUserInfo(e)}
        handleEditAddress={(e) => handleEditAddress(e)}
        handleAddressClick={(e) => setCurrentAddress(e)}
        handleDeleteAddress={() => setAddressDelete(!addressDelete)}
        handleAddAddress={() => setShowAddAddressModal(!showAddAddressModal)}
        userID={currentUser}
        userData={userData}
        addressData={addressesData}
      />
    </div>
  );
};

export default Profile;
