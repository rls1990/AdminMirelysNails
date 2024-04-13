/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import "./css/Table.css";

export default function Table({
  setVista,
  updateView,
  deleteView,
  imgIndex,
  colums,
  values,
  setId,
}) {
  return (
    <>
      <table
        className="highlight centered"
        style={{ overflow: "auto", marginTop: -7 }}
      >
        <thead className="posistion-colums z-depth-1">
          <tr>
            {colums.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {values.map((row, index) => (
            <tr key={index}>
              {row.map((val, index) =>
                index !== 0 && index !== imgIndex ? (
                  <td key={index}>{val}</td>
                ) : (
                  imgIndex &&
                  index === imgIndex && (
                    <td key={index}>
                      <img
                        src={val}
                        className="z-depth-1"
                        style={{ width: 100, padding: 3, borderRadius: 5 }}
                      />
                    </td>
                  )
                )
              )}
              <td>
                <div className="actions-table">
                  <span
                    onClick={() => {
                      if (setVista) {
                        setId(row[0]);
                        setVista(updateView);
                      }
                    }}
                  >
                    <PencilSquareIcon className="green-text text-darken-4" />
                  </span>
                  <span
                    onClick={() => {
                      if (setVista) {
                        setId(row[0]);
                        setVista(deleteView);
                      }
                    }}
                  >
                    <TrashIcon className="red-text text-darken-4" />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
