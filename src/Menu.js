import "./menu.css";
import casa from "./imges/casa.svg";
import cliente from "./imges/cliente.svg";
import reporte from "./imges/reporte.svg";
import cajafuerte from "./imges/cajafuerte.svg";
import { Link } from "react-router-dom";
function Menu() {
  return (
    <div className="boxdatacard" id="menu">
      <div className="datacard">
        <Link to="/">
          <img src={casa} alt="imagen de casa" />
          <h3>Home</h3>
        </Link>
      </div>
      <div className="datacard">
        <Link to="/reservaciones">
          <img src={reporte} alt="imagen de casa" />
          <h4>Ver Reservaciones</h4>
        </Link>
      </div>
      <div className="datacard">
      <Link to="/clientes">
      <img src={cliente} alt="imagen de usuario" />
          <h4>Ver Clientes</h4>
        </Link>
      </div>
      <div className="datacard">
        <Link to="/caja">
          <img src={cajafuerte} alt="imagen de reporte" />
          <h4>Caja</h4>
        </Link>
      </div>
    </div>
  );
}
export default Menu;
