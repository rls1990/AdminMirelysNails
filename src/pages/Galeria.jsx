/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { create, deleteS, getById, list, update } from "../api/galeria.js";
import { list as servios } from "../api/servicios.js";
import { useGlobal } from "../context/GlobalContext.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Table from "../components/Table.jsx";
import { useForm } from "react-hook-form";
import FileChooser from "../components/FileChooser.jsx";
import Select from "../components/Select.jsx";
import { baseURLAPI } from "../config.js";

export default function Galeria() {
  const [vista, setVista] = useState("galeria");

  return (
    <>
      {vista === "galeria" ? (
        <ListaImag setVista={setVista} />
      ) : vista === "adicionar" ? (
        <AddImg setVista={setVista} />
      ) : vista === "actualizar" ? (
        <UpdImg setVista={setVista} />
      ) : (
        vista === "eliminar" && <DelImg setVista={setVista} />
      )}
    </>
  );
}

function ListaImag({ setVista }) {
  const colums = ["Nombre del Servicio", "Imagen"];
  const [lista, setLista] = useState([]);
  const { setIdGaleria } = useGlobal();

  useEffect(() => {
    const listaImagenes = async () => {
      const listaImg = (await list()).data;
      let values = [];

      if (listaImg) {
        listaImg.forEach((item) => {
          if (item.servicio)
            values.push([
              item._id,
              item.servicio.nombre,
              `${baseURLAPI}/galeria/imggaleria/${item._id}/${Date.now()}`,
            ]);
        });
      }

      setLista(values);
    };

    listaImagenes();
  }, []);

  const Refrescar = () => {
    const listaImagenes = async () => {
      const listaImg = (await list()).data;
      let values = [];

      if (listaImg) {
        listaImg.forEach((item) => {
          if (item.servicio)
            values.push([
              item._id,
              item.servicio.nombre,
              `${baseURLAPI}/galeria/imggaleria/${item._id}/${Date.now()}`,
            ]);
        });
      }

      setLista(values);
    };

    listaImagenes();
  };

  return (
    <>
      <Breadcrumbs
        list={["Galeria"]}
        vistas={["galeria"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Galería</span>

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
            setId={setIdGaleria}
            updateView="actualizar"
            deleteView="eliminar"
            colums={colums}
            values={lista}
            imgIndex={2}
          />
        </div>
      </div>
    </>
  );
}

function AddImg({ setVista }) {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState([]);
  const [mensage, setMensage] = useState("");
  const [key, setKey] = useState(Date.now());

  const { servicios, setServicios } = useGlobal();
  useEffect(() => {
    const loadServi = async () => {
      const servi = (await servios()).data;
      let data = [];
      servi.forEach((element) => {
        data.push({ value: element._id, nombre: element.nombre });
      });
      setServicios(data);
      setKey(Date.now());
    };

    loadServi();
  }, []);

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
    data.append("servicio", values.servicios);
    //data.append("imagen", values.imagen);
    data.append("file", values.file[0]);
    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Imagen registrado con exito.");
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
        list={["Gelería", "Adicionar Imagen"]}
        vistas={["galeria", "adicionar"]}
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
                <Select
                  register={register}
                  key={"servicios" + key}
                  label="Servicios"
                  id="servicios"
                  lista={servicios}
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

function UpdImg({ setVista }) {
  const { idGaleria, setIdGaleria, servicios, setServicios } = useGlobal();
  const [galeria, setGaleria] = useState({});
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    const loadServi = async () => {
      const servi = (await servios()).data;
      let data = [];
      servi.forEach((element) => {
        data.push({ value: element._id, nombre: element.nombre });
      });
      setServicios(data);
      setKey(Date.now());
    };
    if (servicios.length === 0) loadServi();
  }, []);

  useEffect(() => {
    const galeriaUpd = async () => {
      const gal = (await getById(idGaleria)).data;
      if (gal) {
        setGaleria(gal);
      }
    };
    galeriaUpd();
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
    if (values.servicios.length === 0) {
      setErrors(["Debe seleccionar un servicio."]);
      return;
    }

    const data = new FormData();
    data.append("servicio", values.servicios);

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await update(galeria._id, data);
      if (res) {
        setIdGaleria("");
        setVista("galeria");
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <>
      <Breadcrumbs
        list={["Galeria", "Actualizar Imagen"]}
        vistas={["galeria", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Imagen Id: {idGaleria}
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
                <Select
                  key={"servicios" + key}
                  register={register}
                  label="Servicios"
                  id="servicios"
                  lista={servicios}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <FileChooser
                  id="file"
                  key={"file"}
                  nombre="file"
                  register={register}
                  url={`${baseURLAPI}/galeria/imggaleria/${idGaleria}/${Date.now()}`}
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

function DelImg({ setVista }) {
  const { idGaleria } = useGlobal();
  const [galeria, setGaleria] = useState({});
  const { setIdGaleria } = useGlobal();

  useEffect(() => {
    const galDel = async () => {
      const gal = (await getById(idGaleria)).data;
      if (gal) {
        setGaleria(gal);
      }
    };
    galDel();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idGaleria);

      if (res) {
        setIdGaleria("");
        setVista("galeria");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Galeria", "Eliminar Imagen"]}
        vistas={["galeria", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Galeria Id: {idGaleria}
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
            <b>Servicio: </b>
            {galeria && galeria.servicio && galeria.servicio.nombre}
          </span>

          <span style={{ marginTop: 30 }}>
            {galeria && galeria._id && (
              <img
                className="z-depth-1"
                width="300"
                height="278"
                style={{ objectFit: "cover" }}
                src={`${baseURLAPI}/galeria/imggaleria/${idGaleria}/${Date.now()}`}
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
