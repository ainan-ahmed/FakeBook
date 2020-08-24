import { createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginEndpoint, get_user, logout_user } from "./endpoints";

const slice = createSlice({
  name: "users",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    user: null,
  },
  reducers: {
    authRequested: (state, action) => {
      state.isLoading = true;
    },
    authSucceed: (state, action) => {
      state.isLoading = false;
      state.user = action.payload
    },
    authFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
    loginRequested: (state, action) => {
      state.isLoading = true;
    },
    loginSucceed: (state, action) => {
      localStorage.setItem("token", action.payload.key);
      state.isLoading = false;
      (state.isAuthenticated = true), (state.token = action.payload.key);
    },
    loginFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
    logoutSucceed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
    registerRequested: (state, action) => {
      state.isLoading = true;
    },
    registerSucceed: (state, action) => {
      localStorage.setItem("token", action.payload.key);
      state.isLoading = false;
      (state.isAuthenticated = true), (state.token = action.payload.key);
    },
    registerFailed: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
  },
});
export const {
  loginRequested,
  loginFailed,
  loginSucceed,
  authFailed,
  authRequested,
  authSucceed,
  logoutSucceed,
  registerRequested,
  registerFailed,
  registerSucceed
} = slice.actions;
export default slice.reducers;

//ACTIONs

//-----------------------------

export const login = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: loginRequested.type,
  });
  try {
    const response = await axios.post(loginEndpoint, {
      email,
      password,
    });
    dispatch({
      type: loginSucceed.type,
      payload: response.data
    })


  } catch (error) {

    dispatch({
      type: loginFailed.type
    })
  }
};
//-------------------------------

export const getUserInfo = () => async (dispatch, getState) => {
  dispatch({
      type: authRequested.type
  })
  try {
    const response = await axios.get(get_user, getHeaders(getState))
    dispatch({
      type: authSucceed.type,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: authFailed.type
    })
  }
}
//--------------------------------
export const logout = () => async (dispatch, getState) => {
  try {
    const response = await axios.post(logout_user, {})
    dispatch({
      type: logoutSucceed.type
    })
  } catch (error) {
    
  }
}

//---------------------------------
export const register = (email, password1, password2, date_of_birth) => async (dispatch, getState) => {
  
  const body = JSON.stringify({ email, password1, password2, date_of_birth });
  dispatch({
    type: registerRequested.type
  })
  try {
    const response = await axios.post({
      registrationEndpoint,
      body,
      getHeaders(getState)
    })
    dispatch({
      type: registerSucceed.type,
      payload: response.data
    })
    dispatch(getUserInfo())
  } catch (error) {
    dispatch({
      type: registerFailed.type
    })
  }


}

//----------------------------------

export const getHeaders = getState => {
  const token = getState().auth.token
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = 'Token ' + token;
  }
  return config
}
