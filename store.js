import {configureStore} from "@reduxjs/toolkit";
//navSlice is a space for the layer that will be used for this build
import navReducer from "./slices/navSlice";

export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
});


