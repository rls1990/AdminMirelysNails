/* eslint-disable react/prop-types */
import "./css/SidenavCell.css";
import { ArrowLeftIcon, Bars3Icon } from "@heroicons/react/24/solid";

import {
  RectangleGroupIcon,
  ClockIcon,
  UserGroupIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  Square3Stack3DIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { baseURLAPI } from "../config";

export default function SidenavCell({ user, setView, setIsOpen }) {
  return (
    <>
      <a
        href="#"
        data-target="slide-out"
        className="sidenav-trigger menu-icon-sidenavcell"
        onClick={() => setIsOpen(true)}
      >
        <Bars3Icon className="bars-menu" />
      </a>

      <ul id="slide-out" className="sidenav" style={{ overflowY: "hidden" }}>
        <li>
          <div className="user-view">
            <div className="background z-depth-2">
              <img src="img/medium1.jpg" />
            </div>
            <div className="presentation-menu">
              <img
                className="circle z-depth-1"
                src={`${baseURLAPI}/usuarios/imgperfil/${
                  user._id
                }/${Date.now()}/small`}
              />

              <span
                className="white-text"
                style={{ marginTop: 30, lineHeight: 0 }}
              >
                <b>Nombre: </b>
                {user.nombre}
              </span>
              <span
                className="white-text"
                style={{ marginTop: 5, lineHeight: 2 }}
              >
                <b>Email: </b>
                {user.email}
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <a
              className="sidenav-close menu-close"
              onClick={() => setIsOpen(false)}
              href="#!"
            >
              <ArrowLeftIcon />
            </a>
          </div>
        </li>

        <div className="items-menu">
          <ul>
            <li className="waves-effect" onClick={() => setView("carrusel")}>
              <span>
                <Square3Stack3DIcon className="galrot" />
                Carrusel
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("servicios")}>
              <span>
                <RectangleGroupIcon />
                Servicios
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("galeria")}>
              <span>
                <Squares2X2Icon />
                Galería
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("equipo")}>
              <span>
                <UserGroupIcon />
                Equipo
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("diplomas")}>
              <span>
                <DocumentTextIcon />
                Diplomas
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("testimonios")}>
              <span>
                <BookOpenIcon />
                Testimonios
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("precios")}>
              <span>
                <CurrencyDollarIcon />
                Precios
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("horario")}>
              <span>
                <ClockIcon />
                Horario
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("contacto")}>
              <span>
                <ChatBubbleOvalLeftEllipsisIcon />
                Contacto
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("preguntas")}>
              <span>
                <QuestionMarkCircleIcon />
                Preguntas y Respuestas
              </span>
            </li>
            <li className="waves-effect" onClick={() => setView("perfil")}>
              <span>
                <UserCircleIcon />
                Perfil de Usuario
              </span>
            </li>
          </ul>
        </div>
      </ul>
    </>
  );
}
