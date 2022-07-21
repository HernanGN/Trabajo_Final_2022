import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReadMore from '@mui/icons-material/ReadMore';
import LoginIcon from '@mui/icons-material/Login';
import PasswordIcon from '@mui/icons-material/Password';
import { useDispatch } from "react-redux";
import { setSelectedProv } from "../redux/provSlice";
import { setSelectedAct } from "../redux/provSlice";

const ProvRow = ({ prov }) => {
    const dispatch = useDispatch()
    const setProvAct = (act) => {
        dispatch(setSelectedProv(prov));
        dispatch(setSelectedAct(act));
    }
    return (
        <TableRow>
            <TableCell>{prov.idprestador}</TableCell>
            <TableCell>{prov.nombre}</TableCell>
            <TableCell align="center">
                <IconButton aria-label='Consultar' color='info' size='small'
                    onClick={() => setProvAct("Volver")}>
                    <ReadMore/>
                </IconButton>
                <IconButton aria-label='Modificar' color='secondary' size='small'
                    onClick={() => setProvAct("Grabar Modificaciones")}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label='Eliminar' color='error' size='small'
                    onClick={() => setProvAct("Confirmar Eliminación")}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label='Loguear' color='success' size='small'
                    onClick={() => setProvAct("Loguear Prestador")}>
                    <LoginIcon/>
                </IconButton>
                <IconButton aria-label='Recuperar Clave' color='warning' size='small'
                    onClick={() => setProvAct("Enviar Correo de Recuperación")}>
                    <PasswordIcon/>
                </IconButton>
            </TableCell>         
        </TableRow>
    )
}

export default ProvRow