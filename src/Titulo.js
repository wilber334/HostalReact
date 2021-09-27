import "./titulo.css";
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
function Titulo() {
  return (
    <header>
      <h1>Hostal Santa Catalina</h1>
      <h4>{fecha()}</h4>
      <button className="btn-opcion" onClick={sololibres}>
        ver solo libres
      </button>
      <button className="btn-opcion" onClick={vertodos}>
        ver todos
      </button>
    </header>
  );
}
export default Titulo;
