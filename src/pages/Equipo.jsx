/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { create, deleteS, getById, list, update } from "../api/equipo";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import TextArea from "../components/TextArea";
import { QueueListIcon, UserIcon } from "@heroicons/react/24/solid";
import FileChooser from "../components/FileChooser";
import { baseURLAPI } from "../config";

export default function Equipo() {
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
  const colums = ["Nombre", "Roll", "Cometario", "Foto"];
  const [valores, setValores] = useState([]);
  const { setIdEquipo } = useGlobal();

  useEffect(() => {
    const lista = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.nombre,
          item.roll,
          item.cometario,
          `${baseURLAPI}/equipo/imgmiembro/${item._id}/${Date.now()}/medium`,
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
          item.nombre,
          item.roll,
          item.cometario,
          `${baseURLAPI}/equipo/imgmiembro/${item._id}/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    lista();
  };

  return (
    <>
      <Breadcrumbs list={["Equipo"]} vistas={["lista"]} setVista={setVista} />
      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Equipo</span>
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
            setId={setIdEquipo}
            updateView="actualizar"
            deleteView="eliminar"
            colums={colums}
            values={valores}
            imgIndex={4}
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
    data.append("nombre", values.nombre);
    data.append("roll", values.roll);
    data.append("cometario", values.cometario);
    data.append("file", values.file[0]);
    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Miembro registrado con éxito.");
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
        list={["Equipo", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Miembro</span>
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
                  id="nombre"
                  key={"nombre" + key}
                  register={register}
                  required={true}
                  icon={UserIcon}
                />
                <TextArea
                  id="roll"
                  key={"roll" + key}
                  register={register}
                  required={true}
                  icon={QueueListIcon}
                />

                <TextArea
                  id="cometario"
                  key={"cometario" + key}
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
                Adicionar Miembro
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idEquipo, setIdEquipo } = useGlobal();
  const [item, setItem] = useState({});

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const actualizar = async () => {
      const res = (await getById(idEquipo)).data;
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
    data.append("nombre", values.nombre);
    data.append("roll", values.roll);
    data.append("cometario", values.cometario);

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await update(item._id, data);
      if (res) {
        setIdEquipo("");
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
        list={["Equipo", "Actualizar"]}
        vistas={["lista", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Miembro Id: {idEquipo}
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
                  id="nombre"
                  register={register}
                  value={item.nombre}
                  required={true}
                  icon={UserIcon}
                />
                <TextArea
                  id="roll"
                  register={register}
                  value={item.roll}
                  required={true}
                  icon={QueueListIcon}
                />
                <TextArea
                  id="cometario"
                  register={register}
                  value={item.cometario}
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
                      ? `${baseURLAPI}/equipo/imgmiembro/${idEquipo}/${Date.now()}/medium`
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
                Actualizar Miembro
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idEquipo, setIdEquipo } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const eliminar = async () => {
      const res = (await getById(idEquipo)).data;
      if (res) {
        setItem(res);
      }
    };
    eliminar();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idEquipo);

      if (res) {
        setIdEquipo("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Equipo", "Eliminar"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Miembro Id: {idEquipo}
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
            <b>Nombre:</b> {item.nombre}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Roll:</b> {item.roll}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Cometario:</b> {item.cometario}
          </span>
          <span style={{ marginTop: 30 }}>
            {item && item._id && (
              <img
                className="z-depth-1"
                width="300"
                height="278"
                style={{ objectFit: "cover" }}
                src={`${baseURLAPI}/equipo/imgmiembro/${idEquipo}/${Date.now()}/medium`}
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
              Eliminar Miembro
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
