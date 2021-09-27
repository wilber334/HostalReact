import Card from "./Card";
import { db } from "./Firebase";
import dayjs from "dayjs";

var numeroDeHabitacion;
function Principal() {
  db.collection("habitaciones").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      document.getElementById("h" + doc.data().habitacion).className =
        doc.data().situacion;
      document.getElementById("h" + doc.data().habitacion).innerText =
        doc.data().situacion;
      if (doc.data().situacion === "Ocupado") {
        document.getElementById("h" + doc.data().habitacion).innerText +=
          " " +
          doc.data().fecha +
          " >" +
          doc.data().tiempodeHospedaje +
          " dias  =>" +
          doc.data().deuda;
      }
    });
  });
  db.collection("reservas")
    .where("fecha_reservada", ">=", new Date().getTime())
    .orderBy("fecha_reservada")
    // .get()
    // .then
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
  function expandir(id) {
    //utilizado por el boton Libre, ocupado y rl
    numeroDeHabitacion = id.currentTarget.id;
    document.getElementById("numeroDeHabitacion").innerText =
      numeroDeHabitacion;
    document.getElementById("nhab").innerText =
      "HABITACIÓN - " + numeroDeHabitacion;
    document.getElementById("nhab2").innerText =
      "HABITACIÓN - " + numeroDeHabitacion;
    let estado = document.getElementById("h" + numeroDeHabitacion).classList
      .value;
    if (estado === "Libre") {
      document.getElementById("menu").style.display = "none";
      document.getElementById("formulario").style.display = "block";
      document.getElementById("ocupado").style.display = "none";
      document.getElementById("limpieza").style.display = "none";
      if (window.innerWidth <= 411) {
        document.getElementById("alertas").style.display = "none";
      }
    } else if (estado === "Ocupado") {
      document.getElementById("ocupado").style.display = "block";
      document.getElementById("menu").style.display = "none";
      document.getElementById("formulario").style.display = "none";
      document.getElementById("limpieza").style.display = "none";
      if (window.innerWidth <= 411) {
        document.getElementById("alertas").style.display = "none";
      }
    } else {
      document.getElementById("limpieza").style.display = "block";
      document.getElementById("menu").style.display = "none";
      document.getElementById("formulario").style.display = "none";
      document.getElementById("ocupado").style.display = "none";
      if (window.innerWidth <= 411) {
        document.getElementById("alertas").style.display = "none";
      }
    }
  }
  return (
    <div className="article">
      <Card
        hab="101"
        detalle="no disponible"
        precio="S/ 100.00"
        expandir={expandir}
      />
      <Card
        hab="102"
        detalle="no disponible"
        precio="S/ 100.00"
        expandir={expandir}
      />
      <Card
        hab="103"
        detalle="no disponible"
        precio="S/ 100.00"
        expandir={expandir}
      />
      <Card
        hab="201"
        detalle="Habitacion Doble simple c/baño compartido"
        precio="S/ 40.00"
        expandir={expandir}
      />
      <Card
        hab="202"
        detalle="Habitacion Triple c/baño compartido"
        precio="S/ 60.00"
        expandir={expandir}
      />
      <Card
        hab="203"
        detalle="Habitacion Triple c/baño compartido"
        precio="S/ 60.00"
        expandir={expandir}
      />
      <Card
        hab="204"
        detalle="Habitacion Doble c/baño privado, TV-Cable"
        precio="S/ 65.00"
        expandir={expandir}
      />
      <Card
        hab="205"
        detalle="Habitacion Matrimonial c/baño privado, TV-Cable"
        precio="S/ 70.00"
        expandir={expandir}
      />
      <Card
        hab="206"
        detalle="Habitacion Matrimonial c/baño privado, TV-Cable"
        precio="S/ 70.00"
        expandir={expandir}
      />
      <Card
        hab="207"
        detalle="Habitacion Matrimonial + 2 Adicionales, c/baño privado, TV-Cable"
        precio="S/ 90.00"
        expandir={expandir}
      />
      <Card
        hab="208"
        detalle="Habitacion Doble, TV-Cable"
        precio="S/ 50.00"
        expandir={expandir}
      />
      <Card
        hab="209"
        detalle="Habitacion Matrimonial c/baño privado, TV-Cable"
        precio="S/ 70.00"
        expandir={expandir}
      />
      <Card
        hab="301"
        detalle="Habitacion Triple c/baño compartido"
        precio="S/ 60.00"
        expandir={expandir}
      />
      <Card
        hab="302"
        detalle="Habitacion Triple c/baño compartido"
        precio="S/ 60.00"
        expandir={expandir}
      />
      <Card
        hab="303"
        detalle="Habitacion Triple c/baño compartido"
        precio="S/ 60.00"
        expandir={expandir}
      />
      <Card
        hab="304"
        detalle="Habitacion Matrimonial c/baño privado, TV-Cable"
        precio="S/ 70.00"
        expandir={expandir}
      />
    </div>
  );
}
export default Principal;
