import React from "react";
// this is a way of importing the components from the module
import { NavLink as RRNavLink, Switch, Route } from "react-router-dom";
import Contacts from "./components/Main/Contacts/Contacts";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import Home from "./components/Main/Home/Home";
import {
  NavbarBrand,
  Navbar,
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem
} from "reactstrap";

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
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand>Blog</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink activeClassName="active" exact to="/" tag={RRNavLink}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName="active"
                exact
                to="/dashboard"
                tag={RRNavLink}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName="active"
                exact
                to="/contacts"
                tag={RRNavLink}
              >
                Contacts
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const Routes = () => (
  <div>
    <Header />
    <Main />
  </div>
);

export default Routes;
