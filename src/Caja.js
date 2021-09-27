import { db } from "./Firebase";
import { useState, useEffect } from "react";
import Cajacard from "./Cajacard";
import { Link } from "react-router-dom";
import "./caja.css";
import dayjs from "dayjs";
function Caja() {
  const [ingresosEgresos, setingresosEgresos] = useState([]);
  const [formulario, setformulario] = useState(false);
  useEffect(() => {
      const unsubscribe=db.collection("caja").orderBy("fecha").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setingresosEgresos(docs);
      });
    return unsubscribe;
  }, []);
  let ingresos = [];
  let egresos = [];
  let ingreso;
  let egreso;
  let resultado;
  function calcularIyE() {
    ingreso = ingresos.reduce((a, b) => a + b, 0);
    egreso = egresos.reduce((a, b) => a + b, 0);
    resultado = ingreso - egreso;
    ingreso=roundToTwo(ingreso);
    egreso=roundToTwo(egreso);
    resultado=roundToTwo(resultado);  
  }
  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
  return (
    <div className="boxcaja">
      <div className="encabezado">
        <div className="titulo">
          <h2>Caja</h2>
          <Link to="/">
            <button className="btn-cerrar">x</button>
          </Link>
        </div>
      </div>
      <div className="boxtable">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripcion</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody id="itempedido">
            {ingresosEgresos.map((item) => {
              if (item.tipo === "ingreso") {
                ingresos.push(item.monto);
              } else {
                egresos.push(item.monto);
              }
              return (
                <Cajacard
                  fecha={item.verfecha}
                  descripcion={item.descripcion}
                  clase={item.tipo}
                  monto={item.monto}
                  key={item.id}
                />
              );
            })}
          </tbody>
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
        <button
          className={formulario ? "btn-cerrar" : "btn-agregar"}
          onClick={() => {
            setformulario(!formulario);
          }}
        >
          {formulario ? "x" : "Agregar"}
        </button>
      </div>
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
          <input type="text" id="descripcion" />
          <label htmlFor="monto">Monto:</label>
          <input type="number" id="monto" />
          <button
            className="btn-agregar"
            onClick={() => {
              if (document.getElementById("monto").value !== "") {
                setformulario(!formulario);
                db.collection("caja").add({
                  fecha: new Date().getTime(),
                  verfecha:dayjs().format("DD/MM/YYYY"),
                  tipo: document.getElementById("select").value,
                  descripcion: document.getElementById("descripcion").value,
                  monto: parseFloat(document.getElementById("monto").value),
                });
              } else {
                alert("agregre un monto");
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
