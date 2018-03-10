import React from "react";
// this is a way of importing the components from the module
import { NavLink, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/contact" component={Contact} />
  </Switch>
);

const Home = () => (
  <div>
    <h1>This is my blog homepage</h1>
    <p>Needs to be updated....</p>
  </div>
);

const Contact = () => (
  <div>
    <h1>This is are my contacts</h1>
    <a href="https://github.com/joaopedrodcf">Github page</a>
  </div>
);

const Routes = () => (
  <div>
    <Nav />
    <Main />
  </div>
);

export default Routes;
