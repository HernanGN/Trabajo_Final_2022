import { TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/provSlice";

const ProvFilter = () => {
    const dispatch = useDispatch()
    const filter = useSelector((state)=> state.prov.filter)
    return <TextField
        name='filtro'
        label='Filtrar...'
        variant="filled"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))} />
}

export default ProvFilter