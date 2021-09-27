import "./desocuparyhabilitar.css"

function cerrar() {
  document.getElementById("limpieza").style.display="none";
  document.getElementById("menu").style.display="block";
  if (window.innerWidth<=411) {
    document.getElementById("menu").style.display="none";
    document.getElementById("alertas").style.display="block";
  }
}
function Habilitar(props) {
    return(
        <div className="formulario" id="limpieza">
      <h3 id="nhab">Habitacion</h3>
      <div className="btn2">
        <button className="control" onClick={props.libre}>
          Habilitar
        </button>
        <button className="btn-cerrar" onClick={cerrar}>
          x
        </button>
      </div>
      <div  className="btn2b">
      <button className="irReservar" onClick={props.inputReservar}>Reservar</button>
      </div>
    </div>
    );
}
export default Habilitar;