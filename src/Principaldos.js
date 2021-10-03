import { useState, useEffect } from "react";
import { db } from "./Firebase";
import Carddos from "./Carddos";

function Principaldos() {
  const [listaHabitacion, setlistaHabitacion]=useState([]);
  useEffect(()=>{
    const traerDatos=()=>{
      db.collection("habitaciones")
    .onSnapshot((querySnapshot) => {
        var hab = [];
        querySnapshot.forEach((doc) => {
            hab.push({...doc.data(),id:doc.id});
        });
        setlistaHabitacion(hab);
    });}
    traerDatos();
  },[]);
  const card=listaHabitacion.map((habitacion)=>{
    return(
      <Carddos hab={habitacion.habitacion} situacion={habitacion.situacion}
      descripcion={habitacion.descripcion} precio={habitacion.precio} 
      key={habitacion.id}
      />
    );
  });
  return(
<div className="article">
  {card}
</div>
  );
  
}
export default Principaldos;
