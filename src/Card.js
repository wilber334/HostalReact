import "./card.css";
import cama from "./imges/cama2.svg";

function Card(props) {
    
    return(
        <div className="card" id={props.hab} onClick={props.expandir}>
            <div className="icon"><img src={cama} alt="imagen"/></div>
            <div className="details">
                <div className="room">{props.hab}</div>
                <div className="detail">{props.detalle}</div>
                <div className="price">{props.precio}</div>
                <div className="Libre" id={"h"+props.hab}>ocupado</div>
                <div id={"r"+props.hab}></div>
            </div>
        </div>
    );
}
export default Card;