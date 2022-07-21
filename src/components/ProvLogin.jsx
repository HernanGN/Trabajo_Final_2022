import React from "react";
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProv } from "../redux/provSlice"
import { setSelectedAct } from "../redux/provSlice"
import { setFilter } from "../redux/provSlice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"

const ProvLogin = () => {
    const dispatch = useDispatch()
    const {selectedProv, selectedAct } = useSelector((state)=> state.prov)
    const clickProcess = () => {
        fetch('https://trabajo-intermedio-2022.herokuapp.com/prov/recovery',
        {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify( { "usuario": selectedProv.usuario, "clave": clave.value } )
        })
        .then(res => res.json())
        .then(res => console.log(res.message))
        .then(data => {
            if (data.hasOwnProperty('Token_info')){
                alert('Prestador Logueado');
            }else{
                alert('Clave Incorrecta');
            }})
        .catch(err => console.error(err));
        dispatch(setSelectedProv(null))
        dispatch(setSelectedAct(""))
        dispatch(setFilter(""))
        window.location.reload();
    }
    const mensaje = (respuesta) => {
        alert(respuesta)
    }
    return (
        <Card sx={{ height: '75vh', width: '30vw', display: 'flex', flexDirection: 'column', mt: 5 }}>
            <CardContent sx={{alignItems: 'justify'}}>
                <Typography font-fontsize={'14'} paragraph>ID: {selectedProv.idprestador}</Typography>
                <Typography font-fontsize={'14'} paragraph>Usuario: {selectedProv.usuario}</Typography>
                <Typography font-fontsize={'14'} paragraph>Nombre: {selectedProv.nombre}</Typography>                
                <Formik
                initialValues = {{ clave: "" }}
                enableReinitialize
                validationSchema = { Yup.object({
                    clave: Yup.string().min(8, "Largo mínimo 8 caracteres").max(15, "Extensión máxima 15 caracteres").required("Required")
                })}
                onSubmit={(values, { setSubmitting }) => {
                        alert(JSON.stringify(values))
                        setSubmitting(false)
                    }}
                >
                    <Form>
                        <label htmlFor="clave">Clave </label>
                        <Field name="clave" id="clave" type="text" size="20"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='clave'/></div><br/>
                    </Form>
                </Formik>
                <CardMedia component="img" height="200" image={selectedProv.imagen} alt={selectedProv.nombre}/>
                {Object.keys(selectedProv.idprestador).map(key => (<Typography key={key}>{key}:{selectedProv.idprestador[key]}</Typography>))}
            </CardContent>
            <CardActions sx={{justifyContent: 'center', mb: 5}}>
                <Button variant='contained' color="success"
                    onClick={()=> clickProcess()}>{selectedAct}</Button>                      
            </CardActions>
        </Card>
    )
}

export default ProvLogin