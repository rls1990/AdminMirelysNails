/* eslint-disable react/prop-types */
import { useState } from "react";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";

export default function InputText({
  id,
  register,
  required,
  icon,
  readOnly,
  hide,
  value,
}) {
  const [isValid, setValid] = useState(false);
  const [countValid, setCountValid] = useState(0);

  const checkText = ({ target }) => {
    if (required) {
      if (target.value.length === 0) {
        setValid(false);
        setCountValid(-1);
      }
      if (target.value.length > 0) {
        setValid(true);
        setCountValid(1);
      }
    }
  };

  let labeltext = "";
  if (id) labeltext = id.charAt(0).toLocaleUpperCase() + id.substring(1);

  const Icon = icon;

  return (
    <>
      <div
        className="input-field col s12"
        style={{ display: hide ? "none" : "block", paddingRight: 40 }}
      >
        {icon && (
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

        {hide ? (
          <textarea
            id={id}
            type="text"
            readOnly={true}
            className="materialize-textarea"
            value={value ? value : ""}
            {...register(id)}
          />
        ) : (
          <textarea
            id={id}
            type="text"
            className={
              countValid === -1
                ? "materialize-textarea invalid"
                : countValid === 1
                ? "materialize-textarea valid"
                : "materialize-textarea"
            }
            readOnly={readOnly ? true : false}
            required={required ? true : false}
            {...register(id, { required: required ? true : false })}
            onChange={(val) => checkText(val)}
            defaultValue={value ? value : ""}
          />
        )}

        <label className={value && "active"} htmlFor={id}>
          {labeltext}
        </label>

        {(countValid === 1 || countValid === -1) && (
          <span
            className="helper-text"
            data-error="Este campo es requerido."
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
