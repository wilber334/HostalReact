import Card from "./Card";
import { db } from "./Firebase";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

var numeroDeHabitacion;
function Principal() {
  const [listaHabitacion, setlistaHabitacion]=useState([]);
  useEffect(()=>{
      db.collection("habitaciones").where("situacion","!=","No Disponible")
    .onSnapshot((querySnapshot) => {
        var hab = [];
        querySnapshot.forEach((doc) => {
            hab.push({...doc.data(),id:doc.id});
        });
        setlistaHabitacion(hab);
    });
    
  },[]);
  useEffect(()=>{
    
    db.collection("reservas")
      .where("fecha_reservada", ">=", new Date().getTime())
      .orderBy("fecha_reservada","desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          document.getElementById("r" + doc.data().numero_Habitacion).className =
           "reserva";
          document.getElementById("r" + doc.data().numero_Habitacion).innerText =
            "reservado para:" +
            dayjs(doc.data().verfecha_reservada).format("DD/MM/YYYY") +
            " por: " +
            doc.data().tiempo_Hospedaje +
            " dias";
        });
      });
  },[]);
  function expandir(id) {
    numeroDeHabitacion = id.currentTarget.id;
    document.getElementById("numeroDeHabitacion").innerText =
      numeroDeHabitacion;
    document.getElementById("nhab").innerText =
      "HABITACIÓN - " + numeroDeHabitacion;
    document.getElementById("nhab2").innerText =
      "HABITACIÓN - " + numeroDeHabitacion;
    let usuario=document.getElementById('user'+numeroDeHabitacion).textContent;
    let estado = document.getElementById("h" + numeroDeHabitacion).classList
      .value;
    if (estado === "Libre") {
      document.getElementById("menu").style.display = "none";
      document.getElementById("formulario").style.display = "block";
      document.getElementById("editarformulario").style.display = "none";
      document.getElementById("ocupado").style.display = "none";
      document.getElementById("limpieza").style.display = "none";
      if (window.innerWidth <= 411) {
        document.getElementById("alertas").style.display = "none";
      }
    } else if (estado === "Ocupado") {
      db.collection("editar")
      .doc("editarUsuario")
      .update({
        usuario:usuario, 
      });
      document.getElementById("formulario").style.display = "none";
      document.getElementById("ocupado").style.display = "block";
      document.getElementById("editarformulario").style.display = "block";
      document.getElementById("menu").style.display = "none";
      document.getElementById("limpieza").style.display = "none";
      if (window.innerWidth <= 411) {
        document.getElementById("alertas").style.display = "none";
      }
    } else {
      document.getElementById("limpieza").style.display = "block";
      document.getElementById("menu").style.display = "none";
      document.getElementById("formulario").style.display = "none";
      document.getElementById("editarformulario").style.display = "none";
      document.getElementById("ocupado").style.display = "none";
      if (window.innerWidth <= 411) {
        document.getElementById("alertas").style.display = "none";
      }
    }
  }
  const card=listaHabitacion.map((habitacion)=>{
    return(
      <Card hab={habitacion.habitacion} situacion={habitacion.situacion} user={habitacion.usuario}
      descripcion={habitacion.descripcion} precio={habitacion.precio} expandir={expandir}
      key={habitacion.id}
      />
    );
  });
  return (
    <div className="article">
      {card}
    </div>
  );
}
export default Principal;
