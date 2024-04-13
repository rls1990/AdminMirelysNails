/* eslint-disable react/prop-types */
import { useState } from "react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import AtSymbolIcon from "@heroicons/react/24/outline/AtSymbolIcon";
import { validarEmail } from "../libs/Validator.js";

export default function InputEmail1({
  id,
  register,
  required,
  readOnly,
  hide,
  value,
}) {
  const [isValid, setValid] = useState(false);
  const [countValid, setCountValid] = useState(0);
  const [message, setMessage] = useState("");

  const checkText = ({ target }) => {
    if (required) {
      if (target.value.length === 0) {
        setMessage("Este campo es requerido.");
      }

      if (validarEmail(target.value)) {
        setValid(true);
        setCountValid(1);
      } else {
        setValid(false);
        setCountValid(-1);

        if (target.value.length > 0) {
          setMessage("El Email es inválido.");
        }
      }
    }
  };

  let labeltext = "";
  if (id) labeltext = id.charAt(0).toLocaleUpperCase() + id.substring(1);

  const Icon = AtSymbolIcon;

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
          type="email"
          className={
            countValid === -1 ? "invalid" : countValid === 1 ? "valid" : ""
          }
          readOnly={readOnly ? true : false}
          required={required ? true : false}
          {...register(id, { required: required ? true : false })}
          onChange={(val) => checkText(val)}
          defaultValue={value ? value : ""}
        />
        <label htmlFor={id} className={value && "active"}>
          {labeltext}
        </label>

        {(countValid === 1 || countValid === -1) && (
          <span
            className="helper-text"
            data-error={message}
            data-success="Ok."
          ></span>
        )}

        {isValid && required && (
          <CheckIcon
            width={24}
            className="green-text text-darken-4"
            style={{ position: "absolute", right: 15, top: 17 }}
          />
        )}

        {countValid === -1 && required && (
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
