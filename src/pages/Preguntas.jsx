/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { create, deleteS, getById, list, update } from "../api/preguntas";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import TextArea from "../components/TextArea";
import { useGlobal } from "../context/GlobalContext";

export default function Preguntas() {
  const [vista, setVista] = useState("lista");
  return (
    <>
      {vista === "lista" ? (
        <Lista setVista={setVista} />
      ) : vista === "adicionar" ? (
        <Adicionar setVista={setVista} />
      ) : vista === "actualizar" ? (
        <Actualizar setVista={setVista} />
      ) : (
        vista === "eliminar" && <Eliminar setVista={setVista} />
      )}
    </>
  );
}

function Lista({ setVista }) {
  const colums = ["Pregunta", "Respuesta"];
  const [valores, setValores] = useState([]);
  const { setIdPreguntas } = useGlobal();

  useEffect(() => {
    const listaPrecios = async () => {
      const lista = (await list()).data;

      let values = [];

      lista.forEach((item) => {
        values.push([item._id, item.pregunta, item.respuesta]);
      });
      setValores(values);
    };

    listaPrecios();
  }, []);

  return (
    <>
      <Breadcrumbs
        list={["Preguntas"]}
        vistas={["lista"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Preguntas</span>
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
            setId={setIdPreguntas}
            updateView="actualizar"
            deleteView="eliminar"
            colums={colums}
            values={valores}
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
    data.append("pregunta", values.pregunta);
    data.append("respuesta", values.respuesta);

    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Pregunta registrada con exito.");
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
        list={["Pregunta", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Pregunta</span>
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
                  id="pregunta"
                  key={"pregunta" + key}
                  register={register}
                  required={true}
                />
                <TextArea
                  id="respuesta"
                  key={"respuesta" + key}
                  register={register}
                  required={true}
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
                Crear Pregunta
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idPreguntas, setIdPreguntas } = useGlobal();
  const [item, setItem] = useState({});
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const act = async () => {
      const res = (await getById(idPreguntas)).data;
      if (res) {
        setItem(res);
      }
    };
    act();
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
    data.append("pregunta", values.pregunta);
    data.append("respuesta", values.respuesta);

    try {
      const res = await update(item._id, data);
      if (res) {
        setIdPreguntas("");
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
        list={["Preguntas", "Actualizar"]}
        vistas={["lista", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Pregunta Id: {idPreguntas}
          </span>
        </div>

        {errors && errors.length > 0 && (
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
                  id="pregunta"
                  register={register}
                  value={item.pregunta}
                  required={true}
                />

                <TextArea
                  id="respuesta"
                  register={register}
                  value={item.respuesta}
                  required={true}
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
                Actualizar Pregunta
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idPreguntas, setIdPreguntas } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const elim = async () => {
      const res = (await getById(idPreguntas)).data;
      if (res) {
        setItem(res);
      }
    };
    elim();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idPreguntas);

      if (res) {
        setIdPreguntas("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Preguntas", "Eliminar"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Pregunta Id: {idPreguntas}
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
            <b>Pregunta:</b> {item.pregunta}
          </span>

          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Respuesta:</b> {item.respuesta}
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
              Eliminar Pregunta
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
