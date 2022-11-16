import React from 'react'
import { useState,useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
const FormularioProyecto = () => {
    const params=useParams()
    const {mostrarAlerta,alerta,submitProyecto,proyecto}=useProyectos()
    const[nombre,setNombre]=useState('')
    const[descripcion,setDescripcion]=useState('')
    const[fechaEntrega,setFechaEntrega]=useState('')
    const[cliente,setCliente]=useState('')
    const [id,setId]=useState(null)
    const handleSubmit= async e=>{
        e.preventDefault()
        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }
        await submitProyecto({
            nombre,
            descripcion,
            fechaEntrega,
            cliente,
            id
        })
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        
    }
    useEffect(()=>{
        if(params.id){
            setId(proyecto._id)
            setNombre(proyecto?.nombre)
            setDescripcion(proyecto?.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto?.cliente)
        }
    },[params])
    const {msg}=alerta
  return (
    <form 
        onSubmit={handleSubmit}
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-lg'
    >
        {msg && <Alerta alerta={alerta}/>}
        <div className='mb-5'>
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='nombre'
            >Nombre Proyecto</label>
            <input
                id="nombre"
                type="text"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Proyecto'
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='descripcion'
            >Descripcion</label>
            <textarea
                id="descripcion"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Descripcion del proyecto'
                value={descripcion}
                onChange={e=>setDescripcion(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='fecha_entrega'
            >Fecha de entrega</label>
            <input
                id="fecha_entrega"
                type="date"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaEntrega}
                onChange={e=>setFechaEntrega(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='cliente'
            >Cliente del Proyecto</label>
            <input
                id="cliente"
                type="text"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Cliente del Proyecto'
                value={cliente}
                onChange={e=>setCliente(e.target.value)}
            />
        </div>
        <input 
            type="submit"
            value={params.id ? "Editar Proyecto" : "Crear Proyecto"}
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
        
        />
        
        
    </form>
  )
}

export default FormularioProyecto