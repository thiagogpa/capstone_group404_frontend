import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import axios from "axios";

// routes config
import routesLoggedIN from "../routes";
import routesLoggedOFF from "../routesLoggedOFF";

//route validator
import withAuth from "../middleware/withAuth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function TheContent() {
  const [routes, setRoutes] = useState(routesLoggedIN);

  let axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: process.env.REACT_APP_BACKEND,
  });

  useEffect(() => {
    axiosInstance
      .get("/checkToken")
      .then((res) => {
        console.log("RESPONSE");
        if (res.status === 200) {
          console.log("LoggedIN");
          setRoutes(routesLoggedIN);
        } else {
          console.log("LoggedOFF");
          setRoutes(routesLoggedOFF);
        }
      })
      .catch((err) => {
        console.error(err);
        setRoutes(routesLoggedOFF);
        console.log("LoggedOFF");
      });
  }, []);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={withAuth(route.component)}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
}

export default React.memo(TheContent);
