import React from "react";
// this is a way of importing the components from the module
import { NavLink as RRNavLink, Switch, Route } from "react-router-dom";
import Contacts from "./Contacts/Contacts";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import PostDetailed from "./Posts/PostDetailed";
import {
  NavbarBrand,
  Navbar,
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem
} from "reactstrap";

export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/post/:id" component={PostDetailed} />
      </Switch>
    );
  }
}
