import { useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import PreviewProyectos from '../components/PreviewProyectos'
import Alerta from '../components/Alerta'
import io from 'socket.io-client'

let socket;

const Proyectos = () => {
  const {proyectos,alerta}=useProyectos()
  const {msg}=alerta
  // useEffect(()=>{
  //   socket=io(import.meta.env.VITE_BACKEND_URL) //Conexion para el backEnd
  //   socket.emit('prueba',"Juan") //Emitir el evento
  //   socket.on('respuesta',()=>{
  //     console.log("esta es la pinche respuesta")
  //   })
  // }) //EL EFFECT VA SIN DEPENDENCIAS PARA QUE ESTE CORRIENDO TODO EL TIEMPO
  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      {msg && <Alerta alerta={alerta}/>}
      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ? 
          proyectos.map(proyecto=>(
            <PreviewProyectos  key={proyecto._id} proyecto={proyecto}/>
          ))

        : <p className='mt-5 text-center text-gray-600 uppercase p-5'>No hay proyectos aun</p>}
      </div>
    </>
  )
}

export default Proyectos