import "./titulo.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function fecha() {
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let fecha = new Date();
  let fechaActual =
    diasSemana[fecha.getDay()] +
    ", " +
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getFullYear();
  return fechaActual;
}
function sololibres() {
  let limpieza = document.getElementsByClassName("Limpieza");
  let ocupado = document.getElementsByClassName("Ocupado");
  for (let i = 0; i < limpieza.length; i++) {
    limpieza[i].parentNode.parentNode.style.display = "none";
  }
  for (let i = 0; i < ocupado.length; i++) {
    ocupado[i].parentNode.parentNode.style.display = "none";
  }
}
function vertodos() {
  let limpieza = document.getElementsByClassName("Limpieza");
  let ocupado = document.getElementsByClassName("Ocupado");
  for (let i = 0; i < limpieza.length; i++) {
    limpieza[i].parentNode.parentNode.style.display = "grid";
  }
  for (let i = 0; i < ocupado.length; i++) {
    ocupado[i].parentNode.parentNode.style.display = "grid";
  }
}
function verMenu() {
  document.getElementById("ocupado").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("editarformulario").style.display = "none";
}
function Titulo() {
  const [modoedicion, setmodoedicion] = useState(false);
  const [editar, seteditar] = useState(false);
  return (
    <header>
      <h1>Hostal Santa Catalina</h1>
      <h4>{fecha()}</h4>
      <button className="vermenu" onClick={verMenu}>Menu</button>

      {editar ?
        <>
          {modoedicion ? <Link to="/"> {/*falta probar codigo*/}
            <button onClick={() => { setmodoedicion(!modoedicion); seteditar(!editar) }}>Guardar Cambios</button>
          </Link> : <Link to="/edicion">
            <button onClick={() => { setmodoedicion(!modoedicion) }}>Modo Edicion</button>
          </Link>}
        </>
        : <button onClick={() => {
          if (window.confirm("¿seguro que desea editar?")) {
            seteditar(!editar);
          }
        }}>Editar</button>
      }
      <button className="btn-opcion" onClick={vertodos}>
        ver todos
      </button>
      <button className="btn-opcion" onClick={sololibres}>
        ver solo libres
      </button>
    </header>
  );
}
export default Titulo;
