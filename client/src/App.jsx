import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import { store } from './app/store'
import Contratos from './components/Contratos';
import Compras from './components/Compras';
import Comerciales from './components/Comerciales/Comerciales';

import Suministradores from './components/Suministradores';
import Forms from './components/Forms';
import ComercialForm from './components/Comerciales/createdit.comerciales';
import AsistenteForm from './components/Asistentes/createdit.asistentes';
import Evaluar from './components/Comerciales/evaluar.comerciales'
import DeleteCom from './components/Comerciales/delete.comerciales';
import DeleteAsis from './components/Asistentes/delete.asis'
import InfoCom from './components/Comerciales/info.comerciales';
import InfoAsis from './components/Asistentes/info.asistente';

import InfoEvals from './components/Comerciales/info.evals';
import PrivateRoutes from './components/PrivateRutes';
import ComponentsPrivatization from './components/ComponentPrivatization';
import Asistentes from './components/Asistentes/Asistentes';

import ContratoForm from './components/Contratos/create.contrato';
import EvaluarAsis from './components/Asistentes/evaluar.asistente';
import InfoEvalsAsis from './components/Asistentes/info.evals.asis';



function App() {

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/login' />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<Dashboard />} >
                <Route path="/contratos" element={<Contratos />} />
                <Route path="/compras" element={<Compras />} />

                {/* COMERCIALES */}
                <Route path='/comerciales' element={<Comerciales />} />
                <Route path='/comerciales' element={<Forms />}>
                  <Route path='add' element={
                    <ComponentsPrivatization permitted={['director_group', 'admin_group']} redirect={true}>
                      <ComercialForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='edit/:id' element={<ComercialForm />} />
                  <Route path='evaluar/:id' element={<Evaluar />} />
                  <Route path='delete/:id' element={<DeleteCom />} />
                  <Route path='info/:id' element={<InfoCom />} />
                  <Route path='infoevals/:id' element={<InfoEvals />} />
                </Route>

                {/* ASISTENTES */}
                <Route path='/asistentes' element={<Asistentes />} />
                <Route path='/asistentes' element={<Forms />}>
                  <Route path='add' element={
                    <ComponentsPrivatization permitted={['director_group', 'admin_group']} redirect={true}>
                      <AsistenteForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='edit/:id' element={<AsistenteForm />} />
                  <Route path='evaluar/:id' element={<EvaluarAsis />} />
                  <Route path='delete/:id' element={<DeleteAsis />} />
                  <Route path='info/:id' element={<InfoAsis />} />
                  <Route path='infoevals/:id' element={<InfoEvalsAsis />} />
                </Route>


                {/* <Route path='/asistentes' element={<Asistentes />} /> */}
                <Route path='/suministradores' element={<Suministradores />} />
                <Route path='/contratos' element={<Forms />}>
                  <Route path='add' element={
                    // <ComponentsPrivatization permitted={["Admin", "Comercial"]} redirect={true}>
                    <ContratoForm />
                    // </ComponentsPrivatization>
                  } />
                </Route>
                {/* <Route path="/" element={<Navigate to='/dashboard/contratos'/>} />
            <Route path="/contratos"  element={<Table quito={'evaluar'}/>} />
            <Route path='/compras' element={<Table quito={'evaluar'}/>}/>
            <Route path='/comerciales' element={<Table/>}/>
            <Route path='/evaluar' element={<FormEvaluate/>}/>        */}
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
        <Toaster />
      </Provider>
    </div>

  )
}
export default App;