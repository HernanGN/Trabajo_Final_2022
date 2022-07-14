import React from "react";
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProv } from "../redux/provSlice"
import { setSelectedAct } from "../redux/provSlice"
import { setFilter } from "../redux/provSlice";

const ProvReadDelRec = () => {
    const dispatch = useDispatch()
    const {selectedProv, selectedAct } = useSelector((state)=> state.prov)
    const clickProcess = () => {
        if ( selectedAct == 'Confirmar Eliminación' ) {
            fetch('https://trabajo-intermedio-2022.herokuapp.com/prov/'
                 + selectedProv.idprestador,
                 {method: 'DELETE'})
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
            alert("Se eliminó el Prestador")
        }
        if ( selectedAct == 'Enviar Correo de Recuperación' ) {
            fetch('https://trabajo-intermedio-2022.herokuapp.com/prov/recovery',
            {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify( { "usuario": selectedProv.usuario } )
            })
            .then(res => res.json())
            .then(res => console.log(res.message))
            .catch(err => console.error(err));
            alert("Se envió el correo de recuperación de contraseña al Prestador")
        }
        dispatch(setSelectedProv(null))
        dispatch(setSelectedAct(""))
        dispatch(setFilter(""))
    }
    var col = "primary"
    switch (selectedAct) {
        case "Volver": col="info"; break;
        case "Confirmar Eliminación": col="error"; break;
        case "Enviar Correo de Recuperación": col="warning"; break;
    }
    return (
        <Card sx={{ height: '75vh', width: '30vw', display: 'flex', flexDirection: 'column', mt: 5 }}>
            <CardContent sx={{alignItems: 'justify'}}>
                <Typography font-fontsize={'14'} paragraph>ID: {selectedProv.idprestador}</Typography>
                <Typography font-fontsize={'14'} paragraph>Usuario: {selectedProv.usuario}</Typography>
                <Typography font-fontsize={'14'} paragraph>Nombre: {selectedProv.nombre}</Typography>
                <Typography font-fontsize={'14'} paragraph>Domicilio: {selectedProv.domicilio}</Typography>
                <Typography font-fontsize={'14'} paragraph>Ciudad: {selectedProv.ciudad}</Typography>
                <Typography font-fontsize={'14'} paragraph>Teléfono: {selectedProv.telefono}</Typography>
                <Typography font-fontsize={'14'} paragraph>Correo: {selectedProv.correo}</Typography>
                <CardMedia component="img" height="200" image={selectedProv.imagen} alt={selectedProv.nombre}/>
                {Object.keys(selectedProv.idprestador).map(key => (<Typography key={key}>{key}:{selectedProv.idprestador[key]}</Typography>))}
            </CardContent>
            <CardActions sx={{justifyContent: 'center', mb: 5}}>
                <Button variant='contained' color={col}
                    onClick={()=> clickProcess()}>{selectedAct}</Button>                      
            </CardActions>
        </Card>
    )
}

export default ProvReadDelRec