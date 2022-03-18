// import "./pedidoscard.css";
function Cajacard(props) {
    return (
            <tr className={props.clase}>
                <td>{props.fecha}</td>
                <td>{props.clase}</td>
                <td>{props.descripcion}</td>
                <td>{props.monto}</td>
                <td>{props.metodo}</td>
            </tr>
    );
}
export default Cajacard;