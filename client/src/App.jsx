import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import { store } from './app/store'

import Comerciales from './components/Comerciales/Comerciales';

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
import Informes from './components/Informes/Informes';
import InfoInformes from './components/Informes/info.Informes'
import Productos from './components/Productos/Productos'
import DeleteProduct from './components/Productos/delete.product'
import ProductForm from './components/Productos/createdit.Products'
import InfoProductos from './components/Productos/info.Productos'
import FacturaForm from './components/Factura/createdit.factura';
import Factura from './components/Factura/Factura';
import Forbidden from "./pages/forbidden"
import DeleteFact from './components/Factura/delete.factura';
import Suministradores from './components/Suministradores/Suministradores';
import DeleteSum from './components/Suministradores/delete.sum';
function App() {

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Navigate to='/login' />} />
            <Route path='/forbidden' element={<Forbidden />} />
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

                {/* Informe */}
                <Route path="/informes" element={<Informes />} />
                <Route path='/informes' element={<Forms />}>
                  <Route path='edit/:id' element={
                    <ComponentsPrivatization permitted={['abogado_group']} redirect={true}>
                      <InformeForm isInLista={true} />
                    </ComponentsPrivatization>
                  } />
                  <Route path='info/:id' element={<InfoInformes />} />
                </Route>

                {/* Productos */}
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos" element={<Forms />}>
                  <Route path='add' element={
                    <ComponentsPrivatization permitted={['comercial_group', 'asistente_group']} redirect={true}>
                      <ProductForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='edit/:id' element={
                    <ComponentsPrivatization permitted={['comercial_group', 'asistente_group']} redirect={true}>
                      <ProductForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='delete/:id' element={<DeleteProduct />} />
                  <Route path='info/:id' element={<InfoProductos />} />
                </Route>


                {/* FACTURA */}
                <Route path="/facturas" element={<Factura />} />
                <Route path="/facturas" element={<Forms />}>
                  <Route path='add' element={
                    <ComponentsPrivatization permitted={['comercial_group']} redirect={true}>
                      <FacturaForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='edit/:id' element={
                    <ComponentsPrivatization permitted={['comercial_group']} redirect={true}>
                      <FacturaForm />
                    </ComponentsPrivatization>
                  } />
                  <Route path='delete/:id' element={<DeleteFact />} />
                </Route>


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
                    <ComponentsPrivatization permitted={['director_group']} redirect={true}>
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
                  <Route path='delete/:id' element={<DeleteSum />} />


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


