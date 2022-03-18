import { useState, useEffect } from "react";
import { db } from "./Firebase";
import dayjs from "dayjs";
function Tareas() {
  const [ocurrencia, setocurrencia] = useState([]);

  useEffect(() => {
    db.collection("ocurrencias").orderBy("fecha","desc").onSnapshot((querySnapshot) => {
      let task = [];
      querySnapshot.forEach((doc) => {
        task.push({ ...doc.data(), id: doc.id });
      });
      setocurrencia(task);
    });
  }, []);
  
  return (
    <div
      className="tareas"
      style={{
        backgroundColor: "whitesmoke",
        padding: "2%",
        margin: "0.5% 2%",
      }}
    >
      <h3>Lista de Ocurrencias</h3>
      <div>
        <label htmlFor="ocurrencia">Ocurrencia</label> <input type="text" id="ocurrencia" />
        <label htmlFor="status">status</label>
        <select name="" id="status">
          <option value="leve">Leve</option>
          <option value="normal">Normal</option>
          <option value="grave">Grave</option>
        </select>
        <button
          onClick={() => {
            db.collection("ocurrencias").add({
              fecha: new Date().getTime(),
              verfecha:dayjs().format("DD/MM/YYYY HH:mm"),
              ocurrencia: document.getElementById("ocurrencia").value,
              status: document.getElementById("status").value,
            });
          }}
        >
          agregar
        </button>
        <button onClick={()=>{window.print()}} style={{float:"right"}}>Imprimir</button>
      </div>
      <ol id="listaOcurrencias">
        {ocurrencia.map((task) => {
          return (
            <li
              key={task.id}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: "0" }}>
                  {task.verfecha+" => "+task.ocurrencia}
                  
                  </p>
                <div style={{ display: "flex" }}>
                  {task.status ==="grave" ?
                    <p
                      style={{
                        color: "red",
                        margin: "0",
                        backgroundColor: "yellowgreen",
                      }}
                    >
                      {task.status}
                    </p>
                    : <p
                      style={{
                        margin: "0",
                      }}
                    >
                      {task.status}
                    </p>}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      
    </div>
  );
}
export default Tareas;
