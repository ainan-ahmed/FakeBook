import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import { getUserInfo } from "./store/users";
import Logout from "./components/logout";
import ProtectedRoute from "./components/commons/protectedRoute";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
class App extends Component {
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      await this.props.getUserInfo();
    }
  }
  render() {
    const { auth } = this.props;
    //console.log(auth);
    return (
      <React.Fragment>
        <NavBar auth={auth} />
        <div className="container">
          <Switch>
            <ProtectedRoute
              path="/login"
              component={LoginForm}
              type="guest"
              auth={auth}
            />
            <ProtectedRoute
              path="/register"
              component={RegisterForm}
              type="guest"
              auth={auth}
            />
            <ProtectedRoute
              path="/logout"
              component={Logout}
              type="private"
              auth={auth}
            />
            <Route path="/profile" component={Profile} auth={auth} />
            <ProtectedRoute
              path="/"
              type="private"
              auth={auth}
              component={Home}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.entities.auth,
});
const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfo()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
