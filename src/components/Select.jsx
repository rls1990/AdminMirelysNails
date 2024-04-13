/* eslint-disable react/prop-types */
import {} from "react";
import "./css/Select.css";

import M from "materialize-css";
import { useEffect } from "react";

export default function Select({ id, register, lista, label }) {
  useEffect(() => {
    let elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  return (
    <>
      <div className="input-field col s12" style={{ zIndex: 1 }}>
        <select id={id + ""} {...register(id, { register: true })}>
          <option value="">Seleccione una opción</option>
          {lista.map((val, index) => (
            <option value={val.value} key={index}>
              {val.nombre}
            </option>
          ))}
        </select>
        <label>{label ? label : "Opciones"}</label>
      </div>
    </>
  );
}
