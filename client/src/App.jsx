import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'

import {Toaster} from "react-hot-toast"


import Login from './pages/Login'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard/*" element={<Dashboard/>} />
         
        </Routes>
      </BrowserRouter>
      <Toaster/>
     
    </div>
    
  )
}
export default App;