import { configureStore } from "@reduxjs/toolkit"
import provReducer from "./provSlice" 
export const store = configureStore({
    reducer: {
        prov: provReducer
    }
})
