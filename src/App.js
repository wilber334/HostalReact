import "./App.css";
import { db } from "./Firebase";
import {useState } from "react";
import Titulo from "./Titulo";
import Formulario from "./Formulario";
import Desocupar from "./Desocupar";
import Habilitar from "./Habilitar";
import Menu from "./Menu";
import Alertas from "./Alertas";
import dayjs from "dayjs";
import Reservaciones from "./Reservaciones";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Principal from "./Principal";
import Clientes from "./Clientes";
import Caja from "./Caja";
import Principaldos from "./Principaldos";
import EditarFormulario from "./EditarFormulario";
import Tareas from "./Tareas";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
var numeroDeHabitacion;

function actualizarNumeroHabitacion() {
  numeroDeHabitacion = numeroDeHabitacion =
    document.getElementById("numeroDeHabitacion").textContent;
}
function App() {
  function libre() {
    actualizarNumeroHabitacion();
    document.getElementById("limpieza").style.display = "none";
    document.getElementById("menu").style.display = "block";
    db.collection("habitaciones")
      .doc("h" + numeroDeHabitacion)
      .update({
        habitacion: numeroDeHabitacion,
        situacion: "Libre",
      });
  }
  function vacio() {
    actualizarNumeroHabitacion();
    document.getElementById("ocupado").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("formulario").style.display = "none";
    document.getElementById("editarformulario").style.display = "none";
    db.collection("habitaciones")
      .doc("h" + numeroDeHabitacion)
      .update({
        habitacion: numeroDeHabitacion,
        situacion: "Limpieza",
      });
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
  }
  function nuevoCliente() {
    actualizarNumeroHabitacion();
    let nombres = document.getElementById("nombres").value;
    let documentodeId = document.getElementById("documentodeId").value;
    let numerodeId = document.getElementById("numerodeId").value;
    let numerodeTelefono = document.getElementById("numerodeTelefono").value;
    let tiempodeHospedaje = document.getElementById("tiempodeHospedaje").value;
    let precio_noche = document.getElementById("precioNoche").value;
    let importeaPagar = tiempodeHospedaje * precio_noche;
    let importePagado = document.getElementById("importePagado").value;
    let observaciones = document.getElementById("observaciones").value;
    let MetodoPago = document.getElementById("MetodoPago").value;
    db.collection("huespedes")
      .add({
        observaciones: observaciones,
        fecha: new Date().getTime(),
        verfecha: dayjs().format("DD/MM/YYYY  HH:mm"),
        nombres: nombres,
        documento_de_identificacion: documentodeId,
        numero_de_identificacion: numerodeId,
        numero_Telefono: numerodeTelefono,
        numero_Habitacion: numeroDeHabitacion,
        tiempo_Hospedaje: Number(tiempodeHospedaje),
        precio_Noche: Number(precio_noche),
        importe_Pagar: Number(importeaPagar),
        importe_Pagado: Number(importePagado),
        Metodo_Pago: MetodoPago,
      })
      .then((docRef) => {
        document.getElementById("formulario").style.display = "none";
        db.collection("habitaciones")
          .doc("h" + numeroDeHabitacion)
          .update({
            habitacion: numeroDeHabitacion,
            situacion: "Ocupado",
            usuario: docRef.id,
            fecha: dayjs().format("DD/MM/YYYY"),
            tiempodeHospedaje: tiempodeHospedaje,
            deuda: importeaPagar - importePagado,
          });
        db.collection("caja").add({
          fecha: new Date().getTime(),
          verfecha: dayjs().format("DD/MM/YYYY  HH:mm"),
          tipo: "ingreso",
          descripcion: "Habitación " + numeroDeHabitacion,
          monto: Number(importePagado),
          metodoPago: MetodoPago
        });
      });
    document.getElementById("formulario").style.display = "none";
    document.getElementById("formulario").reset();
    document.getElementById("menu").style.display = "block";
    if (window.innerWidth <= 411) {
      document.getElementById("menu").style.display = "none";
    }
  }
  function reservarHabitacion() {
    actualizarNumeroHabitacion();
    let nombres = document.getElementById("nombres").value;
    let documentodeId = document.getElementById("documentodeId").value;
    let numerodeId = document.getElementById("numerodeId").value;
    let numerodeTelefono = document.getElementById("numerodeTelefono").value;
    let tiempodeHospedaje = document.getElementById("tiempodeHospedaje").value;
    let precio_noche = document.getElementById("precioNoche").value;
    let importeaPagar = tiempodeHospedaje * precio_noche;
    let importePagado = document.getElementById("importePagado").value;
    let fechaReservada = document.getElementById("nuevafecha").value;
    let observaciones = document.getElementById("observaciones").value;
    let MetodoPago = document.getElementById("MetodoPago").value;
    db.collection("reservas").add({
      observaciones: observaciones,
      fecha: dayjs().format("DD/MM/YYYY  HH:mm"),
      nombres: nombres,
      verfecha_reservada: fechaReservada,
      fecha_reservada: new Date(
        dayjs(fechaReservada).format("YYYY,MM,DD")
      ).getTime(),
      documento_de_identificacion: documentodeId,
      numero_de_identificacion: numerodeId,
      numero_Telefono: numerodeTelefono,
      numero_Habitacion: numeroDeHabitacion,
      tiempo_Hospedaje: Number(tiempodeHospedaje),
      precio_Noche: Number(precio_noche),
      importe_Pagar: Number(importeaPagar),
      importe_Pagado: Number(importePagado),
      Metodo_Pago: MetodoPago,
    });
    document.getElementById("formulario").style.display = "none";
    document.getElementById("formulario").reset();
    document.getElementById("menu").style.display = "block";
    if (window.innerWidth <= 411) {
      document.getElementById("menu").style.display = "none";
    }
  }
  const [usuario, setusuario] = useState(null);
  let auth = getAuth();
  //  user = auth.currentUser;
  setTimeout(() => {
    // auth = getAuth();
    let user = auth.currentUser;
    setusuario(user);
  }, 2000);
  function signIn() {
    signInWithEmailAndPassword(auth, document.getElementById('correo').value, document.getElementById('password').value)
      .then((userCredential) => {
        console.log("ingreso exitoso=>");
        setusuario(userCredential.user);
      })
      .catch((error) => {
        console.log("no se pudo ingresar");
      });
  }

  if (usuario) {
    return (
      <Router>
        <div>
          <Titulo />
          <div className="App">
            <div id="seccionMenu">
              <div className="aside">
                <div>
                  <Menu />
                  <Formulario
                    nuevoCliente={nuevoCliente}
                    reservarHabitacion={reservarHabitacion}
                  />
                  <Desocupar vacio={vacio} inputReservar={inputReservar} />
                  <EditarFormulario />
                  <Habilitar libre={libre} inputReservar={inputReservar} />
                </div>
                <Alertas />
              </div>
            </div>
            <Switch>
              <Route exact path="/">
                <Principal />
              </Route>
              <Route exact path="/edicion">
                <Principaldos />
              </Route>
              <Route exact path="/reservaciones">
                <Reservaciones />
              </Route>
              <Route exact path="/clientes">
                <Clientes />
              </Route>
              <Route exact path="/caja">
                <Caja />
              </Route>
              <Route exact path="/tareas">
                <Tareas />
              </Route>
            </Switch>
            <hr />
          </div>
        </div>
      </Router>
    );
  } else {
    return (
      <div style={{ backgroundColor: 'white', width: "100%", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: "250px", backgroundColor: 'blue', padding: "3%" }}>
          <h1 style={{ textAlign: "center" }}>Hostal Santa Catalina</h1>
          <div>
            <label htmlFor="correo" style={{ color: "white", fontWeight: "bold" }}>Correo:</label><br />
            <input type="text" id='correo' style={{ width: "95%" }} /><br />
            <label htmlFor="password" style={{ color: "white", fontWeight: "bold" }}>Contraseña:</label><br />
            <input type="password" id='password' style={{ width: "95%" }} />
          </div>
          <span style={{ display: 'flex', justifyContent: 'right', padding: "2%" }}>
            <button onClick={signIn} style={{ color: 'white', backgroundColor: 'green' }}>Sign In</button>
          </span>
        </div>
      </div>
    )
  }
}

export default App;
