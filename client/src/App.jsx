import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'

import {Toaster} from "react-hot-toast"


import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import {store} from './app/store'
function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard/*" element={<Dashboard/>} />
         
        </Routes>
      </BrowserRouter>
      <Toaster/>
     </Provider>
    </div>
    
  )
}
export default App;