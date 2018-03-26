import React from "react";
import { NavLink as RRNavLink, Switch, Route } from "react-router-dom";
import {
  NavbarBrand,
  Navbar,
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem
} from "reactstrap";

// Solution of router and reactstrap found on
// https://github.com/reactstrap/reactstrap/issues/336
// tag is used to pass an component
export default class Header extends React.Component {
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
