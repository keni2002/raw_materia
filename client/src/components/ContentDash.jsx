import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {setCurrentTable} from '../features/tablaSlice.jsx'
import Table from './Table'
import FormEvaluate from './FormEvaluate'
import { useGetComprasQuery, useGetContratosQuery,useGetComercialesQuery  } from '../services/apiTable';
import toast from 'react-hot-toast';


const ContentDash = () => {

  //cogiendo datos de la api
  
  const {data: dataCompras,isError:cperr,error:errcp} = useGetComprasQuery();
  const {data: dataContratos,isError:cnterr,error:errcnt} = useGetContratosQuery();
  const {data: dataComerciales,isError:cmerr,error:errcm} = useGetComercialesQuery();
  

  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(location.pathname === '/dashboard/contratos'){
      dispatch(setCurrentTable(['contratos',dataContratos]))
    } else if(location.pathname === '/dashboard/compras'){
      dispatch(setCurrentTable(['compras',dataCompras]))
    } else if(location.pathname === '/dashboard/comerciales'){
      dispatch(setCurrentTable(['comerciales',dataComerciales]))
    }
  },[dataCompras,dataContratos,location.pathname,dispatch])



  return (

    

    
   

  
};

export default ContentDash;
