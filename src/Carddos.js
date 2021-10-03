import "./card.css";
import { useState } from "react";
import { db } from "./Firebase";
import cama from "./imges/cama2.svg";

function Carddos(props) {
  const [editar, seteditar] = useState(true);
  return editar ? (
    <div className="card" id={props.hab} onClick={props.expandir}>
      <div className="icon">
        <img src={cama} alt="imagen" />
      </div>
      <div className="details">
        <div className="room">
          {props.hab}
          <button
            onClick={() => {
              seteditar(!editar);
            }}
          >
            editar
          </button>
        </div>
        <div className="detail">{props.descripcion}</div>
        <div className="price"> S/ {props.precio}</div>
        <div className={props.situacion} id={"h" + props.hab}>
          {props.situacion}
        </div>
        <div id={"r" + props.hab}></div>
      </div>
    </div>
  ) : (
    <div className="card" id={props.hab}>
      <div className="icon">
        <img src={cama} alt="imagen" />
      </div>
      <div className="details">
        <div className="room">
          {props.hab}
          <button
            onClick={() => {
              seteditar(!editar);
              db.collection("habitaciones")
                .doc("h" + props.hab)
                .update({
                  situacion: document.getElementById("s"+props.hab).value,
                  descripcion: document.getElementById('d'+props.hab).value,
                  precio:document.getElementById('p'+props.hab).value,
                });
          }}
          >
            Guardar
          </button><button onClick={()=>{seteditar(!editar)}}>x</button>
        </div>
        <div className="detail">
          <input type="text" id={"d"+props.hab} defaultValue={props.descripcion} />
        </div>
        <div className="price">
          <input type="number" id={"p"+props.hab} defaultValue={props.precio} />
          S/
        </div>
        <div className={props.situacion} id={"h" + props.hab}>
          <select name="" id={"s"+props.hab} defaultValue={props.situacion}>
              <option value="Libre">Libre</option>
              <option value="Ocupado">Ocupado</option>
              <option value="Limpieza">Limpieza</option>
              <option value="No Disponible">No Disponible</option>
          </select>
        </div>
        <div id={"r" + props.hab}></div>
      </div>
    </div>
  );
}
export default Carddos;
