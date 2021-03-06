import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Singup from "./Pages/SingUp";
import Dashboard from "./Pages/Dashboard";
import Newnote from "./Pages/NewNote";
import Account from "./Pages/Account";
import EditEmail from "./Pages/EditEmail";
import EditPassword from "./Pages/EditPassword";
import isAuthenticated from "./utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/singup" exact component={Singup} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/createnote" exact component={Newnote} />
        <PrivateRoute path="/account" exact component={Account} />
        <PrivateRoute path="/editemail" exact component={EditEmail} />
        <PrivateRoute path="/editpassword" exact component={EditPassword} />
      </Switch>
    </BrowserRouter>
  );
}
