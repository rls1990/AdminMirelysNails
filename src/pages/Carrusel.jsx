/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { create, deleteS, getById, list, update } from "../api/carrusel";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import TextArea from "../components/TextArea";
import { QueueListIcon, UserIcon } from "@heroicons/react/24/solid";
import FileChooser from "../components/FileChooser";
import { baseURLAPI } from "../config";

export default function Carrusel() {
  const [vista, setVista] = useState("lista");
  return (
    <>
      {vista === "lista" && <Lista setVista={setVista} />}

      {vista === "adicionar" && <Adicionar setVista={setVista} />}

      {vista === "actualizar" && <Actualizar setVista={setVista} />}

      {vista === "eliminar" && <Eliminar setVista={setVista} />}
    </>
  );
}

function Lista({ setVista }) {
  const colums = ["Título", "Descripción", "Imagen"];
  const [valores, setValores] = useState([]);
  const { setIdCarrusel } = useGlobal();

  useEffect(() => {
    const lista = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.titulo,
          item.descripcion,
          `${baseURLAPI}/carruselhome/imgcarruselhome/${
            item._id
          }/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    lista();
  }, []);

  const Refrescar = () => {
    const lista = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.titulo,
          item.descripcion,
          `${baseURLAPI}/carruselhome/imgcarruselhome/${
            item._id
          }/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    lista();
  };

  return (
    <>
      <Breadcrumbs list={["Carrusel"]} vistas={["lista"]} setVista={setVista} />
      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Carrusel</span>
          <button
            onClick={() => Refrescar()}
            className="btn btn-add-action"
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 7,
              marginLeft: 10,
            }}
          >
            <span>Refrescar</span>
          </button>
          <button
            onClick={() => setVista("adicionar")}
            className="btn btn-add-action"
            style={{ display: "flex", alignItems: "center", borderRadius: 7 }}
          >
            <span>Adicionar</span>
          </button>
        </div>

        <div className="div-container-table  z-depth-1">
          <Table
            setVista={setVista}
            setId={setIdCarrusel}
            updateView="actualizar"
            deleteView="eliminar"
            colums={colums}
            values={valores}
            imgIndex={3}
          />
        </div>
      </div>
    </>
  );
}

function Adicionar({ setVista }) {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState([]);
  const [mensage, setMensage] = useState("");
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    if (mensage.length > 0) {
      const timer1 = setTimeout(() => {
        setMensage("");
      }, 10000);

      return () => clearTimeout(timer1);
    }
  }, [mensage]);

  const onSubmit = handleSubmit(async (values) => {
    const data = new FormData();
    data.append("titulo", values.titulo);
    data.append("descripcion", values.descripcion);
    data.append("file", values.file[0]);
    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Imagen registrada con exito.");
        reset();
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <Breadcrumbs
        list={["Carrusel", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Imagen</span>
        </div>

        {errors.length > 0 && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: 300, background: "red", color: "white" }}>
              {errors.map((val, index) => (
                <p key={index}>{val}</p>
              ))}
            </div>
          </div>
        )}

        {mensage.length > 0 && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: 300, background: "green", color: "white" }}>
              <p>{mensage}</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="content-formS">
            <div className="form-addS">
              <div className="row container">
                <InputText
                  id="titulo"
                  key={"titulo" + key}
                  register={register}
                  required={true}
                  icon={UserIcon}
                />
                <TextArea
                  id="descripcion"
                  key={"descripcion" + key}
                  register={register}
                  required={true}
                  icon={QueueListIcon}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <FileChooser
                  id="file"
                  key={"file" + key}
                  nombre="file"
                  register={register}
                />
              </div>

              <button
                className="btn waves-effect waves-light btn-large"
                style={{
                  width: 400,
                  marginBottom: 20,
                  marginTop: 40,
                }}
              >
                Adicionar Imagen
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idCarrusel, setIdCarrusel } = useGlobal();
  const [item, setItem] = useState({});

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const actualizar = async () => {
      const res = (await getById(idCarrusel)).data;
      if (res) {
        setItem(res);
      }
    };
    actualizar();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  const onSubmit = handleSubmit(async (values) => {
    const data = new FormData();
    data.append("titulo", values.titulo);
    data.append("descripcion", values.descripcion);

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await update(item._id, data);
      if (res) {
        setIdCarrusel("");
        setVista("lista");
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <Breadcrumbs
        list={["Carrusel", "Actualizar"]}
        vistas={["lista", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Imagen Id: {idCarrusel}
          </span>
        </div>

        {errors.length > 0 && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: 300, background: "red", color: "white" }}>
              {errors.map((val, index) => (
                <p key={index}>{val}</p>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="content-formS">
            <div className="form-addS">
              <div className="row container">
                <InputText
                  id="titulo"
                  register={register}
                  value={item.titulo}
                  required={true}
                  icon={UserIcon}
                />
                <TextArea
                  id="descripcion"
                  register={register}
                  value={item.descripcion}
                  required={true}
                  icon={QueueListIcon}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <FileChooser
                  id="file"
                  nombre="file"
                  register={register}
                  url={
                    item && item._id
                      ? `${baseURLAPI}/carruselhome/imgcarruselhome/${idCarrusel}/${Date.now()}/medium`
                      : "img/file-chooser-default.JPG"
                  }
                />
              </div>

              <button
                className="btn waves-effect waves-light btn-large"
                style={{
                  width: 400,
                  marginBottom: 20,
                  marginTop: 40,
                }}
              >
                Actualizar Imagen
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idCarrusel, setIdCarrusel } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const eliminar = async () => {
      const res = (await getById(idCarrusel)).data;
      if (res) {
        setItem(res);
      }
    };
    eliminar();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idCarrusel);

      if (res) {
        setIdCarrusel("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Carrusel", "Eliminar"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Imagen Id: {idCarrusel}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "stretch",
            marginTop: 10,
          }}
        >
          <span style={{ fontSize: 15 }}>
            <b>Título:</b> {item.titulo}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Descripción:</b> {item.descripcion}
          </span>
          <span style={{ marginTop: 30 }}>
            {item && item._id && (
              <img
                className="z-depth-1"
                width="300"
                height="278"
                style={{ objectFit: "cover" }}
                src={`${baseURLAPI}/carruselhome/imgcarruselhome/${idCarrusel}/${Date.now()}/medium`}
              />
            )}
          </span>

          <span>
            <button
              onClick={onSubmit}
              className="btn waves-effect waves-light btn-large"
              style={{
                width: 400,
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              Eliminar Imagen
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
