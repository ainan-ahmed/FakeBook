import { createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
import { post_routes } from "./endpoints";

const slice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
  },
  reducers: {
    postCreateRequested: (state, action) => {
      state.isLoading = true;
    },
    postCreateSucceed: (state, action) => {
      state.isLoading = false;
    },
    postCreateFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  postCreateFailed,
  postCreateSucceed,
  postCreateRequested,
} = slice.actions;
export default slice.reducer;

export const createPost = data => async (dispatch, getState) => {
  //console.log("post create requested");
  dispatch({
    type: postCreateRequested.type,
  });
  console.log(data);
  try {
    const response = await axios.post(post_routes,data, getFileHeaders(getState));
    
    dispatch({
      type: postCreateSucceed.type,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: postCreateFailed.type,
    });
  }
};

//---------------------------
export const getHeaders = (getState) => {
  const token = getState().entities.auth.token;
  //console.log("token " + token);
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = "Token " + token;
  }
  //console.log("config ->> "+ config)
  return config;
};

export const getFileHeaders = getState => {
  const token = getState().entities.auth.token;
  //console.log("token " + token);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  if (token) {
    config.headers["Authorization"] = "Token " + token;
  }
  //console.log("config ->> "+ config)
  return config;
}
