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
function Desocupar(props) {
  return (
    <div className="formulario" id="ocupado">
      <h3 id="nhab2">Habitación</h3>
      <div className="btn2">
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
