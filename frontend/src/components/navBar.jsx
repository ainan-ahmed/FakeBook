import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
class NavBar extends Component {
  state = {
    search: ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props);
    this.setState({search:''})
    this.props.history.push({
      pathname: '/users/search',
      search: '?q=' + this.state.search, 
    })
  }
  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  render() {
    
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="ms-2 text-info">
          Fakebook
        </Navbar.Brand>
        <Form inline className="me-auto d-flex" onSubmit={this.handleSubmit}>
          <FormControl
            type="text"
            placeholder="Search"
            className="me-sm-2"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <Button variant="outline-success text-white" type="submit">
            Search
          </Button>
        </Form>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {!isAuthenticated && (
            <Nav className="ms-auto">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </Nav>
          )}
          {isAuthenticated && user && (
            <React.Fragment className="">
              <Nav className="ms-auto">
                <NavLink className="nav-item nav-link" to="/">
                  Home
                </NavLink>
                <NavLink
                  className="nav-item nav-link"
                  to={"/auth/" + user.username}
                >
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

export default withRouter(NavBar);
