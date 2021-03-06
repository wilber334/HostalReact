import { useEffect, useState } from "react";
import { db } from "./Firebase";
let user = "";
function onSubmit(event) {
  event.preventDefault();
}
function EditarFormulario() {
  const [usuario, setusuario] = useState([]);
  //reparar esta parte, parece que no reconoce la ruta 
  useEffect(() => {     
    db.collection("editar")
      .doc("editarUsuario")
      .onSnapshot((doc) => {
        if (doc.exists) {
          user = doc.data().usuario; //aqui obtenemos el id para buscar en huespedes        
          db.collection("huespedes")
            .doc(user)
            .get()
            .then((doc) => {
              setusuario(doc.data());
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });

  }, [usuario]);

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
      let MetodoPago = document.getElementById("editMetodoPago").value;
      db.collection("huespedes").doc(user)
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
          Metodo_Pago: MetodoPago
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
    } else {
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
      {usuario?
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
          <select id="editMetodoPago" className="form_input small">
            <option value={usuario.Metodo_Pago} >{usuario.Metodo_Pago}</option>
            <option value="Efectivo" >Efectivo</option>
            <option value="Yape">Yape</option>
            <option value="Plin">Plin</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
            <option value="Otro">Otro</option>
          </select>
          <label htmlFor="editMetodoPago"></label>
          <span className="form_line"></span>
        </div>
        <div className="form_group">
          <textarea
            id="editobservaciones"
            rows="5"
            placeholder=""
            className="form_input"
            defaultValue={usuario.observaciones}
          ></textarea>
          <label htmlFor="editobservaciones" className="form_label">
            Observaciones:
          </label>
          <span className="form_line"></span>
        </div>
        <div className="registrar">
          <div>
            <button
              className="btn-registrar"
              onClick={actualizarHuesped}
              style={{ backgroundColor: "green" }}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
      :null}
    </form>
  );
}
export default EditarFormulario;
