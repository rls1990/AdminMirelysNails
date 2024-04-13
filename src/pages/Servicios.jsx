/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import "./css/Servicios.css";
import Table from "../components/Table";
import { QueueListIcon, UserIcon } from "@heroicons/react/24/solid";

import { create, deleteS, getById, list, update } from "../api/servicios.js";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import TextArea from "../components/TextArea";
import FileChooser from "../components/FileChooser";
import { useGlobal } from "../context/GlobalContext";
import { baseURLAPI } from "../config.js";

/******************************************************************* */

export default function Servicios() {
  const [vistaServicio, setVistaServicio] = useState("servicios");

  return (
    <>
      {vistaServicio === "servicios" && (
        <ListaServicios setVista={setVistaServicio} />
      )}

      {vistaServicio === "new-servicio" && (
        <NewServicio setVista={setVistaServicio} />
      )}

      {vistaServicio === "update-servicio" && (
        <ActualizarServicio setVista={setVistaServicio} />
      )}

      {vistaServicio === "delete-servicio" && (
        <DeleteServicio setVista={setVistaServicio} />
      )}
    </>
  );
}

/******************************************************************* */

function ListaServicios({ setVista }) {
  const colums = ["Nombre", "Descripción", "Imagen"];
  const [valores, setValores] = useState([]);
  const { setIdServicio } = useGlobal();

  useEffect(() => {
    const listaServicios = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.nombre,
          item.descripcion,
          `${baseURLAPI}/servicios/imgservicio/${
            item._id
          }/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    listaServicios();
  }, []);

  const Refrescar = () => {
    const listaServicios = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.nombre,
          item.descripcion,
          `${baseURLAPI}/servicios/imgservicio/${
            item._id
          }/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    listaServicios();
  };

  return (
    <>
      <Breadcrumbs
        list={["Servicios"]}
        vistas={["servicios"]}
        setVista={setVista}
      />
      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Servicios</span>
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
            onClick={() => setVista("new-servicio")}
            className="btn btn-add-action"
            style={{ display: "flex", alignItems: "center", borderRadius: 7 }}
          >
            <span>Adicionar</span>
          </button>
        </div>
        <div className="div-container-table  z-depth-1">
          <Table
            setVista={setVista}
            setId={setIdServicio}
            updateView="update-servicio"
            deleteView="delete-servicio"
            colums={colums}
            values={valores}
            imgIndex={3}
          />
        </div>
      </div>
    </>
  );
}

/******************************************************************* */

function NewServicio({ setVista }) {
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
    data.append("descripcion", values.descripcion);
    data.append("file", values.file[0]);
    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Servicio registrado con exito.");
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
        list={["Servicios", "Nuevo Servicio"]}
        vistas={["servicios", "new-servicio"]}
        setVista={setVista}
      />
      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Servicio</span>
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
                Crear Servicio
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

/******************************************************************* */

function ActualizarServicio({ setVista }) {
  const { idServicio, setIdServicio } = useGlobal();
  const [servicio, setServicio] = useState({});

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const servicioUpd = async () => {
      const serv = (await getById(idServicio)).data;
      if (serv) {
        setServicio(serv);
      }
    };
    servicioUpd();
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
    data.append("descripcion", values.descripcion);

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await update(servicio._id, data);
      if (res) {
        setIdServicio("");
        setVista("servicios");
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <Breadcrumbs
        list={["Servicios", "Actualizar Servicio"]}
        vistas={["servicios", "update-servicio"]}
        setVista={setVista}
      />
      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Servicio Id: {idServicio}
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
                  value={servicio.nombre}
                  required={true}
                  icon={UserIcon}
                />
                <TextArea
                  id="descripcion"
                  register={register}
                  value={servicio.descripcion}
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
                    servicio && servicio._id
                      ? `${baseURLAPI}/servicios/imgservicio/${idServicio}/${Date.now()}/medium`
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
                Actualizar Servicio
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

/******************************************************************* */

function DeleteServicio({ setVista }) {
  const { idServicio } = useGlobal();
  const [servicio, setServicio] = useState({});
  const { setIdServicio } = useGlobal();

  useEffect(() => {
    const servicioDel = async () => {
      const serv = (await getById(idServicio)).data;
      if (serv) {
        setServicio(serv);
      }
    };
    servicioDel();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idServicio);

      if (res) {
        setIdServicio("");
        setVista("servicios");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Servicios", "Eliminar Servicio"]}
        vistas={["servicios", "delete-servicio"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Servicio Id: {idServicio}
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
            <b>Nombre:</b> {servicio.nombre}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Descripción:</b> {servicio.descripcion}
          </span>
          <span style={{ marginTop: 30 }}>
            {servicio && servicio._id && (
              <img
                className="z-depth-1"
                width="300"
                height="278"
                style={{ objectFit: "cover" }}
                src={`${baseURLAPI}/servicios/imgservicio/${idServicio}/${Date.now()}/medium`}
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
              Eliminar Servicio
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
