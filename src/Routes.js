import React from "react";
// this is a way of importing the components from the module
import { NavLink as RRNavLink, Switch, Route } from "react-router-dom";
import Contacts from "./components/Main/Contacts/Contacts";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import Home from "./components/Main/Home/Home";
import { Nav, NavLink, Container } from "reactstrap";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/contacts" component={Contacts} />
  </Switch>
);

// Solution of router and reactstrap found on
// https://github.com/reactstrap/reactstrap/issues/336
// tag is used to pass an component
const Header = () => (
  <Nav>
    <NavLink to="/" tag={RRNavLink}>
      Home
    </NavLink>
    <NavLink to="/dashboard" tag={RRNavLink}>
      Dashboard
    </NavLink>
    <NavLink to="/contacts" tag={RRNavLink}>
      Contacts
    </NavLink>
  </Nav>
);

const Routes = () => (
  <Container fluid>
    <Header />
    <Main />
  </Container>
);

export default Routes;
