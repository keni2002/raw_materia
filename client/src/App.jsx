import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import { store } from './app/store'

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

import ContratoForm from './components/Contratos/createdit.contratos';
import InformeForm from './components/Informes/createdit.Informe';
import EvaluarAsis from './components/Asistentes/evaluar.asistente';
import InfoEvalsAsis from './components/Asistentes/info.evals.asis';
import Home from './pages/Home';
import Contratos from './components/Contratos/Contratos';
import InfoContrato from './components/Contratos/info.Contrato';
import DeleteCont from './components/Contratos/delete.contrato';
import NotFound from './pages/NotFound';
import SuminisForm from './components/Suministradores/createdit.sumin';



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
                <Route path='/home' element={<Home></Home>}></Route>
                {/* CONTRATO */}
                <Route path="/contratos" element={<Contratos />} />
                <Route path='/contratos' element={<Forms />}>
                  <Route path='add' element={
                    <ComponentsPrivatization permitted={['comercial_group']} redirect={true}>
                      <ContratoForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='add_informe/:id' element={
                    <ComponentsPrivatization permitted={['abogado_group']} redirect={true}>
                      <InformeForm isInLista={false} />
                    </ComponentsPrivatization>
                  } />
                  <Route path='renovar/:id' element={<ContratoForm />} />
                  <Route path='delete/:id' element={<DeleteCont />} />
                  <Route path='info/:id' element={<InfoContrato />} />
                </Route>




                {/* FACTURA */}


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


                {/* SUMINISTRADORES */}
                <Route path='/suministradores' element={<Suministradores />} />
                <Route path='/suministradores' element={<Forms />}>
                  <Route path='add' element={
                    // <ComponentsPrivatization permitted={["Admin", "Comercial"]} redirect={true}>
                    <SuminisForm />
                    // </ComponentsPrivatization>
                  } />
                  <Route path='edit/:id' element={<SuminisForm />} />
                </Route>


              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </Provider>
    </div>

  )
}
export default App;



{/* <Route path="/" element={<Navigate to='/dashboard/contratos'/>} />
            <Route path="/contratos"  element={<Table quito={'evaluar'}/>} />
            <Route path='/compras' element={<Table quito={'evaluar'}/>}/>
            <Route path='/comerciales' element={<Table/>}/>
            <Route path='/evaluar' element={<FormEvaluate/>}/>        */}