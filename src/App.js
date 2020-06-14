import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./pages/Navigation.js";
import PageNotFound from "./pages/PageNotFound.js";
import Home from "./pages/Home.js";
import Example from "./pages/ExampleBootstrap.js";
import FAQ from "./pages/FAQ.js";

function App() {
  return (
    <BrowserRouter>
      <div className="innerContent">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/example" component={Example} />
          <Route path="/faq" component={FAQ} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
