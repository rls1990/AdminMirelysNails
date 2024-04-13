/* eslint-disable react/prop-types */
import { useState } from "react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";

export default function InputPasswordConfirm1({ id, register, valueD }) {
  const [value, setValue] = useState("");
  const [valueC, setValueC] = useState("");

  const [isValid, setValid] = useState(false);
  const [isValidC, setValidC] = useState(false);

  const [countValid, setCountValid] = useState(0);
  const [countValidC, setCountValidC] = useState(0);

  const [message, setMessage] = useState("");
  const [messageC, setMessageC] = useState("");

  const checkText = ({ target }) => {
    setValue(target.value);

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

      if (valueC.length === 0) {
        setMessageC("Este campo es requerido.");
        setValidC(false);
        setCountValidC(-1);
      } else if (valueC !== target.value && valueC.length > 5) {
        setMessageC("Las contraseñas no coinciden.");
        setValidC(false);
        setCountValidC(-1);
      } else if (valueC === target.value && valueC.length > 5) {
        setValidC(true);
        setCountValidC(1);
      }
    }
  };

  const checkTextC = ({ target }) => {
    setValueC(target.value);

    if (target.value.length === 0) {
      setMessageC("Este campo es requerido.");
    }
    if (target.value.length > 0 && target.value.length <= 5) {
      setMessageC("La contraseña debe tener mínimo 6 caracteres.");
    }
    if (target.value.length > 5 && target.value !== value) {
      setMessageC("Las contraseñas no coinciden.");
    }

    if (target.value.length <= 5 || target.value !== value) {
      setValidC(false);
      setCountValidC(-1);
    }

    if (target.value.length > 5 && value === target.value) {
      setValidC(true);
      setCountValidC(1);
    }
  };

  const idConfirm = id + "C";

  const Icon = LockClosedIcon;

  return (
    <>
      <div className="input-field col s12" style={{ paddingRight: 40 }}>
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
          required={true}
          {...register(id, { required: true, minLength: 6 })}
          onChange={(val) => checkText(val)}
          defaultValue={valueD ? valueD : ""}
        />
        <label htmlFor={id} className={valueD && "active"}>
          Contraseña
        </label>

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

      <div className="input-field col s12" style={{ paddingRight: 40 }}>
        {Icon && (
          <Icon
            className={
              countValidC === 0
                ? "prefix grey-text text-darken-3"
                : countValidC === 1
                ? "prefix green-text text-darken-4"
                : "prefix red-text text-darken-4"
            }
            style={{ width: 24, top: 12 }}
          />
        )}
        <input
          id={idConfirm}
          type="password"
          className={
            countValidC === -1 ? "invalid" : countValidC === 1 ? "valid" : ""
          }
          required={true}
          {...register(idConfirm, { required: true, minLength: 6 })}
          onChange={(val) => checkTextC(val)}
          defaultValue={valueD ? valueD : ""}
        />
        <label htmlFor={idConfirm} className={valueD && "active"}>
          Repita la Contraseña
        </label>

        {(countValidC === 1 || countValidC === -1) && (
          <span
            className="helper-text"
            data-error={messageC}
            data-success="Ok."
          ></span>
        )}

        {isValidC && (
          <CheckIcon
            width={24}
            className="green-text text-darken-4"
            style={{ position: "absolute", right: 15, top: 17 }}
          />
        )}

        {countValidC === -1 && (
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
