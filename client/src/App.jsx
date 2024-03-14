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
import Evaluar from './components/Comerciales/evaluar.comerciales'
import DeleteCom from './components/Comerciales/delete.comerciales';
import InfoCom from './components/Comerciales/info.comerciales';
import InfoEvals from './components/Comerciales/info.evals';
import PrivateRoutes from './components/PrivateRutes';
import ComponentsPrivatization from './components/ComponentPrivatization';
import Asistentes from './components/Asistentes/Asistentes';



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
                    // <ComponentsPrivatization permitted={["Admin", "Comercial"]} redirect={true}>
                    <ComercialForm />
                    // </ComponentsPrivatization>
                  } />
                  <Route path='edit/:id' element={<ComercialForm />} />
                  <Route path='evaluar/:id' element={<Evaluar />} />
                  <Route path='delete/:id' element={<DeleteCom />} />
                  <Route path='info/:id' element={<InfoCom />} />
                  <Route path='infoevals/:id' element={<InfoEvals />} />
                </Route>

                <Route path='/asistentes' element={
                  <ComponentsPrivatization permitted={['']} redirect={true}>
                    <Asistentes />
                  </ComponentsPrivatization>
                } />


                {/* <Route path='/asistentes' element={<Asistentes />} /> */}
                <Route path='/suministradores' element={<Suministradores />} />

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