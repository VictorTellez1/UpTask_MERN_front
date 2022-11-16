import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
  const params=useParams();
  const {token}=params;
  const [tokenValido,setTokenValido]=useState(false)
  const [alerta,setAlerta]=useState({})
  const [password,setPassword]=useState('')
  useEffect(()=>{
    const comprobarToken= async () =>{
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken()
  },[])
  const handleSubmit=async e =>{
    e.preventDefault();
    if(password.length < 6){
      setAlerta({
        msg:"El password debe ser mayor a 5 caracteres",
        error:true
      })
      return
    }
    try {
      const url=`/usuarios/olvide-password/${token}`
      const {data}=await clienteAxios.post(url,{password})
      setAlerta({
        msg:data.msg,
        error:false
      })
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  }
  const {msg}=alerta;
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no 
             pierdas acceso a tus  {''}
                    <span className="text-slate-700">proyectos</span>
        </h1>
        {msg && <Alerta alerta={alerta}/>}
        {tokenValido &&(
          <form 
            onSubmit={handleSubmit}
            className="my-10 bg-white shadow rounded-lg px-10 py-5"
          >
            <div className="my-5">
              <label 
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >Password</label>
              <input
                id="password"
                type="password"
                placeholder="Tu nuevo password"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </div>
            <input 
              type="submit"
              value="Guardar nuevo password"
              className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
        </form>
        )}
        <Link
          className="block text-center my-5 text-slate-500 text-sm"
          to="/"
        >Inicia Sesion</Link>
    </>
  )
}

export default NuevoPassword
