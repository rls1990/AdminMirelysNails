/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { create, deleteS, getById, list, update } from "../api/diplomas";
import { list as equipo } from "../api/equipo";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import Select from "../components/Select";
import FileChooser from "../components/FileChooser";
import { baseURLAPI } from "../config";

export default function Diplomas() {
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
  const colums = ["Miembro", "Imagen"];
  const [lista, setLista] = useState([]);
  const { setIdDiploma } = useGlobal();

  useEffect(() => {
    const listaImagenes = async () => {
      const listaImg = (await list()).data;
      let values = [];

      if (listaImg) {
        listaImg.forEach((item) => {
          if (item.miembro)
            values.push([
              item._id,
              item.miembro.nombre,
              `${baseURLAPI}/diploma/imgdiploma/${item._id}/${Date.now()}`,
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
          if (item.miembro)
            values.push([
              item._id,
              item.miembro.nombre,
              `${baseURLAPI}/diploma/imgdiploma/${item._id}/${Date.now()}`,
            ]);
        });
      }

      setLista(values);
    };

    listaImagenes();
  };

  return (
    <>
      <Breadcrumbs list={["Diplomas"]} vistas={["lista"]} setVista={setVista} />

      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Diplomas</span>

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
            setId={setIdDiploma}
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

function Adicionar({ setVista }) {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState([]);
  const [mensage, setMensage] = useState("");
  const [key, setKey] = useState(Date.now());

  const { miembros, setMiembros } = useGlobal();

  useEffect(() => {
    const loadMiembros = async () => {
      const servi = (await equipo()).data;
      let data = [];
      servi.forEach((element) => {
        data.push({ value: element._id, nombre: element.nombre });
      });
      setMiembros(data);
      setKey(Date.now());
    };

    loadMiembros();
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
    data.append("miembro", values.miembro);
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
        list={["Diplomas", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Diploma</span>
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
                  key={"miembro" + key}
                  label="Miembros"
                  id="miembro"
                  lista={miembros}
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
                Adicionar Diploma
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idDiploma, setIdDiploma, miembros, setMiembros } = useGlobal();
  const [item, setItem] = useState({});
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    const loadMiemb = async () => {
      const miemb = (await equipo()).data;
      let data = [];
      miemb.forEach((element) => {
        data.push({ value: element._id, nombre: element.nombre });
      });
      setMiembros(data);
      setKey(Date.now());
    };
    loadMiemb();
  }, []);

  useEffect(() => {
    const diplomaUpd = async () => {
      const dipl = (await getById(idDiploma)).data;
      if (dipl) {
        setItem(dipl);
      }
    };
    diplomaUpd();
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
    if (values.miembro.length === 0) {
      setErrors(["Debe seleccionar un miembro del equipo."]);
      return;
    }

    const data = new FormData();
    data.append("miembro", values.miembro);

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await update(item._id, data);
      if (res) {
        setIdDiploma("");
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
        list={["DIplomas", "Actualizar"]}
        vistas={["lista", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Diploma Id: {idDiploma}
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
                  key={"miembro" + key}
                  register={register}
                  label="Miembros"
                  id="miembro"
                  lista={miembros}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <FileChooser
                  id="file"
                  key={"file"}
                  nombre="file"
                  register={register}
                  url={`${baseURLAPI}/diploma/imgdiploma/${idDiploma}/${Date.now()}`}
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
                Actualizar Diploma
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idDiploma, setIdDiploma } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const diplDel = async () => {
      const dip = (await getById(idDiploma)).data;
      if (dip) {
        setItem(dip);
      }
    };
    diplDel();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idDiploma);

      if (res) {
        setIdDiploma("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Diplomas", "Eliminar Diploma"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Galeria Id: {idDiploma}
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
            {item && item.miembro && item.miembro.nombre}
          </span>

          <span style={{ marginTop: 30 }}>
            {item && item._id && (
              <img
                className="z-depth-1"
                width="300"
                height="278"
                style={{ objectFit: "cover" }}
                src={`${baseURLAPI}/diploma/imgdiploma/${idDiploma}/${Date.now()}`}
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
              Eliminar Diploma
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
