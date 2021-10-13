import { createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
import { post_routes } from "./endpoints";
import { getFileHeaders, getHeaders } from "./users";

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
  console.log("post create requested");
  dispatch({
    type: postCreateRequested.type,
  });
  
  const token = getState().auth.token;
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
  
  try {
    console.log(data);
    const response = await axios.post(post_routes,data,config);
    
    dispatch({  
      type: postCreateSucceed.type,
      payload: response.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: postCreateFailed.type,
    });
  }
};

 


