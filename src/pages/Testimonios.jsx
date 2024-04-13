/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { useEffect } from "react";
import { create, deleteS, getById, list, update } from "../api/testimonios";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import TextArea from "../components/TextArea";
import { QueueListIcon, UserIcon } from "@heroicons/react/24/solid";
import FileChooser from "../components/FileChooser";
import { baseURLAPI } from "../config";

export default function Testimonios() {
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
  const colums = ["Nombre", "Comentario", "Roll", "Foto"];
  const [valores, setValores] = useState([]);
  const { setIdTestimonios } = useGlobal();

  useEffect(() => {
    const lista = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.nombre,
          item.cometario,
          item.roll,
          `${baseURLAPI}/testimonios/imgtestimonios/${item._id}/${Date.now()}`,
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
          item.cometario,
          item.roll,
          `${baseURLAPI}/testimonios/imgtestimonios/${item._id}/${Date.now()}`,
        ]);
      });
      setValores(values);
    };

    lista();
  };

  return (
    <>
      <Breadcrumbs
        list={["Testimonios"]}
        vistas={["lista"]}
        setVista={setVista}
      />
      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Testimonios</span>
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
            setId={setIdTestimonios}
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
    data.append("cometario", values.cometario);
    data.append("roll", values.roll);
    data.append("file", values.file[0]);
    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Testimonios registrado con exito.");
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
        list={["Testimonios", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Adicionar Testimonio
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
                <InputText
                  id="roll"
                  key={"roll" + key}
                  register={register}
                  required={true}
                  icon={UserIcon}
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
                Adicionar Testimonio
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idTestimonios, setIdTestimonios } = useGlobal();
  const [item, setItem] = useState({});

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const actualizar = async () => {
      const res = (await getById(idTestimonios)).data;
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
    data.append("cometario", values.cometario);
    data.append("roll", values.roll);

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await update(item._id, data);
      if (res) {
        setIdTestimonios("");
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
        list={["Testimonios", "Actualizar"]}
        vistas={["lista", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Testimonio Id: {idTestimonios}
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
                <InputText
                  id="roll"
                  register={register}
                  value={item.roll}
                  required={true}
                  icon={UserIcon}
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
                      ? `${baseURLAPI}/testimonios/imgtestimonios/${idTestimonios}/${Date.now()}`
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
                Actualizar Testimonio
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idTestimonios, setIdTestimonios } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const eliminar = async () => {
      const res = (await getById(idTestimonios)).data;
      if (res) {
        setItem(res);
      }
    };
    eliminar();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idTestimonios);

      if (res) {
        setIdTestimonios("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Testimonios", "Eliminar"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Testimonio Id: {idTestimonios}
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
          <span style={{ fontSize: 15 }}>
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
                src={`${baseURLAPI}/testimonios/imgtestimonios/${idTestimonios}/${Date.now()}`}
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
              Eliminar Testimonio
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
