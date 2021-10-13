import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import EditProfile from './components/editProfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchUser from './components/searchUser';
import ProtectedRoute from './components/commons/protectedRoute';
import authRoutes from './components/commons/authRoutes';
import authProfile from "./components/authProfile";
import Followers from './components/followers';
import Following from './components/following';

class App extends Component {
  render() {
   // console.log("abcd");
    const { auth } = this.props;
   // console.log(auth);
    return (
      <React.Fragment>
        <ToastContainer />
        
        <NavBar auth={auth} />
        <div className="">
          <Switch>
            <Route path="/users/search" auth={auth} component={SearchUser} />
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
              path="/auth/:username/edit"
              type="auth"
              auth={auth}
              component={EditProfile}
            />
            <ProtectedRoute
              path="/auth/:username"
              type="auth"
              auth={auth}
              component={authProfile}
            />
            <Route path="/:username/followers" auth={auth} component={Followers} />
            <Route path="/:username/following" auth={auth} component={Following} />
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
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
