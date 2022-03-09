import "./alertas.css";
import { db } from "./Firebase";
import Alertacard from "./alertacard";
import { useState, useEffect } from "react";

function Alertas() {
  const [fechasReservadas, setfechasReservadas] = useState([]);
  useEffect(() => {
    db.collection("reservas")
      .where("fecha_reservada", ">=", new Date().getTime())
      .orderBy("fecha_reservada")
      .onSnapshot((querySnapshot) => {
        let almacenDeFechas = [];
        let n=0;
        querySnapshot.forEach((doc) => {
          almacenDeFechas.push({
            fecha: doc.data().verfecha_reservada,
            habitacion: doc.data().numero_Habitacion,
            n:n++
          });
        });
        setfechasReservadas(almacenDeFechas);
      });
  }, []);
  return (
    <div className="boxnotas" id="alertas">
      <div className="notas">
        <h5>Reservaciones Proximas</h5>
        <ol>
          {fechasReservadas.map((item) => {
            return (
              <Alertacard
                fecha={item.fecha}
                habitacion={item.habitacion}
                key={item.n}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}
export default Alertas;
