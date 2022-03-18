import { db } from "./Firebase";
import { useState, useEffect } from "react";
import Cajacard from "./Cajacard";
import { Link } from "react-router-dom";
import "./caja.css";
import dayjs from "dayjs";
import printJS from "print-js";
function Caja() {
  const [ingresosEgresos, setingresosEgresos] = useState([]);
  const [formulario, setformulario] = useState(false);
  const [abrirformcaja, setabrirformcaja] = useState(false);
  const [turno, setturno] = useState("");
  const [fechafiltro, setfechafiltro] = useState(new Date(dayjs().format("MM/DD/YYYY")).getTime());

  function Exportar(table, name) {//FUNCION PARA EXPORTAR EN EXCEL
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
  useEffect(() => {
    db.collection("caja")
      .where("fecha", ">=", fechafiltro)
      .orderBy("fecha", "desc")
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setingresosEgresos(docs);
      });
  }, [fechafiltro, formulario]);
  useEffect(()=>{
    db.collection("turno")
      .doc("turno")
      .get()
      .then((doc) => {
        setturno(doc.data().nombre)
      });
  },[]);
  let ingresos = [];
  let egresos = [];
  let ingreso;
  let egreso;
  let resultado;
  let efectivo = [];
  let gastoefectivo = [];
  let yape = [];
  let plin = [];
  let tarjeta = [];
  let transferencia = [];
  // let cerrarcaja=[];
  let otros = [];
  function balance() {
    document.getElementById('balanceCaja').innerText="Desbalance:"+(document.getElementById('montorealencaja').value-
    (roundToTwo(roundToTwo(efectivo.reduce((a, b) => a + b, 0)) - roundToTwo(gastoefectivo.reduce((a, b) => a + b, 0)))));
  }
  function calcularIyE() {
    ingreso = ingresos.reduce((a, b) => a + b, 0);
    egreso = egresos.reduce((a, b) => a + b, 0);
    resultado = ingreso - egreso;
    ingreso = roundToTwo(ingreso);
    egreso = roundToTwo(egreso);
    resultado = roundToTwo(resultado);
  }
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  return (
    <div className="boxcaja">
      <div className="encabezado">
        <div className="titulo">
          <span style={{ marginLeft: "10px" }}>
            <button onClick={() => {
              if (turno!=="") {
                db.collection("turno").doc("turno")
                .get()
                .then((doc) => {
                  if (doc.exists) {
                      setfechafiltro(doc.data().fecha)
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
                });
              }else{
                alert("no hay un turno abierto");
              }
            }}
            >turno:{turno}</button></span>
          <h2>
            Caja
          </h2>
          <span>
            <button onClick={() => {
              printJS("tablaCaja", "html")
            }}>imprimir</button>            {/* imprimir con prinjs */}
            <button onClick={() => { Exportar("tablaCaja", "Caja") }}>descargar excel</button> {/*EXPORTAR EN EXCEL*/}
            <Link to="/">
              <button className="btn-cerrar">x</button>
            </Link>
          </span>
        </div>
      </div>
      <div className="boxtable">
        <table id="tablaCaja">
          <thead>
            <tr>
              <th>Fecha
                <input type="date" id="fechafiltercaja" onChange={() => {
                  setfechafiltro(new Date(dayjs(document.getElementById("fechafiltercaja").value).format(
                    "YYYY,MM,DD"
                  )).getTime())
                }} />
              </th>
              <th>Tipo</th>
              <th>Descripcion</th>
              <th>Monto</th>
              <th>Metodo Pago</th>
            </tr>
          </thead>
          <tbody id="itempedido">
            {ingresosEgresos.map((item) => {
              if (item.tipo === "ingreso") {
                ingresos.push(item.monto);
              } else if(item.tipo==="egreso") {
                egresos.push(item.monto);
              }
              if (item.metodoPago === "Efectivo" & item.tipo === "ingreso") {
                efectivo.push(item.monto);
              } else if (item.metodoPago === "Efectivo" & item.tipo === "egreso") {
                gastoefectivo.push(item.monto);
              }
              else if (item.metodoPago === "Yape") {
                yape.push(item.monto);
              } else if (item.metodoPago === "Plin") {
                plin.push(item.monto);
              } else if (item.metodoPago === "Tarjeta") {
                tarjeta.push(item.monto);
              } else if (item.metodoPago === "Transferencia Bancaria") {
                transferencia.push(item.monto);
              } else { otros.push(item.monto); }

              return (
                <Cajacard
                  fecha={item.verfecha}
                  descripcion={item.descripcion}
                  clase={item.tipo}
                  monto={item.monto}
                  metodo={item.metodoPago}
                  key={item.id}
                />
              );
            })}
          </tbody>
          <tfoot>
            <tr>{calcularIyE()}
              <th>Total Ingreso:</th>
              <th>{ingreso}</th>
              <th>Total Egreso:</th>
              <th>{egreso}</th>
            </tr>
            <tr>
              <td>Turno:{turno}</td>
              <td></td>
              <th>Saldo:</th>
              <th>{resultado}</th>
            </tr>
            <tr>
              <td colSpan={5} style={{ fontStyle: "italic" }}>
                {"Efectivo:" + roundToTwo(roundToTwo(efectivo.reduce((a, b) => a + b, 0)) - roundToTwo(gastoefectivo.reduce((a, b) => a + b, 0))) +   //falta revisar el colspan
                  ", ...Yape:" + roundToTwo(yape.reduce((a, b) => a + b, 0)) +
                  ", ...Plin:" + roundToTwo(plin.reduce((a, b) => a + b, 0)) +
                  ", ...Tarjeta:" + roundToTwo(tarjeta.reduce((a, b) => a + b, 0)) +
                  ", ...Transferencia Bancaria:" + roundToTwo(transferencia.reduce((a, b) => a + b, 0)) +
                  ", ...Otro:" + roundToTwo(otros.reduce((a, b) => a + b, 0))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {calcularIyE()}
      <div className="footer">
        <h4>
          Ingresos:{ingreso} - Egresos:
          {egreso}
        </h4>
        <h3>
          Saldo: {resultado}
        </h3>
        <span>
          <button
            className={formulario ? "btn-cerrar" : "btn-agregar"}
            onClick={() => {
              setformulario(!formulario);
            }}
          >
            {formulario ? "x" : "Agregar"}
          </button>
          <button style={{ marginRight: "-30px" }} onClick={() => {
            setabrirformcaja(!abrirformcaja);
          }}>{turno === "" ? "Abrir caja" : "Cerrar caja"}</button>
        </span>
      </div>
      {abrirformcaja ?
        (<div>
          <div>
            <h3>{turno === "" ? "ABRIR CAJA" : "CERRAR CAJA"}</h3>
            <button style={{ backgroundColor: "red", color: "white", float: "right" }} onClick={() => { setabrirformcaja(!abrirformcaja) }}>X</button>
          </div>
          <label htmlFor="nombreturno">Nombres:</label>
          <input type="text" id="nombreturno" defaultValue={turno}/><br />
          {turno === "" ?
            <>
              <label htmlFor="montonuevocaja">Monto:</label>
              <input type="number" id="montonuevocaja" />
              <button style={{ backgroundColor: "greenyellow" }} onClick={() => {
                //funcion para guardar cambios
                db.collection("turno")
                  .doc("turno")
                  .update({
                    nombre: document.getElementById('nombreturno').value,
                    fecha: new Date().getTime(),
                  });
                db.collection("caja").add({
                  fecha: new Date().getTime(),
                  verfecha: dayjs().format("DD/MM/YYYY HH:mm"),
                  tipo: "ingreso",
                  descripcion: document.getElementById("nombreturno").value+": abrir caja",
                  monto: Number(document.getElementById("montonuevocaja").value),
                  metodoPago: "Efectivo"
                });
                setturno(document.getElementById('nombreturno').value);
                setabrirformcaja(!abrirformcaja);

              }}>Abrir Caja</button>
            </>
            : <>
              <label htmlFor="montoteoricoencaja">Monto Teorico en caja:</label>
              <input type="number" id="montoteoricoencaja" disabled defaultValue={roundToTwo(roundToTwo(efectivo.reduce((a, b) => a + b, 0)) - roundToTwo(gastoefectivo.reduce((a, b) => a + b, 0)))}/>
              <span id="balanceCaja"></span>
              <br />
              <label htmlFor="montorealencaja">Monto Real en caja:</label>
              <input type="number" id="montorealencaja" onChange={()=>{balance();}}/>
              <button style={{ backgroundColor: "greenyellow" }} onClick={() => {
                //funcion ....
                db.collection("turno")
                  .doc("turno")
                  .update({
                    nombre: "",
                    fecha: new Date().getTime(),
                  });
                db.collection("historialTurnos").add({
                  fecha: new Date().getTime(),
                  verfecha: dayjs().format("DD/MM/YYYY HH:mm"),
                  tipo: "cerrar caja",
                  descripcion: document.getElementById("nombreturno").value,
                  montoTeorico: Number(document.getElementById("montoteoricoencaja").value),
                  montoReal: Number(document.getElementById("montorealencaja").value),
                });
                setturno("");
                setabrirformcaja(!abrirformcaja);
              }}>Cerrar Caja</button>
            </>}
        </div>)
        : null
      }
      {formulario ? (
        <div>
          <label htmlFor="select">Tipo:</label>
          <select id="select">
            <option value="ingreso" defaultValue>
              Ingreso
            </option>
            <option value="egreso">Egreso</option>
          </select>
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" autoComplete="off" />
          <label htmlFor="monto">Monto:</label>
          <input type="number" id="monto" />
          <button
            className="btn-agregar"
            onClick={() => {
              if (document.getElementById("monto").value !== "" & document.getElementById("descripcion").value !== "") {
                setformulario(!formulario);
                db.collection("caja").add({
                  fecha: new Date().getTime(),
                  verfecha: dayjs().format("DD/MM/YYYY HH:mm"),
                  tipo: document.getElementById("select").value,
                  descripcion: document.getElementById("descripcion").value,
                  monto: Number(document.getElementById("monto").value),
                  metodoPago: "Efectivo"
                });
              } else {
                alert("agregre Descripcion y monto");
              }
            }}
          >
            Agregar
          </button>
        </div>
      ) : null}
    </div>
  );
}
export default Caja;
