import reducer from './reducer'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
export default function () {
    return configureStore({
      reducer,
      middleware: [...getDefaultMiddleware()]
    });
}

