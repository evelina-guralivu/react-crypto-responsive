import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import { initAxiosAuth } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/shards-dashboards.1.1.0.css";
import AdminCreator from "./views/admin.min.js";
import config from "../src/config";
import Errors from "./views/Errors";

const Admin = AdminCreator.default(config.baseUrl, "nt-theme");

function AdminRoute({ component: Component, setToken, ...rest }) {
  const token = JSON.parse(localStorage.getItem("session"));
  let redirect = "";
  if (!token ) redirect = "/login";
  setToken(token);
  return (
    <Route
      {...rest}
      render={props =>
        redirect ? (
          <Redirect to={{ pathname: redirect }} />
        ) : (
            <Component {...props} />
        )
      }
    />
  );
}

initAxiosAuth();

class App extends React.Component {
  
  render(){
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
          <AdminRoute
            path="/admin"
            component={Admin.AdminComponent}
            setToken={Admin.setToken}
          />
        </div>
      </Router>
    )}
};

export default (App);