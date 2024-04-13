/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { create, deleteS, getById, list, update } from "../api/contacto";
import Breadcrumbs from "../components/Breadcrumbs";
import Table from "../components/Table";
import InputText from "../components/InputText";
import TextArea from "../components/TextArea";
import { useForm } from "react-hook-form";

export default function Contacto() {
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
  const colums = [
    "Descripcion",
    "Direccion",
    "Teléfonos",
    "Correos",
    "Facebook",
    "Instagram",
    "Pinterest",
  ];
  const [valores, setValores] = useState([]);
  const { setIdContacto } = useGlobal();

  useEffect(() => {
    const lista = async () => {
      const lista = (await list()).data;
      let values = [];

      lista.forEach((item) => {
        values.push([
          item._id,
          item.descripcion,
          item.direccion,
          item.telefonos,
          item.correos,
          item.facebook,
          item.instagram,
          item.pinterest,
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
          item.descripcion,
          item.direccion,
          item.telefonos,
          item.correos,
          item.facebook,
          item.instagram,
          item.pinterest,
        ]);
      });
      setValores(values);
    };

    lista();
  };

  return (
    <>
      <Breadcrumbs
        list={["Contactos"]}
        vistas={["lista"]}
        setVista={setVista}
      />
      <div className="div-general-container fadeIn z-depth-1">
        <div className="div-container-actions">
          <span className="title-vista-servicios">Contactos</span>
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
            setId={setIdContacto}
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
    data.append("descripcion", values.descripcion);
    data.append("direccion", values.direccion);
    data.append("telefonos", values.telefonos);
    data.append("correos", values.correos);
    data.append("facebook", values.facebook);
    data.append("instagram", values.instagram);
    data.append("pinterest", values.pinterest);

    try {
      const res = await create(data);
      if (res) {
        setKey(Date.now());
        setMensage("Contacto registrado con exito.");
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
        list={["Contactos", "Adicionar"]}
        vistas={["lista", "adicionar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">Adicionar Contacto</span>
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
                <TextArea
                  id="descripcion"
                  key={"descripcion" + key}
                  register={register}
                  required={true}
                />

                <InputText
                  id="direccion"
                  key={"direccion" + key}
                  register={register}
                  required={true}
                />

                <InputText
                  id="telefonos"
                  key={"telefonos" + key}
                  register={register}
                  required={true}
                />
                <InputText
                  id="correos"
                  key={"correos" + key}
                  register={register}
                  required={true}
                />
                <InputText
                  id="facebook"
                  key={"facebook" + key}
                  register={register}
                  required={true}
                />
                <InputText
                  id="instagram"
                  key={"instagram" + key}
                  register={register}
                  required={true}
                />
                <InputText
                  id="pinterest"
                  key={"pinterest" + key}
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
                Adicionar Contacto
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Actualizar({ setVista }) {
  const { idContacto, setIdContacto } = useGlobal();
  const [item, setItem] = useState({});

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const actualizar = async () => {
      const res = (await getById(idContacto)).data;
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
    data.append("descripcion", values.descripcion);
    data.append("direccion", values.direccion);
    data.append("telefonos", values.telefonos);
    data.append("correos", values.correos);
    data.append("facebook", values.facebook);
    data.append("instagram", values.instagram);
    data.append("pinterest", values.pinterest);

    try {
      const res = await update(item._id, data);
      if (res) {
        setIdContacto("");
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
            Actualizar Contacto Id: {idContacto}
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
                <TextArea
                  id="descripcion"
                  register={register}
                  required={true}
                  value={item.descripcion}
                />

                <InputText
                  id="direccion"
                  register={register}
                  required={true}
                  value={item.direccion}
                />

                <InputText
                  id="telefonos"
                  register={register}
                  required={true}
                  value={item.telefonos}
                />
                <InputText
                  id="correos"
                  register={register}
                  required={true}
                  value={item.correos}
                />
                <InputText
                  id="facebook"
                  register={register}
                  required={true}
                  value={item.facebook}
                />
                <InputText
                  id="instagram"
                  register={register}
                  required={true}
                  value={item.instagram}
                />
                <InputText
                  id="pinterest"
                  register={register}
                  required={true}
                  value={item.pinterest}
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
                Actualizar Contacto
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function Eliminar({ setVista }) {
  const { idContacto, setIdContacto } = useGlobal();
  const [item, setItem] = useState({});

  useEffect(() => {
    const eliminar = async () => {
      const res = (await getById(idContacto)).data;
      if (res) {
        setItem(res);
      }
    };
    eliminar();
  }, []);

  const onSubmit = async () => {
    try {
      const res = await deleteS(idContacto);

      if (res) {
        setIdContacto("");
        setVista("lista");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumbs
        list={["Contactos", "Eliminar"]}
        vistas={["lista", "eliminar"]}
        setVista={setVista}
      />

      <div className="div-general-container fadeIn z-depth-1 white">
        <div className="div-title-nuevo-servicio">
          <span className="title-vista-nuevo-servicio">
            Eliminar Imagen Id: {idContacto}
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
            <b>Descripción:</b> {item.descripcion}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Dirección:</b> {item.direccion}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Teléfonos:</b> {item.telefonos}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Correos:</b> {item.correos}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Facebook:</b> {item.facebook}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Instagram:</b> {item.instagram}
          </span>
          <span style={{ fontSize: 15, marginTop: 5 }}>
            <b>Pinterest:</b> {item.pinterest}
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
              Eliminar Contacto
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
