import dayjs from "dayjs";
import { db } from "./Firebase";
import { Link } from "react-router-dom";
import "./reservaciones.css";
import { useState, useEffect } from "react";
import Reservascard from "./Reservascard";
import printJS from "print-js";

function Reservaciones() {
  const [reservas, setreservas] = useState([]);
  const [fechafiltro, setfechafiltro]=useState(new Date().getTime());

  useEffect(() => {
    db.collection("reservas")
      .where("fecha_reservada", ">=", fechafiltro)
      .orderBy("fecha_reservada")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setreservas(docs);
      });
  }, [fechafiltro]);

  function Exportar(table,name){//FUNCION PARA EXPORTAR EN EXCEL
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
  
    if (!table.nodeType) table = document.getElementById(table)
     var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
     window.location.href = uri + base64(format(template, ctx))
  }
  return (
    <div className="rDatos" id="registrodeDatos">
      <div className="headDatos">
        <h3>RESERVACIONES <button onClick={()=>{
          printJS("imprimirReservaciones","html")
        }}>imprimir</button><button onClick={()=>{Exportar("imprimirReservaciones","Reservaciones")}}>descargar excel</button> {/*EXPORTAR EN EXCEL*/}
        </h3>
        <Link to="/">
          <button className="btn-cerrar">x</button>
        </Link>
      </div>
      <table id="imprimirReservaciones">
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
            <th>Reservado por:</th>
            <th>Habitación</th>
            <th>Nombres</th>
            <th>Doc.</th>
            <th>Num. Doc</th>
            <th>Telefono</th>
            <th>Total a Pagar</th>
            <th>Monto Pagado</th>
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
