import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";

const TheHeaderDropdown = () => {
  const username = useSelector((state) => state.user.username);

  return (
    <>
    <strong>{useSelector((state) => state.user.username)}</strong>
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={
              "https://img.icons8.com/bubbles/100/000000/gender-neutral-user.png"
            }
            className="c-avatar-img"
          />
        </div>
      </CDropdownToggle>
            
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>

        {username === "" && (
          <>
            <CDropdownItem to="/login">
              <CIcon name="cil-user" className="mfe-2" />
              Login
            </CDropdownItem>

            <CDropdownItem to="/register">
              <CIcon name="cil-user" className="mfe-2" />
              Register
            </CDropdownItem>
          </>
        )}

        {username !== "" && (
          <>
            <CDropdownItem to="/profile">
              <CIcon name="cil-user" className="mfe-2" />
              Profile
            </CDropdownItem>

            <CDropdownItem divider />
            <CDropdownItem to="/logoff">
              <CIcon name="cil-account-logout" className="mfe-2" />
              Log Off
            </CDropdownItem>
          </>
        )}
      </CDropdownMenu>
    </CDropdown>
    </>
  );
};

export default TheHeaderDropdown;
