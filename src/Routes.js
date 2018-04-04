import React from "react";
// this is a way of importing the components from the module
import { NavLink as RRNavLink, Switch, Route } from "react-router-dom";
import Contacts from "./components/Main/Contacts/Contacts";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import Home from "./components/Main/Home/Home";
import Header from "./components/Nav/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {
  NavbarBrand,
  Navbar,
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem
} from "reactstrap";

export default class Routes extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container-header-main">
          <Header />
          <Main />
        </div>

        <Footer />
      </div>
    );
  }
}
