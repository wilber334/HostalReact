import "./alertas.css";
import dayjs from "dayjs";
import { db } from "./Firebase";

function Alertas() {
setInterval(cuentaRegresiva, 60000);

  function cuentaRegresiva() {
    document.getElementById("recordatorio").innerHTML = "";
    for (let i = 0; i < almacenDeFechas.length; i++) {
      contadorTiempo(almacenDeFechas[i].fecha, almacenDeFechas[i].habitacion);
    }
  }
  function contadorTiempo(fecha, habitacion) {
    let presente = dayjs();
    let futuro = dayjs(fecha);
    let diferenciaDias = futuro.diff(presente, "d");
    let diferenciaHoras = futuro.diff(presente, "h") - diferenciaDias * 24;
    let diferenciaMinutos =
      futuro.diff(presente, "m") - (diferenciaDias * 24 + diferenciaHoras) * 60;
    if (diferenciaDias === 0) {
      document.getElementById("recordatorio").innerHTML ="";
      document.getElementById("recordatorio").innerHTML +=
        "<li class='danger'>habitacion " +
        habitacion +
        ", reservada para el " +
        futuro.format("DD/MM/YYYY") +
        " => falta: " +
        diferenciaDias +
        "d : " +
        diferenciaHoras +
        "h : " +
        diferenciaMinutos +
        "m </li>";
    } else {
      document.getElementById("recordatorio").innerHTML +=
        "<li class='predanger'>habitacion " +
        habitacion +
        ", reservada para el " +
        futuro.format("DD/MM/YYYY") +
        " => falta: " +
        diferenciaDias +
        "d : " +
        diferenciaHoras +
        "h : " +
        diferenciaMinutos +
        "m </li>";
    }
  }
  var almacenDeFechas = [];
  db.collection("reservas")
    .where("fecha_reservada", ">=", new Date().getTime())
    .orderBy("fecha_reservada")
    // .get()
    // .then
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        almacenDeFechas.push({
          fecha: doc.data().verfecha_reservada,
          habitacion: doc.data().numero_Habitacion,
        });
      });
      cuentaRegresiva();
    });
  return (
    <div className="boxnotas" id="alertas">
      <div className="notas">
        <h5>Reservaciones Proximas</h5>
        <ul className="recordatorio" id="recordatorio">
          <li>importante</li>
        </ul>
      </div>
    </div>
  );
}
export default Alertas;
