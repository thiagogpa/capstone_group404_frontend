import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import axios from "axios";

// sidebar nav config
import navigationLoggedIN from "./_nav";
import navigationLoggedOFF from "./_nav copy";

import logoFull from "../assets/img/logo.png";
import logoMini from "../assets/img/logo_mini.png";

function TheSidebar() {
  const [navigation, setNavigation] = useState();

  useEffect(() => {
    axios
      .get("/checkToken")
      .then((res) => {
        console.log("RESPONSE");
        if (res.status === 200) {
          console.log("LoggedIN");
          setNavigation(navigationLoggedIN);
        } else {
          console.log("LoggedOFF");
          setNavigation(navigationLoggedOFF);
        }
      })
      .catch((err) => {
        console.error(err);
        setNavigation(navigationLoggedOFF);
        console.log("LoggedOFF");
      });
  }, []);

  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar    
    colorScheme='dark'      
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
          src={logoFull}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
          src={logoMini}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
