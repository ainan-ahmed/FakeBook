import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
class App extends Component {
  render() {
    const store = configureStore()
    return (
      <React.Fragment>
        <Provider store={store}>
          <div className="container">
            <Switch>
              
            </Switch>
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
