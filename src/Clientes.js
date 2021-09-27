import "./reservaciones.css";
import { db } from "./Firebase";
import { Link } from "react-router-dom";
function Clientes() {
    var clientes = [];
  function mostrarDatos() {
    db.collection("huespedes").where("mes","==",new Date().getMonth()+1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        clientes.push(doc.data());
      });
      clientes.sort(function(a, b) {
        return b.date - a.date;
      });
      addTabla();
    });
  }
  function addTabla() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    for (let i = 0; i < clientes.length; i++) {
      tabla.innerHTML +=
        "<tr><td>" +
        clientes[i].fecha +
        "</td><td>" +
        clientes[i].nombres +
        "</td><td>" +
        clientes[i].documento_de_identificacion +
        "</td><td>" +
        clientes[i].numero_de_identificacion +
        "</td><td>" +
        clientes[i].numero_Telefono +
        "</td><td>" +
        clientes[i].numero_Habitacion +
        "</td><td>" +
        clientes[i].tiempo_Hospedaje +
        "</td><td>" +
        clientes[i].importe_Pagar +
        "</td><td>" +
        clientes[i].importe_Pagado +
        "</td></tr>";
    }
  }
  mostrarDatos();
    return(
        <div className="rDatos" id="registrodeDatos">
      <div className="headDatos">
        <h3>REGISTRO DE HUESPEDES</h3>
        <Link to="/">
        <button className="btn-cerrar">x</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
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
        <tbody id="tabla"></tbody>
      </table>
    </div>
    );
}
export default Clientes;