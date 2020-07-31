import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const Logoff = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.REACT_APP_BACKEND,
    });

    axiosInstance
      .post("/api/logoff")
      .then((res) => {
        if (res.status === 200) {
          console.log("200");
          console.log(res);
          dispatch({ type: "LOGOFF"});
          history.push(`/`);
        } else {
          console.log(res);
          console.log("other");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging OFF please try again");
      });
  }, []);

  return <div></div>;
};

export default Logoff;
