import React from "react";
import { useEffect } from 'react';
import ProvRow from './ProvRow';
import { setData, setError } from "../redux/provSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

function ProvTable() {
    const state = useSelector((state) => state.prov)
    const dispatch = useDispatch()
    useEffect(() => {
      fetch('https://trabajo-intermedio-2022.herokuapp.com/prov')
        .then(res => res.json())
        .then(data => dispatch(setData(data)))
        .catch(error => dispatch(setError(true)));
    }, [])
    if (state.error) return (
      <>
        <h3>Error al consumir servicios API...</h3>
        <Button variant='contained' color='error' onClick={ () => window.location.reload() }>Recargue la Página</Button>
      </>
    )
    return (
        <TableContainer component={Paper} sx={{ height: '75vh', display: 'flex', mt: 5}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.data
                        .filter(({ nombre: nombre }) => nombre.toLowerCase().includes(state.filter.toLowerCase()))
                        .slice(0, 100)
                        .map((prov) =>
                            <ProvRow key={prov.idprestador} prov={prov}/>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProvTable