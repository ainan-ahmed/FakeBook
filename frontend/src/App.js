import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import { getAuthUserInfo } from "./store/users";
import Logout from "./components/logout";
import ProtectedRoute from "./components/commons/protectedRoute";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import EditProfile from './components/editProfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  
  render() {
    const { auth } = this.props;
    console.log(auth);
    return (
      <React.Fragment>
        <ToastContainer/> 
        <NavBar auth={auth} />
        <div className="">
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
            <ProtectedRoute
              path="/:username/edit"
              type="private"
              auth={auth}
              component={EditProfile}
            />
            <Route path="/:username" auth={auth} component={Profile} />
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
export default connect(mapStateToProps)(App);
