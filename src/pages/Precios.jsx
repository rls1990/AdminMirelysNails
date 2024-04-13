/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./css/Precios.css";
import { create, deleteS, getById, list, update } from "../api/precios";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import {
  ClockIcon,
  CurrencyDollarIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useGlobal } from "../context/GlobalContext";

export default function Precios() {
  const [vista, setVista] = useState("precios");
  return (
    <>
      {vista === "precios" ? (
        <ListaPrecios setVista={setVista} />
      ) : vista === "nuevo-precio" ? (
        <NuevoPrecio setVista={setVista} />
      ) : vista === "actualizar-precio" ? (
        <ActualizarPrecio setVista={setVista} />
      ) : (
        vista === "eliminar-precio" && <EliminarPrecio setVista={setVista} />
      )}
    </>
  );
}

function ListaPrecios({ setVista }) {
  const colums = ["Título", "Precio", "Duración"];
  const [valores, setValores] = useState([]);
  const { setIdPrecio } = useGlobal();

  useEffect(() => {
    const listaPrecios = async () => {
      const lista = (await list()).data;

      let values = [];

      lista.forEach((item) => {
        values.push([item._id, item.titulo, item.precio, item.duracion]);
      });
      setValores(values);
    };

    listaPrecios();
  }, []);

  return (
    <>
      <Breadcrumbs
        list={["Precios"]}
        vistas={["precios"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Precios</span>
          <button
            onClick={() => setVista("nuevo-precio")}
            className="btn btn-add-action"
            style={{ display: "flex", alignItems: "center", borderRadius: 7 }}
          >
            <span>Adicionar</span>
          </button>
        </div>

        <div className="div-container-table  z-depth-1">
          <Table
            setVista={setVista}
            setId={setIdPrecio}
            updateView="actualizar-precio"
            deleteView="eliminar-precio"
            colums={colums}
            values={valores}
          />
        </div>
      </div>
    </>
  );
}

function NuevoPrecio({ setVista }) {
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
    data.append("precio", values.precio);
    data.append("duracion", values.duracion);

    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Precio registrado con exito.");
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
        list={["Precios", "Nuevo Precio"]}
        vistas={["precios", "nuevo-precio"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Precio</span>
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
                  id="precio"
                  key={"precio" + key}
                  register={register}
                  required={true}
                  icon={CurrencyDollarIcon}
                />
                <InputText
                  id="duracion"
                  key={"duracion" + key}
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
                Crear Precio
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function ActualizarPrecio({ setVista }) {
  const { idPrecio, setIdPrecio } = useGlobal();
  const [precio, setPrecio] = useState({});
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const precioUpd = async () => {
      const prec = (await getById(idPrecio)).data;
      if (prec) {
        setPrecio(prec);
      }
    };
    precioUpd();
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
    data.append("precio", values.precio);
    data.append("duracion", values.duracion);

    try {
      const res = await update(precio._id, data);
      if (res) {
        setIdPrecio("");
        setVista("precios");
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <Breadcrumbs
        list={["Precios", "Actualizar Precio"]}
        vistas={["precios", "actualizar-precio"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Precio Id: {idPrecio}
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
                  id="titulo"
                  register={register}
                  value={precio.titulo}
                  required={true}
                  icon={PencilIcon}
                />

                <InputText
                  id="precio"
                  register={register}
                  value={precio.precio}
                  required={true}
                  icon={CurrencyDollarIcon}
                />

                <InputText
                  id="duracion"
                  register={register}
                  value={precio.duracion}
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

function EliminarPrecio({ setVista }) {
  const { idPrecio, setIdPrecio } = useGlobal();
  const [precio, setPrecio] = useState({});

  useEffect(() => {
    const precioDel = async () => {
      const prec = (await getById(idPrecio)).data;
      if (prec) {
        setPrecio(prec);
      }
    };
    precioDel();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idPrecio);

      if (res) {
        setIdPrecio("");
        setVista("precios");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Precios", "Eliminar Precio"]}
        vistas={["precios", "eliminar-precio"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Precio Id: {idPrecio}
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
            <b>Título:</b> {precio.titulo}
          </span>

          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Precio:</b> {precio.precio}
          </span>

          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Duración:</b> {precio.duracion}
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
              Eliminar Precio
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
