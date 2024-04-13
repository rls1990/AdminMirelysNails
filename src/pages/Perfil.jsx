/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { useEffect } from "react";
import {
  createUser,
  deleteUser,
  getById,
  updateUser,
  users,
} from "../api/auth";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import InputEmail from "../components/InputEmail";
import InputPasswordConfirm from "../components/InputPasswordConfirm";
import FileChooser from "../components/FileChooser";
import { PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { baseURLAPI } from "../config";

export default function Perfil() {
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
  const colums = ["Nombre", "Email", "Telefono", "Roll", "Foto"];
  const [valores, setValores] = useState([]);
  const { setIdUsuario } = useGlobal();

  useEffect(() => {
    const lista = async () => {
      const lista = (await users()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.nombre,
          item.email,
          item.telefono,
          item.roll,
          `${baseURLAPI}/usuarios/imgperfil/${item._id}/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    lista();
  }, []);

  const Refrescar = () => {
    const lista = async () => {
      const lista = (await users()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.nombre,
          item.email,
          item.telefono,
          item.roll,
          `${baseURLAPI}/usuarios/imgperfil/${item._id}/${Date.now()}/medium`,
        ]);
      });
      setValores(values);
    };

    lista();
  };

  return (
    <>
      <Breadcrumbs list={["Usuarios"]} vistas={["lista"]} setVista={setVista} />
      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Usuarios</span>
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
            setId={setIdUsuario}
            updateView="actualizar"
            deleteView="eliminar"
            colums={colums}
            values={valores}
            imgIndex={5}
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
    data.append("email", values.email);
    data.append("telefono", values.telefono);
    data.append("roll", "admin");
    data.append("password", values.password);
    data.append("file", values.file[0]);
    try {
      const res = await createUser(data);
      if (res) {
        setKey(Date.now());
        setMensage("Usuario registrado con exito.");
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
        list={["Usuarios", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Usuario</span>
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
                <InputEmail
                  id="email"
                  key={"email" + key}
                  register={register}
                  required={true}
                />
                <InputText
                  id="telefono"
                  key={"telefono" + key}
                  register={register}
                  required={true}
                  icon={PhoneIcon}
                />

                <InputPasswordConfirm
                  id="password"
                  key={"password" + key}
                  register={register}
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
                Adicionar Usuario
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idUsuario, setIdUsuario } = useGlobal();
  const [item, setItem] = useState({});

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const actualizar = async () => {
      const res = (await getById(idUsuario)).data;
      if (res) {
        setItem(res);
      }
    };
    actualizar();
  }, []);

  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  const onSubmit = handleSubmit(async (values) => {
    const data = new FormData();
    data.append("nombre", values.nombre);
    data.append("email", values.email);
    data.append("telefono", values.telefono);
    data.append("password", values.password);
    data.append("roll", "admin");

    if (values.file.length > 0) {
      data.append("file", values.file[0]);
    }

    try {
      const res = await updateUser(item._id, data);
      if (res) {
        setIdUsuario("");
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
        list={["Usuarios", "Actualizar"]}
        vistas={["lista", "actualizar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Actualizar Usuario Id: {idUsuario}
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
                  id="nombre"
                  register={register}
                  value={item.nombre}
                  required={true}
                  icon={UserIcon}
                />
                <InputEmail
                  id="email"
                  register={register}
                  value={item.email}
                  required={true}
                />
                <InputText
                  id="telefono"
                  register={register}
                  value={item.telefono}
                  required={true}
                  icon={PhoneIcon}
                />

                <InputPasswordConfirm
                  id="password"
                  register={register}
                  valueD={item.password}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <FileChooser
                  id="file"
                  nombre="file"
                  register={register}
                  url={
                    item && item._id
                      ? `${baseURLAPI}/usuarios/imgperfil/${idUsuario}/${Date.now()}/medium`
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
                Actualizar Usuario
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idUsuario, setIdUsuario } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const eliminar = async () => {
      const res = (await getById(idUsuario)).data;
      if (res) {
        setItem(res);
      }
    };
    eliminar();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteUser(idUsuario);

      if (res) {
        setIdUsuario("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Usuarios", "Eliminar Usuario"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Usuario Id: {idUsuario}
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
            <b>Email:</b> {item.email}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Telefono:</b> {item.telefono}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Roll:</b> {item.roll}
          </span>
          <span style={{ marginTop: 30 }}>
            {item && item._id && (
              <img
                className="z-depth-1"
                width="300"
                height="278"
                style={{ objectFit: "cover" }}
                src={`${baseURLAPI}/usuarios/imgperfil/${idUsuario}/${Date.now()}/medium`}
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
              Eliminar Usuario
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
