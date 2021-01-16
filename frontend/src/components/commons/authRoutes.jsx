import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

class authRoutes extends Component {
  render() {
    const { auth, type } = this.props;
    //console.log(this.props);
    if (type === "auth" && !auth.isAuthenticated)
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location },
          }}
        />
      );
    if (
      type === "auth" &&
      auth.isAuthenticated &&
      auth.user.username !== this.props.computedMatch.params.username
    )
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );

    return <Route {...this.props} />;
  }
}

export default authRoutes;
