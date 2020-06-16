import React from "react";
import HeaderNav from "./HeaderNav.js";
import FooterNav from './FooterNav';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FAQ from '../../pages/FAQ.js';
import Home from '../../pages/Home.js';
import UserOrders from '../../pages/user-orders';



import PageNotFound from '../../pages/PageNotFound.js'


function Navigation() {
  return (
    <div className="header">
    <BrowserRouter>
      <div className="innerContent">
      <HeaderNav />
      <FooterNav />
        <Switch>
          <Route path="/" exact><Home/></Route>
          <Route path="/faq"><FAQ/></Route>
          <Route path="/user-orders"><UserOrders/></Route>
          
          <Route><PageNotFound/></Route> 
      </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}



export default Navigation;