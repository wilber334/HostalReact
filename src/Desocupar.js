import "./desocuparyhabilitar.css"

function cerrar() {
  document.getElementById("ocupado").style.display="none";
  document.getElementById("menu").style.display="block";
  document.getElementById("formulario").style.display="none";
  document.getElementById("editarformulario").style.display="none";
  if (window.innerWidth<=411) {
    document.getElementById("menu").style.display="none";
    document.getElementById("alertas").style.display="block";
  }
}
function inputReservar() {
  document.getElementById("ocupado").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("formulario").style.display = "block";
  document.getElementById("limpieza").style.display = "none";
  document.getElementById("op-reservar").style.backgroundColor = "blue";
  document.getElementById("op-reservar").style.color = "white";
  document.getElementById("btn-op-registrar").style.backgroundColor = "white";
  document.getElementById("btn-op-registrar").style.color = "black";
  document.getElementById("fechaReservas").style.display = "block";
  document.getElementById("clic-reservar").style.display = "block";
  document.getElementById("clic-registrar").style.display = "none";
  document.getElementById("editarformulario").style.display = "none";
}
function Desocupar(props) {
  return (
    <div className="formulario" id="ocupado">
      <h3 id="nhab2">Habitación</h3>
      <div className="btn2">
        <button style={{backgroundColor:"green", color:"white"}} onClick={inputReservar}>Reservar</button>
        <button className="control" onClick={props.vacio}>
          Desocupar
        </button>
        <button className="btn-cerrar" onClick={cerrar}>
          x
        </button>
      </div>
    </div>
  );
}
export default Desocupar;
