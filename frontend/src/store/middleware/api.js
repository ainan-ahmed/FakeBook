// import axios from "axios";
// import * as actions from "../apiActions";
// import { baseURL } from "../endpoints";
// import { getAuthUserInfo } from "../users";

// const api = (store) => (next) => async (action) => {
//   if (action.type !== actions.apiCallBegan.type) return next(action);
//   next(action);
//   const { url, method, data, onStart, onSuccess, onError } = action.payload;
//   if (onStart) store.dispatch({ type: onStart });
//   const headers = getHeaders(store.getState);
//   console.log(headers);
//   try {
//     const response = await axios.request({
//       baseURL,
//       url,
//       method,
//       data,
//       headers,
//     });
//     console.log(response.data);
//     store.dispatch({ type: onSuccess, payload: response.data });
//     //store.dispatch(getAuthUserInfo());
//   } catch (error) {
//     //store.dispatch(actions.apiCallFailed(error.message));
//     console.log(onError);
//     if (onError) store.dispatch({ type: onError });
//   }
// };

// export default api;
