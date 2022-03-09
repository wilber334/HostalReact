import { useState, useEffect } from "react";
import { db } from "./Firebase";
function Tareas() {
  const [tarea, settarea] = useState([]);

  useEffect(() => {
    db.collection("tareas").onSnapshot((querySnapshot) => {
      let task = [];
      querySnapshot.forEach((doc) => {
        task.push({ ...doc.data(), id: doc.id });
      });
      settarea(task);
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
      <h3>Lista de Tareas</h3>
      <ol>
        {tarea.map((task) => {
          return (
            <li
              key={task.id}
            >
                <div style={{display:"flex",justifyContent: "space-between"}}>
                <p style={{ margin: "0" }}>{task.tarea}</p>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    color: "red",
                    margin: "0",
                    backgroundColor: "yellowgreen",
                  }}
                >
                  {task.prioridad === "urgente" ? "Urgente" : null}
                </p>
                <button style={{ backgroundColor: "green" }}>&#10003;</button>
              </div>
                </div>
              
            </li>
          );
        })}
      </ol>
      <div>
        <label htmlFor="tarea">Nueva Tarea</label> <input type="text" id="tarea" />
        <label htmlFor="prioridad">Prioridad</label>
        <select name="" id="prioridad">
          <option value="normal">Normal</option>
          <option value="urgente">Urgente</option>
        </select>
        <button
          onClick={() => {
            db.collection("tareas").add({
              fecha: new Date().getTime(),
              // verfecha:dayjs().format("DD/MM/YYYY"),
              tarea: document.getElementById("tarea").value,
              prioridad: document.getElementById("prioridad").value,
              estado: 0,
            });
          }}
        >
          agregar
        </button>
      </div>
    </div>
  );
}
export default Tareas;
