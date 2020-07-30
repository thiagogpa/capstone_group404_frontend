import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import axios from "axios";


import ModalCustom from "../components/CustomComponents";
import UserForm from './UserForms';


const User = ({ match }) => {
  const history = useHistory();

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleSubmit = (e) => {
    let axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post("/api/login", {
        login: {
          username: e.username,
          password: e.password,
        },
        user: {
          firstName: e.firstName,
          lastName: e.lastName,
          phone: e.phone,
          email: e.email,
          staff: true,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("200");
          console.log(res);
          setSuccess(!success);
        } else {
          console.log(res);
          setFailure(!failure);
        }
      })
      .catch((err) => {
        console.error(err);
        setFailure(!failure);
      });
  };

  const handleUserCreated = () => {
    setSuccess(!success);
    history.push(`/users`)
  };

  return (
    <div>
      <ModalCustom
        willShow={success}
        type="success"
        title="Staff User creation successful"
        content="You have successfully created a new Staff member"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => handleUserCreated()}
        handleConfirmationClick={() => handleUserCreated()}
        handleCancelClick={() => handleUserCreated()}
      />

      <ModalCustom
        willShow={failure}
        type="danger"
        title="Staff User creation not successful"
        content="There was a problem creating the user"
        confirmationButtonText="OK"
        showCancelButton={false}
        cancelButtonText={null}
        handleClose={() => setFailure(!failure)}
        handleConfirmationClick={() => setFailure(!failure)}
        handleCancelClick={() => setFailure(!failure)}
      />

      <UserForm
        handleSubmit={(e) => handleSubmit(e)}
        isStaff={false}
      />

    </div>
  );
};

export default User;
