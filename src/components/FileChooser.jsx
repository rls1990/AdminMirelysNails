/* eslint-disable react/prop-types */
import { useState } from "react";
import DocumentArrowUpIcon from "@heroicons/react/24/solid/DocumentArrowUpIcon";
export default function FileChooser({
  id,
  className,
  style,
  register,
  nombre,
  url,
}) {
  const [imgSrc, setImgSrc] = useState("");

  const onChangeInputFile = ({ target }) => {
    if (target) {
      let file = target.files[0];
      if (file) {
        let url = URL.createObjectURL(file);
        setImgSrc(url);
      }
    }
  };

  return (
    <>
      <div
        className="z-depth-1 col s12"
        style={{ width: 370, height: 478, padding: 30, zIndex: 0 }}
      >
        <div>
          <h5 style={{ color: "gray", marginTop: 0, paddingTop: 0 }}>
            {nombre ? nombre : id}
          </h5>
          <div className="divider"></div>
        </div>
        <div
          style={{
            width: "100%",
            height: 300,
            marginTop: 10,
            overflow: "hidden",
          }}
        >
          {url && imgSrc.length === 0 ? (
            <img
              style={{ objectFit: "contain", height: 278 }}
              src={url.length ? url : "img/file-chooser-default1.JPG"}
            />
          ) : (
            <img
              style={{ objectFit: "contain", height: 278 }}
              src={imgSrc.length ? imgSrc : "img/file-chooser-default1.JPG"}
            />
          )}
        </div>
        <div
          className={
            className
              ? "file-field input-field " + className
              : "file-field input-field col s12"
          }
          style={style}
        >
          <div className="btn" style={{ marginTop: 15 }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              {<DocumentArrowUpIcon style={{ width: 22, marginRight: 3 }} />}
              File
            </span>
            <input
              id={id}
              type="file"
              name="file"
              {...register("file")}
              onChange={onChangeInputFile}
            />
          </div>
          <div className="file-path-wrapper">
            <div className="input-field">
              <input
                id={id + "-text"}
                required
                className="file-path validate"
                type="text"
                defaultValue={url ? url : ""}
              />
              <label className={url && "active"} htmlFor={id}>
                Nombre de la imagen.
              </label>
              <span
                className="helper-text"
                data-error="Requerido"
                data-success="OK"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
