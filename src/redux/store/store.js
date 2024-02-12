import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "../state/searchSlice"

export default configureStore({
    reducer: {
        search: searchReducer,
    },
})