import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Table from './Table'
//API externa -simulacro

import {columns as colContrato,data as dataContrato} from '../api/Contrato.jsx'
import {columns as colCompras,data as dataCompras} from '../api/Compras.jsx'

//FIn API externa

const ContentDash = () => {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === '/dashboard/contratos'){
      setColumns(colContrato)
      setData(dataContrato)
    } else if(location.pathname === '/dashboard/compras'){
      setColumns(colCompras)
      setData(dataCompras)
    }
  },[location.pathname])



  return (

    <div className=" flex flex-col items-center">
      <Routes>
      <Route path="/" element={<Navigate to='/dashboard/contratos'/>} />
        <Route path="/contratos"  element={<Table columns={columns} data={data} title={'Contratos'} />} />
        <Route path='/compras' element={<Table columns={columns} data={data} title={'Compras'}/>}/>
        
      </Routes>
    </div>

  )
};

export default ContentDash;
