import "./formulario.css";

function onSubmit(event) {
  event.preventDefault();
}
function opReservar() {
  document.getElementById("op-reservar").style.backgroundColor = "blue";
  document.getElementById("op-reservar").style.color = "white";
  document.getElementById("btn-op-registrar").style.backgroundColor = "white";
  document.getElementById("btn-op-registrar").style.color = "black";
  document.getElementById("fechaReservas").style.display = "block";
  document.getElementById("clic-reservar").style.display = "block";
  document.getElementById("clic-registrar").style.display = "none";
}
function opRegistrar() {
  document.getElementById("op-reservar").style.backgroundColor = "white";
  document.getElementById("op-reservar").style.color = "black";
  document.getElementById("btn-op-registrar").style.backgroundColor = "blue";
  document.getElementById("btn-op-registrar").style.color = "white";
  document.getElementById("fechaReservas").style.display = "none";
  document.getElementById("clic-reservar").style.display = "none";
  document.getElementById("clic-registrar").style.display = "block";
}
function precioTotal() {
  let tiempodeHospedaje = document.getElementById("tiempodeHospedaje").value;
  let precioxNoche = document.getElementById("precioNoche").value;
  let precioTotal = tiempodeHospedaje * precioxNoche;
  document.getElementById("importeTotal").value = precioTotal;
  return precioTotal;
}
function cerrar() {
  document.getElementById("formulario").style.display="none";
  document.getElementById("menu").style.display="block";
  document.getElementById("ocupado").style.display = "none";
  document.getElementById("limpieza").style.display = "none";
  if (window.innerWidth<=411) {
    document.getElementById("menu").style.display="none";
    document.getElementById("alertas").style.display="block";
  }
}
function Formulario(props) {
  
  return (
    <form
      className="formulario"
      id="formulario"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <h5>HABITACIÓN - <b id="numeroDeHabitacion">101</b></h5>
      <div className="form_container">
        <div className="btn">
          <div>
            <button
              className="btn-opcion op-registrar"
              id="btn-op-registrar"
              onClick={opRegistrar}
            >
              Registrar
            </button>
            <button
              className="btn-opcion"
              id="op-reservar"
              onClick={opReservar}
            >
              Reservar
            </button>
          </div>
          <button className="btn-cerrar" onClick={cerrar}>
            x
          </button>
        </div>
        <div className="form_group">
          <input
            type="text" 
            id="nombres"
            className="form_input"
            placeholder=" "
          />
          <label htmlFor="nombres" className="form_label">
            Nombres:
          </label>
          <span className="form_line"></span>
        </div>
        <div className="doble">
          <div className="form_group">
            <select id="documentodeId" className="form_input small">
              <option value="Dni">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Carnet de extranjeria">
                Carnet de extranjeria
              </option>
            </select>
            <label htmlFor="documentodeId"></label>
            <span className="form_line"></span>
          </div>
          <div className="form_group">
            <input
              type="text"
              id="numerodeId"
              className="form_input small"
              placeholder=" "
            />
            <label htmlFor="numerodeId" className="form_label">
              Nro. de documento:
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="doble">
          <div className="form_group">
            <input
              type="number"
              id="numerodeTelefono"
              className="form_input"
              placeholder=" "
            />
            <label htmlFor="numerodeTelefono" className="form_label">
              Telefono:
            </label>
            <span className="form_line"></span>
          </div>
          <div
            className="form_group"
            id="fechaReservas"
            style={{ display: "none" }}
          >
            <input type="date" id="nuevafecha" className="form_input" />
            <label htmlFor="nuevafecha" className="form_label">
              Fecha a reservar:
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="doble">
          <div className="form_group">
            <input
              type="number"
              id="tiempodeHospedaje"
              className="form_input"
              placeholder=" "
              onKeyUp={precioTotal}
            />
            <label htmlFor="tiempodeHospedaje" className="form_label">
              Dias de hospedaje:
            </label>
            <span className="form_line"></span>
          </div>
          <div className="form_group">
            <input
              type="number"
              id="precioNoche"
              className="form_input"
              placeholder=" "
              onKeyUp={precioTotal}
            />
            <label htmlFor="precioNoche" className="form_label">
              Precio por dia: S/
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="doble">
          <div className="form_group">
            <input
              type="number"
              id="importeTotal"
              className="form_input"
              placeholder=" "
              disabled={true}
            />
            <label htmlFor="importeTotal" className="form_label">
              Importe a pagar: S/
            </label>
            <span className="form_line"></span>
          </div>
          <div className="form_group">
            <input
              type="number"
              id="importePagado"
              className="form_input"
              placeholder=" "
            />
            <label htmlFor="importePagado" className="form_label">
              Importe pagado: S/
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="form_group">
          <textarea
            id="observaciones"
            rows="5"
            placeholder=" "
            className="form_input"
          ></textarea>
          <label htmlFor="observaciones" className="form_label">
            Observaciones:
          </label>
          <span className="form_line"></span>
        </div>
        <div className="registrar">
          <div>
            <button
              className="btn-registrar"
              onClick={props.nuevoCliente}
              id="clic-registrar"
            >
              Registrar
            </button>
            <button
              className="btn-registrar"
              onClick={props.reservarHabitacion}
              id="clic-reservar"
              style={{ backgroundColor: "green", display: "none" }}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Formulario;
