import React from "react";
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProv } from "../redux/provSlice"
import { setSelectedAct } from "../redux/provSlice"
import { setFilter } from "../redux/provSlice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"

const ProvEdit = () => {
    const dispatch = useDispatch()
    const {selectedProv, selectedAct } = useSelector((state)=> state.prov)
    const clickProcess = () => {
        fetch("https://trabajo-intermedio-2022.herokuapp.com/prov/" 
             + selectedProv.idprestador,
             {
                method: "PATCH",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(
                    {
                        "idprestador": selectedProv.idprestador,
                        "usuario": usuario.value,
                        "nombre": nombre.value,
                        "domicilio": domicilio.value,
                        "ciudad": ciudad.value,
                        "telefono": telefono.value,
                        "correo": correo.value                        
                    }
             )})
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))
        alert("Se actualizó el Prestador");
        dispatch(setSelectedProv(null));
        dispatch(setSelectedAct(""));
        dispatch(setFilter(""));
        window.location.reload();
    }
    return (
        <Card sx={{ height: '75vh', width: '30vw', display: 'flex', flexDirection: 'column', mt: 5 }}>
            <CardContent sx={{alignItems: 'justify'}}>
                <Typography font-fontsize={'14'} paragraph>ID: {selectedProv.idprestador}</Typography>
                <Formik
                initialValues = {{ usuario: selectedProv.usuario,
                                   nombre: selectedProv.nombre,
                                   domicilio: selectedProv.domicilio,
                                   ciudad: selectedProv.ciudad,
                                   telefono: selectedProv.telefono,
                                   correo: selectedProv.correo,
                                   imagen: selectedProv.imagen }}
                enableReinitialize
                validationSchema = { Yup.object({
                    usuario: Yup.string().min(6, "Largo mínimo 6 caracteres").max(20, "Extensión máxima 20 caracteres").required("Required"),
                    nombre: Yup.string().min(10, "Largo mínimo 10 caracteres").max(100, "Extensión máxima 100 caracteres").required("Required"),
                    domicilio: Yup.string().min(10, "Largo mínimo 10 caracteres").max(50, "Extensión máxima 50 caracteres").required("Required"),
                    ciudad: Yup.string().min(5, "Largo mínimo 5 caracteres").max(50, "Extensión máxima 50 caracteres").required("Required"),
                    telefono: Yup.string().min(5, "Largo mínimo 5 caracteres").max(25, "Extensión máxima 25 caracteres").required("Required"),
                    correo: Yup.string().email("Dirección de correo inválida")
                })}
                onSubmit={(values, { setSubmitting }) => {
                        alert(JSON.stringify(values))
                        setSubmitting(false)
                    }}
                >
                    <Form>
                        <label htmlFor="usuario">Usuario </label>
                        <Field name="usuario" id="usuario" type="text" size="20"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='usuario'/></div><br/>
                        <label htmlFor="nombre">Nombre </label>
                        <Field name="nombre" id="nombre" type="text" size="38"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='nombre'/></div><br/>
                        <label htmlFor="domicilio">Domicilio </label>
                        <Field name="domicilio" id="domicilio" type="text" size="36"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='domicilio'/></div><br/>
                        <label htmlFor="ciudad">Ciudad </label>
                        <Field name="ciudad" id="ciudad" type="text" size="25"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='ciudad'/></div><br/>
                        <label htmlFor="telefono">Teléfono </label>
                        <Field name="telefono" id="telefono" type="text" size="25"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='telefono'/></div><br/>
                        <label htmlFor="correo">Correo </label>
                        <Field name="correo" id="correo" type="email"/><br/>
                        <div style={{ color: 'red' }}><ErrorMessage name='correo'/></div><br/>
                    </Form>
                </Formik>
                <CardMedia component="img" height="200" image={selectedProv.imagen} alt={selectedProv.nombre}/>
                {Object.keys(selectedProv.idprestador).map(key => (<Typography key={key}>{key}:{selectedProv.idprestador[key]}</Typography>))}
            </CardContent>
            <CardActions sx={{justifyContent: 'center', mb: 5}}>
                <Button variant='contained' color="secondary"
                    onClick={()=> clickProcess()}>{selectedAct}</Button>                      
            </CardActions>
        </Card>
    )
}

export default ProvEdit