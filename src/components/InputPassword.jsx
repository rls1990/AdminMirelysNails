/* eslint-disable react/prop-types */
import { useState } from "react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";

export default function InputPassword({ id, register, readOnly, hide }) {
  const [isValid, setValid] = useState(false);
  const [countValid, setCountValid] = useState(0);

  const [message, setMessage] = useState("");

  const checkText = ({ target }) => {
    if (target.value.length === 0) {
      setMessage("Este campo es requerido.");
    }
    if (target.value.length > 0 && target.value.length <= 5) {
      setMessage("La contraseña debe tener mínimo 6 caracteres.");
    }

    if (target.value.length <= 5) {
      setValid(false);
      setCountValid(-1);
    }
    if (target.value.length > 5) {
      setValid(true);
      setCountValid(1);
    }
  };

  const Icon = LockClosedIcon;
  return (
    <>
      <div
        className="input-field col s12"
        style={{ display: hide ? "none" : "block", paddingRight: 40 }}
      >
        {Icon && (
          <Icon
            className={
              countValid === 0
                ? "prefix grey-text text-darken-3"
                : countValid === 1
                ? "prefix green-text text-darken-4"
                : "prefix red-text text-darken-4"
            }
            style={{ width: 24, top: 12 }}
          />
        )}
        <input
          id={id}
          type="password"
          className={
            countValid === -1 ? "invalid" : countValid === 1 ? "valid" : ""
          }
          readOnly={readOnly ? true : false}
          required={true}
          {...register(id, { required: true, minLength: 6 })}
          onChange={(val) => checkText(val)}
        />
        <label htmlFor={id}>Contraseña</label>

        {(countValid === 1 || countValid === -1) && (
          <span
            className="helper-text"
            data-error={message}
            data-success="Ok."
          ></span>
        )}

        {isValid && (
          <CheckIcon
            width={24}
            className="green-text text-darken-4"
            style={{ position: "absolute", right: 15, top: 17 }}
          />
        )}

        {countValid === -1 && (
          <ExclamationTriangleIcon
            width={24}
            className="red-text text-darken-4"
            style={{ position: "absolute", right: 15, top: 17 }}
          />
        )}
      </div>
    </>
  );
}
