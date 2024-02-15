import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import {Taskpage} from './pages/Taskpage'
import { TaskFormPage } from './pages/TaskFormPage';
import { Navigation } from './components/Navigation';
import {Toaster} from "react-hot-toast"
import { Loginpage } from './pages/Loginpage'
function App() {
  return (
    <div>
      
      <BrowserRouter>
        <div className='container mx-auto text-white'>
        {/* <Navigation></Navigation> */}
        <Routes>
        <Route path='/login' element={ <Loginpage></Loginpage> }></Route>
          <Route path="/" element={<Navigate to='/tasks'/>} />
          <Route path="/tasks" element={<Taskpage/>} />
          <Route path="/tasks/new" element={<TaskFormPage/>} />
          <Route path='/tasks/:id' element={<TaskFormPage></TaskFormPage>} />
          

        </Routes>
        </div>
      </BrowserRouter>
      <Toaster></Toaster>
    </div> 
  )
}
export default App;