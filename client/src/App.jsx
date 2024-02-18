import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import { TaskFormPage } from './pages/TaskFormPage';

import {Toaster} from "react-hot-toast"


import FormLogin from './components/FormLogin';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>} />
          <Route path="/login" element={<FormLogin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='/tasks/:id' element={<TaskFormPage></TaskFormPage>} />
        </Routes>
      </BrowserRouter>
      <Toaster></Toaster>
    </div> 
  )
}
export default App;