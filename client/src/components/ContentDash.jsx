
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Contratos from './Contratos';
import Compras from './Compras';

const ContentDash = () => {
  return (

    <div className=" flex flex-col items-center">
      <Routes>
      <Route path="/" element={<Navigate to='/dashboard/contratos'/>} />
        <Route path="/contratos"  element={<Contratos />} />
        <Route path='/compras' element={<Compras/>}/>
        
      </Routes>
    </div>

  )
};

export default ContentDash;
