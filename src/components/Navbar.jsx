/* eslint-disable react/prop-types */
import "./css/Navbar.css";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

import M from "materialize-css";
import { useEffect } from "react";

export default function Navbar({
  avatarName = "Usuario",
  avatarImg = "",
  setVista,
}) {
  const { logout } = useGlobal();

  useEffect(() => {
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});

    let dropdown_elems = document.querySelectorAll(".dropdown-avatar");
    M.Dropdown.init(dropdown_elems, {
      coverTrigger: false,
    });

    let tooltipped = document.querySelectorAll(".tooltipped_badge");
    M.Tooltip.init(tooltipped, {
      margin: 0,
      enterDelay: 0,
      inDuration: 0,
      outDuration: 0,
      exitDelay: 0,
    });
  });

  return (
    <>
      <div className="navbar-fixed">
        <nav className="grey darken-4" style={{ height: 64 }}>
          <div className="nav-wrapper">
            <ul className="right elements-navbar">
              <li>
                <a
                  className="dropdown-avatar"
                  href="#"
                  data-target="dropdown-avatar-content"
                  style={{
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  draggable="false"
                >
                  <Avatar foto={avatarImg} />
                  Hola {avatarName}.
                </a>

                <ul
                  id="dropdown-avatar-content"
                  className="dropdown-content grey darken-4"
                  style={{ top: 5 }}
                >
                  <li onClick={() => setVista("perfil")}>
                    <span className="icon-avatar-submenu">
                      <UserCircleIcon />
                      Usuario
                    </span>
                  </li>
                  <li>
                    <Link
                      to={"/"}
                      onClick={() => {
                        logout();
                      }}
                      style={{ display: "flex", justifyContent: "left" }}
                    >
                      <ArrowLeftOnRectangleIcon
                        style={{ height: 24, marginRight: 3 }}
                      />
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
