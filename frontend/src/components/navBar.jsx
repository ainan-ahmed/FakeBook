import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <Link to="/">Ainan</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {!isAuthenticated && (
            <Nav className="ml-auto">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </Nav>
          )}
          {isAuthenticated && user && (
            <React.Fragment>
              <Nav className="mr-auto">
                <NavLink className="nav-item nav-link" to="/">Home</NavLink>
              </Nav>
              <Nav className="ml-auto">
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.username}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </Nav>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
