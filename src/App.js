import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./pages/Navigation.js";
import PageNotFound from "./pages/PageNotFound.js";
import Home from "./pages/Home.js";
import Example from "./pages/ExampleBootstrap.js";
import FAQ from "./pages/FAQ.js";
import Contact from "./pages/Contact.js"

function App() {
  return (
    <BrowserRouter>
      <div className="innerContent">
     <Navigation/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Example} />  
          <Route path="/cart" component={Example} /> 
          <Route path="/user-account" component={Example} /> 
          <Route path="/user-orders" component={Example} /> 
          <Route path="/area" component={Example} /> 
          <Route path="/how" component={Example} /> 
          <Route path="/order-online" component={Example} /> 
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
