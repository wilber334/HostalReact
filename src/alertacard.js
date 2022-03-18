import dayjs from "dayjs";
import 'dayjs/locale/es'
import "./alertas.css";
dayjs.locale("es");
function Alertacard(props) {
    
    let diferenciaDias;
    let diferenciaHoras;
    let diferenciaMinutos;
    let futuro;
    
    function contadorTiempo(fecha) {
        let presente = dayjs();
        futuro = dayjs(fecha);
        diferenciaDias = futuro.diff(presente, "d");
        diferenciaHoras = futuro.diff(presente, "h") - diferenciaDias * 24;
        diferenciaMinutos =
          futuro.diff(presente, "m") - (diferenciaDias * 24 + diferenciaHoras) * 60;
    }
    return (
        
        <li className="predanger">
            {contadorTiempo(props.fecha)}
            habitación {props.habitacion}, reservado para el {futuro.format("dddd")} {futuro.format("DD/MM/YYYY")}; 
            falta:{diferenciaDias}D:{diferenciaHoras}h:{diferenciaMinutos}m 
        </li>
    );
}
export default Alertacard;