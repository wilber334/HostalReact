import dayjs from "dayjs";
import { db } from "./Firebase";
import { Link } from "react-router-dom";
import "./reservaciones.css";
import { useState, useEffect } from "react";
import Reservascard from "./Reservascard";

function Reservaciones() {
  const [reservas, setreservas] = useState([]);
  const [fechafiltro, setfechafiltro]=useState(new Date().getTime());

  useEffect(() => {
    db.collection("reservas")
      .where("fecha_reservada", ">=", fechafiltro)
      .orderBy("fecha_reservada")
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setreservas(docs);
      });
  }, [fechafiltro]);
  return (
    <div className="rDatos" id="registrodeDatos">
      <div className="headDatos">
        <h3>RESERVACIONES</h3>
        <Link to="/">
          <button className="btn-cerrar">x</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              Fecha Reservada{" "}
              <input type="date" id="fechafilter" onChange={()=>{
                setfechafiltro(new Date(dayjs(document.getElementById("fechafilter").value).format(
                  "YYYY,MM,DD"
                )).getTime())
                }} />
            </th>
            <th>Dias Reservados</th>
            <th>Num. Habitación</th>
            <th>Nombres</th>
            <th>Doc.</th>
            <th>Num. Documento</th>
            <th>Num. telefono</th>
            <th>Importe a Pagar</th>
            <th>Importe Pagado</th>
            <th>Observaciones</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((item) => {
            return (
              <Reservascard
                fecha={item.fecha}
                verfecha_reservada={dayjs(item.verfecha_reservada).format("DD/MM/YYYY")}
                tiempo_Hospedaje={item.tiempo_Hospedaje}
                numero_Habitacion={item.numero_Habitacion}
                nombres={item.nombres}
                documento_de_identificacion={item.documento_de_identificacion}
                numero_de_identificacion={item.numero_de_identificacion}
                numero_Telefono={item.numero_Telefono}
                importe_Pagar={item.importe_Pagar}
                importe_Pagado={item.importe_Pagado}
                observaciones={item.observaciones}
                id={item.id}
                key={item.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Reservaciones;
