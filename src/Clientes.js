import "./reservaciones.css";
import { db } from "./Firebase";
import { Link } from "react-router-dom";
import printJS from "print-js";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
function Clientes() {
  const [huespedes, sethuespedes]=useState([]);
  const [fechafiltro, setfechafiltro]=useState(new Date(dayjs().format("MM/DD/YYYY")).getTime());

function Exportar(table,name){//FUNCION PARA EXPORTAR EN EXCEL
  var uri = 'data:application/vnd.ms-excel;base64,'
  , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
  , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
  , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

  if (!table.nodeType) table = document.getElementById(table)
   var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
   window.location.href = uri + base64(format(template, ctx))
}
  useEffect(()=>{
    db.collection("huespedes")
      .where("fecha", ">=", fechafiltro)
      .orderBy("fecha","desc")
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
        }}>imprimir</button>              {/* imprimir con prinjs */}
        <button onClick={()=>{Exportar("imprimirClientes","huespedes")}}>descargar excel</button> {/*EXPORTAR EN EXCEL*/}
        </h3>
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
            <th>Metodo de Pago</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody id="tabla">
        {huespedes.map((item) => {
            return (
              <tr key={item.nombres}>
                <td>{item.verfecha}</td>
                <td>{item.nombres}</td>
                <td>{item.documento_de_identificacion}</td>
                <td>{item.numero_de_identificacion}</td>
                <td>{item.numero_Telefono}</td>
                <td>{item.numero_Habitacion}</td>
                <td>{item.tiempo_Hospedaje}</td>
                <td>{item.importe_Pagar}</td>
                <td>{item.importe_Pagado}</td>
                <td>{item.Metodo_Pago}</td>
                <td>{item.observaciones}</td>
            </tr>
            );
          })}
          </tbody>
      </table>
    </div>
    );
}
export default Clientes;