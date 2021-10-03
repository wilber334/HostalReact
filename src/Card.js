import "./card.css";
import cama from "./imges/cama2.svg";

function Card(props) {
  return (
    <div className="card" id={props.hab} onClick={props.expandir}>
      <div className="icon">
        <img src={cama} alt="imagen" />
      </div>
      <div className="details">
        <div className="room">
          {props.hab}
        </div>
        <div className="detail">{props.descripcion}</div>
        <div className="price"> S/ {props.precio}</div>
        <div className={props.situacion} id={"h" + props.hab}>
          {props.situacion}
        </div>
        <div id={"r" + props.hab}></div>
        <div id={"user"+props.hab} style={{display:"none"}}>{props.user}</div>
      </div>
    </div>
  );
}
export default Card;
