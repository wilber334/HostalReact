
function Reservascard(props) {
    return (
            <tr>
                <td>{props.verfecha_reservada}</td>
                <td>{props.tiempo_Hospedaje} dias</td>
                <td>{props.numero_Habitacion}</td>
                <td>{props.nombres}</td>
                <td>{props.documento_de_identificacion}</td>
                <td>{props.numero_de_identificacion}</td>
                <td>{props.numero_Telefono}</td>
                <td>{props.importe_Pagar}</td>
                <td>{props.importe_Pagado}</td>
                <td>{props.observaciones}</td>
                <td>{props.fecha}</td>
                <td><button>{props.id}</button></td>
            </tr>
    );
}
export default Reservascard;