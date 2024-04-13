/* eslint-disable react/prop-types */
import "./css/Breadcrumbs.css";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Breadcrumbs({
  list = ["item1"],
  vistas = [""],
  setVista,
}) {
  return (
    <>
      <div className="breadcrumbs-fix z-depth-1">
        <div style={{ cursor: "default" }}>Admin</div>

        <ChevronRightIcon style={{ width: 17 }} />
        {list.map((val, index) => (
          <div key={index}>
            {index > 0 && index < list.length && (
              <ChevronRightIcon style={{ width: 17 }} key={index} />
            )}
            {index + 1 == list.length ? (
              <span
                style={{ color: "rgb(30, 30, 31)" }}
                onClick={() => {
                  if (vistas) setVista(vistas[index]);
                }}
              >
                {val}
              </span>
            ) : (
              <span
                onClick={() => {
                  if (vistas) setVista(vistas[index]);
                }}
              >
                {val}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
