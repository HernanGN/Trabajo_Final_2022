import './App.css'
import {Typography} from '@mui/material';
import ProvTable from './components/ProvTable'
import ProvFilter from './components/ProvFilter';
import ProvReadDelRec from './components/ProvReadDelRec';
import ProvEdit from './components/ProvEdit';
import ProvLogin from './components/ProvLogin';
import { useSelector } from "react-redux";

function App() {
  const {selectedProv, selectedAct } = useSelector((state)=> state.prov)
  return (
    <main style={{margin: 'auto', display: 'flex', flexDirection: 'column', width: '90vw', paddingTop: '1em'}}>
      <Typography variant="h5">Gestión de Prestadores</Typography>
      <ProvFilter/>
      <section style={{
        display: "grid",
        alignItems: 'center',
        gridTemplateColumns: "4fr 2fr",
        gap: "2rem"
      }}>
        <ProvTable/>
        { (selectedProv && selectedAct == 'Volver') && <ProvReadDelRec/> }
        { (selectedProv && selectedAct == 'Grabar Modificaciones') && <ProvEdit/> }
        { (selectedProv && selectedAct == 'Confirmar Eliminación') && <ProvReadDelRec/> }
        { (selectedProv && selectedAct == 'Loguear Prestador') && <ProvLogin /> }
        { (selectedProv && selectedAct == 'Enviar Correo de Recuperación') && <ProvReadDelRec/> }
      </section>
    </main>
  )
}

export default App
