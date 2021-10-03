import { useEffect, useState } from "react";
import { db } from "./Firebase";
let id = "";
function onSubmit(event) {
  event.preventDefault();
}
function EditarFormulario() {
  const [usuario, setusuario] = useState([]);
  useEffect(() => {
    db.collection("editar")
      .doc("editarUsuario")
      .onSnapshot((doc) => {
        id = doc.data().usuario;
        db.collection("huespedes")
          .doc(id)
          .get()
          .then((doc) => {
            setusuario(doc.data());
          });
      });
  }, []);

  function actualizarHuesped() {
    if (window.confirm("Seguro que desea Actualizar?")) {
      let nombres = document.getElementById("editnombres").value;
    let documentodeId = document.getElementById("editdocumentodeId").value;
    let numerodeId = document.getElementById("editnumerodeId").value;
    let numerodeTelefono = document.getElementById("editnumerodeTelefono").value;
    let tiempodeHospedaje = document.getElementById("edittiempodeHospedaje").value;
    let precio_noche = document.getElementById("editprecioNoche").value;
    let importeaPagar = tiempodeHospedaje * precio_noche;
    let importePagado = document.getElementById("editimportePagado").value;
    let observaciones = document.getElementById("editobservaciones").value;
    db.collection("huespedes").doc(id)
      .update({
        observaciones: observaciones,
        modificado: new Date(),
        nombres: nombres,
        documento_de_identificacion: documentodeId,
        numero_de_identificacion: numerodeId,
        numero_Telefono: numerodeTelefono,
        tiempo_Hospedaje: tiempodeHospedaje,
        precio_Noche: precio_noche,
        importe_Pagar: importeaPagar,
        importe_Pagado: importePagado,
      })
      .then((docRef) => {
        db.collection("habitaciones")
          .doc("h" + usuario.numero_Habitacion)
          .update({
            tiempodeHospedaje: tiempodeHospedaje,
            deuda: importeaPagar - importePagado,
          });
      });
    document.getElementById("editarformulario").reset();
    // document.getElementById("formulario").style.display = "none";
    // document.getElementById("menu").style.display = "none";
    if (window.innerWidth <= 411) {
      document.getElementById("menu").style.display = "none";
    }
    }else{
      document.getElementById("editarformulario").reset();
    }
  }

  return (
    <form
      className="formulario"
      id="editarformulario"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="form_container">
        <div className="form_group">
          <input
            type="text" 
            id="editnombres"
            className="form_input"
            placeholder=" " defaultValue={usuario.nombres}
          />
          <label htmlFor="nombres" className="form_label">
            Nombres:
          </label>
          <span className="form_line"></span>
        </div>
        <div className="doble">
          <div className="form_group">
            <select id="editdocumentodeId" className="form_input small" defaultValue={usuario.documento_de_identificacion}>
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
              id="editnumerodeId"
              className="form_input small"
              placeholder=" "
              defaultValue={usuario.numero_de_identificacion}
            />
            <label htmlFor="numerodeId" className="form_label">
              Nro. Doc:
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="doble">
          <div className="form_group">
            <input
              type="number"
              id="editnumerodeTelefono"
              className="form_input"
              placeholder=" "
              defaultValue={usuario.numero_Telefono}
            />
            <label htmlFor="numerodeTelefono" className="form_label">
              Telefono:
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="doble">
          <div className="form_group">
            <input
              type="number"
              id="edittiempodeHospedaje"
              className="form_input"
              placeholder=" "
              defaultValue={usuario.tiempo_Hospedaje}
            />
            <label htmlFor="tiempodeHospedaje" className="form_label">
              Dias de hospedaje:
            </label>
            <span className="form_line"></span>
          </div>
          <div className="form_group">
            <input
              type="number"
              id="editprecioNoche"
              className="form_input"
              placeholder=" "
              defaultValue={usuario.precio_Noche}
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
              id="editimporteTotal"
              className="form_input"
              placeholder=" "
              defaultValue={usuario.importe_Pagar}
            />
            <label htmlFor="importeTotal" className="form_label">
              Importe a pagar: S/
            </label>
            <span className="form_line"></span>
          </div>
          <div className="form_group">
            <input
              type="number"
              id="editimportePagado"
              className="form_input"
              placeholder=" "
              defaultValue={usuario.importe_Pagado}
            />
            <label htmlFor="importePagado" className="form_label">
              Importe pagado: S/
            </label>
            <span className="form_line"></span>
          </div>
        </div>
        <div className="form_group">
          <textarea
            id="editobservaciones"
            rows="5"
            placeholder=" "
            className="form_input"
            defaultValue={usuario.observaciones}
          ></textarea>
          <label htmlFor="observaciones" className="form_label">
            Observaciones:
          </label>
          <span className="form_line"></span>
        </div>
        <div className="registrar">
          <div>
          {/* <button
              className="btn-registrar"
              id="clic-reservar"
              style={{ backgroundColor: "blue"}}
            >
              Editar
            </button> */}
            <button
              className="btn-registrar"
              onClick={actualizarHuesped}
              style={{ backgroundColor: "green"}}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default EditarFormulario;
