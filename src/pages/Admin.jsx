/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./css/Admin.css";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Loading from "./Loading";
import Navbar from "../components/Navbar";
import SidenavCell from "../components/SidenavCell";
import M from "materialize-css";
import Servicios from "./Servicios";
import Galeria from "./Galeria";
import Precios from "./Precios";
import Horarios from "./Horarios";
import Carrusel from "./Carrusel";
import Equipo from "./Equipo";
import Testimonios from "./Testimonios";
import Contacto from "./Contacto";
import Preguntas from "./Preguntas";
import Perfil from "./Perfil";
import Diplomas from "./Diplomas";
import { baseURLAPI } from "../config";

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useGlobal();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");

    
  }, []);

  return (
    <>
      <div>{isAuthenticated ? <ViewAdmin user={user} /> : <Loading />}</div>
    </>
  );
}

function ViewAdmin({ user }) {
  const [vista, setVista] = useState("servicios");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {
      inDuration: 0,
      onCloseStart: () => {
        setIsOpen(false);
      },
    });

    if (isOpen) {
      let instance = M.Sidenav.getInstance(elems[0]);
      instance.open();
    } else if (!isOpen) {
      let instance = M.Sidenav.getInstance(elems[0]);
      instance.close();
    }
  }, [vista]);

  return (
    <>
      <div className="admin-s">
        <Navbar
          avatarName={user.nombre}
          avatarImg={`${baseURLAPI}/usuarios/imgperfil/${
            user._id
          }/${Date.now()}/small`}
          setVista={setVista}
        />

        <SidenavCell user={user} setView={setVista} setIsOpen={setIsOpen} />
      </div>

      <div className="vistas">
        <Vistas vista={vista} />
      </div>
    </>
  );
}

function Vistas({ vista }) {
  return (
    <>
      {vista === "carrusel" ? (
        <Carrusel />
      ) : vista === "servicios" ? (
        <Servicios />
      ) : vista === "galeria" ? (
        <Galeria />
      ) : vista === "equipo" ? (
        <Equipo />
      ) : vista === "diplomas" ? (
        <Diplomas />
      ) : vista === "testimonios" ? (
        <Testimonios />
      ) : vista === "precios" ? (
        <Precios />
      ) : vista === "horario" ? (
        <Horarios />
      ) : vista === "contacto" ? (
        <Contacto />
      ) : vista === "preguntas" ? (
        <Preguntas />
      ) : (
        vista === "perfil" && <Perfil />
      )}
    </>
  );
}
