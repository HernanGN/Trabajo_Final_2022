import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    data: [],
    error: false,
    filter: "",
    selectedProv: null,
    selectedAct: null
}

const provSlice = createSlice({
    name: "prov",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
        setSelectedProv(state, action) {
            state.selectedProv = action.payload
        },
        setSelectedAct(state, action) {
            state.selectedAct = action.payload
        }     
    }
})

export const { setData, setError, setFilter, setSelectedProv, setSelectedAct } = provSlice.actions

export default provSlice.reducer;