import "./reservaciones.css";
import { db } from "./Firebase";
import { Link } from "react-router-dom";
import printJS from "print-js";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
function Clientes() {
  const [huespedes, sethuespedes]=useState([]);
  const [fechafiltro, setfechafiltro]=useState(new Date().getTime());
  
  useEffect(()=>{
    db.collection("huespedes")
      .where("date", ">=", fechafiltro)
      .orderBy("date")
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        sethuespedes(docs);
      });
  },[fechafiltro]);
  
    return(
        <div className="rDatos" id="registrodeDatos">
      <div className="headDatos">
        <h3>REGISTRO DE HUESPEDES<button onClick={()=>{
          printJS("imprimirClientes","html")
        }}>imprimir</button></h3>
        <Link to="/">
        <button className="btn-cerrar">x</button>
        </Link>
      </div>
      <table id="imprimirClientes">
        <thead>
          <tr>
            <th>Fecha
            <input type="date" id="fechafilterhuespedes" onChange={()=>{
                setfechafiltro(new Date(dayjs(document.getElementById("fechafilterhuespedes").value).format(
                  "YYYY,MM,DD"
                )).getTime())
                }} />
            </th>
            <th>Nombres</th>
            <th>Doc. Identificación</th>
            <th>Num. Documento</th>
            <th>Num. telefono</th>
            <th>Num. Habitación</th>
            <th>Dias de Hospedaje</th>
            <th>Importe a Pagar</th>
            <th>Importe Pagado</th>
          </tr>
        </thead>
        <tbody id="tabla">
        {huespedes.map((item) => {
            return (
              <tr>
                <td>{item.date}</td>
                <td>{item.nombres}</td>
                <td>{item.numero_Habitacion}</td>
                <td>{item.nombres}</td>
                <td>{item.documento_de_identificacion}</td>
                <td>{item.numero_de_identificacion}</td>
                <td>{item.numero_Telefono}</td>
                <td>{item.importe_Pagar}</td>
                <td>{item.importe_Pagado}</td>
                <td>{item.observaciones}</td>
                <td>{item.fecha}</td>
                <td><button>{item.id}</button></td>
            </tr>
            );
          })}
          </tbody>
      </table>
    </div>
    );
}
export default Clientes;