/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./css/Horarios.css";
import { create, deleteS, getById, list, update } from "../api/horarios.js";
import { useGlobal } from "../context/GlobalContext";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import { ClockIcon, PencilIcon } from "@heroicons/react/24/solid";
export default function Horarios() {
  const [vista, setVista] = useState("horarios");
  return (
    <>
      {vista === "horarios" ? (
        <ListaHorarios setVista={setVista} />
      ) : vista === "nuevo-horario" ? (
        <NuevoHorario setVista={setVista} />
      ) : vista === "actualizar-horario" ? (
        <ActualizarHorario setVista={setVista} />
      ) : (
        vista === "eliminar-horario" && <EliminarHorario setVista={setVista} />
      )}
    </>
  );
}

function ListaHorarios({ setVista }) {
  const colums = ["Título", "Rango"];
  const [valores, setValores] = useState([]);
  const { setIdHorario } = useGlobal();

  useEffect(() => {
    const listaHorarios = async () => {
      const lista = (await list()).data;

      let values = [];

      lista.forEach((item) => {
        values.push([item._id, item.titulo, item.rango]);
      });
      setValores(values);
    };

    listaHorarios();
  }, []);

  return (
    <>
      <Breadcrumbs
        list={["Horarios"]}
        vistas={["horarios"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Horarios</span>
          <button
            onClick={() => setVista("nuevo-horario")}
            className="btn btn-add-action"
            style={{ display: "flex", alignItems: "center", borderRadius: 7 }}
          >
            <span>Adicionar</span>
          </button>
        </div>

        <div className="div-container-table  z-depth-1">
          <Table
            setVista={setVista}
            setId={setIdHorario}
            updateView="actualizar-horario"
            deleteView="eliminar-horario"
            colums={colums}
            values={valores}
          />
        </div>
      </div>
    </>
  );
}

function NuevoHorario({ setVista }) {
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
    data.append("rango", values.rango);

    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("horario registrado con exito.");
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
        list={["Horarios", "Nuevo Horario"]}
        vistas={["horarios", "nuevo-horario"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Horario</span>
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
                  icon={PencilIcon}
                />
                <InputText
                  id="rango"
                  key={"rango" + key}
                  register={register}
                  required={true}
                  icon={ClockIcon}
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
                Crear Horario
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function ActualizarHorario({ setVista }) {
  const { idHorario, setIdHorario } = useGlobal();
  const [horario, setHorario] = useState({});
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const horarioUpd = async () => {
      const hor = (await getById(idHorario)).data;
      if (hor) {
        setHorario(hor);
      }
    };
    horarioUpd();
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
    data.append("rango", values.rango);

    try {
      const res = await update(horario._id, data);
      if (res) {
        setIdHorario("");
        setVista("horarios");
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <Breadcrumbs
        list={["Horarios", "Actualizar Horario"]}
        vistas={["horarios", "actualizar-horario"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Horario Id: {idHorario}
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
                  value={horario.titulo}
                  required={true}
                  icon={PencilIcon}
                />

                <InputText
                  id="rango"
                  register={register}
                  value={horario.rango}
                  required={true}
                  icon={ClockIcon}
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
                Actualizar Precio
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function EliminarHorario({ setVista }) {
  const { idHorario, setIdHorario } = useGlobal();
  const [horario, setHorario] = useState({});

  useEffect(() => {
    const horarioDel = async () => {
      const hor = (await getById(idHorario)).data;
      if (hor) {
        setHorario(hor);
      }
    };
    horarioDel();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idHorario);

      if (res) {
        setIdHorario("");
        setVista("horarios");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Horarios", "Eliminar Horario"]}
        vistas={["horarios", "eliminar-hoario"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Horario Id: {idHorario}
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
            <b>Título:</b> {horario.titulo}
          </span>

          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Rango:</b> {horario.rango}
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
              Eliminar Horario
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
