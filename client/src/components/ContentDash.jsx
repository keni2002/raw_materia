import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {setCurrentTable} from '../features/tablaSlice.jsx'
import Table from './Table'
import FormEvaluate from './FormEvaluate'
import { useGetComprasQuery, useGetContratosQuery } from '../services/apiTable';
import toast from 'react-hot-toast';


const ContentDash = () => {

  //cogiendo datos de la api
  
  const {data: dataCompras,isError:cperr,error:errcp} = useGetComprasQuery();
  const {data: dataContratos,isError:cnterr,error:errcnt} = useGetContratosQuery();
  if(cperr || cnterr){
    toast.error('Server Error')
  } 

  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(location.pathname === '/dashboard/contratos'){
      console.log("MIERDA")
      dispatch(setCurrentTable(['contratos',dataContratos]))
    } else if(location.pathname === '/dashboard/compras'){
      dispatch(setCurrentTable(['compras',dataCompras]))
    }
  },[dataCompras,dataContratos,location.pathname,dispatch])



  return (

    <div className=" flex flex-col items-center">
      <Routes>
      <Route path="/" element={<Navigate to='/dashboard/contratos'/>} />
        <Route path="/contratos"  element={<Table/>} />
        <Route path='/compras' element={<Table/>}/>
        <Route path='/evaluar' element={<FormEvaluate/>}/>
        
      </Routes>
    </div>

  )
};

export default ContentDash;
