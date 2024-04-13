import { useEffect, useState } from "react";
import "./css/Sidenav.css";
import M from "materialize-css";

import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  HomeIcon,
  UserCircleIcon,
  ChevronRightIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
  NewspaperIcon,
  PresentationChartLineIcon,
  CubeIcon,
  SwatchIcon,
  UsersIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function Sidenav() {
  const [classSC, setClassSC] = useState("sidenav-content z-depth-2");
  const [classLI, setClassLI] = useState("logo-img");

  const [textLogo, setTextLogo] = useState("");
  const [textLogoClass, setTextLogoClass] = useState("text-logo");

  const [menuCount, setMenuCount] = useState(0);

  const sidenavMenuonClick = () => {
    if (menuCount === 0) {
      setMenuCount(1);
      setClassSC("sidenav-content z-depth-2 sidenav-content-action");
      setClassLI("logo-img logo-img-action");
      setTextLogo("Admin Web.");
      setTextLogoClass("text-logo fadeInText");
    } else {
      setMenuCount(0);
      setClassSC("sidenav-content z-depth-2");
      setClassLI("logo-img");
      setTextLogo("");
      setTextLogoClass("text-logo");
    }
  };

  useEffect(() => {
    let elems = document.querySelectorAll(".dropdown-menuitems-min");
    M.Dropdown.init(elems, { coverTrigger: true });

    let elems1 = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems1, { accordion: true });

    let elems2 = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems2, {
      margin: 20,
      enterDelay: 0,
      inDuration: 0,
      outDuration: 0,
      exitDelay: 0,
    });
  });

  return (
    <>
      <div className="sidenav-div">
        <div
          className="sidenav-menu waves-effect waves-light"
          onClick={sidenavMenuonClick}
        >
          {menuCount === 0 ? (
            <Bars3BottomLeftIcon className="bars-menu fadeInMSN" />
          ) : (
            <Bars3Icon className="bars-menu fadeInMSN" />
          )}
        </div>
        <div className={classSC}>
          <div className="logo">
            <img
              src="img/logos/logo11.png"
              draggable="false"
              className={classLI}
              alt=""
            />
            <span className={textLogoClass}>{textLogo}</span>
            <div className="divider"></div>
          </div>

          {menuCount === 0 ? <MenuItemsMin /> : <MenuItemsMax />}
          <div></div>
        </div>
      </div>
    </>
  );
}

function MenuItemsMax() {
  return (
    <>
      <div className="menuItemsMax">
        <ul className="fadeInMenuItemsMax" style={{ marginBottom: 0 }}>
          <li>
            <span className="waves-effect">
              <HomeIcon className="svg-MenuItemsMax" /> Dashboard
            </span>
          </li>
          <li>
            <span className="waves-effect">
              <CreditCardIcon className="svg-MenuItemsMax" /> Remesas
            </span>
          </li>
          <li>
            <span className="waves-effect">
              <NewspaperIcon className="svg-MenuItemsMax" /> Visas
            </span>
          </li>
          <li>
            <span className="waves-effect">
              <PresentationChartLineIcon className="svg-MenuItemsMax" /> Ventas
            </span>
          </li>
          <li>
            <span className="waves-effect">
              <CubeIcon className="svg-MenuItemsMax" /> Paquetes
            </span>
          </li>
          <li>
            <span className="waves-effect">
              <SwatchIcon className="svg-MenuItemsMax" /> Pedidos
            </span>
          </li>
        </ul>

        <ul className="collapsible fadeInMenuItemsMax" style={{ marginTop: 0 }}>
          <li>
            <div className="collapsible-header">
              <BuildingStorefrontIcon
                className="svg-MenuItemsMax"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              Tienda
              <ChevronRightIcon
                className="grey-text text-darken-2"
                style={{ width: 15, marginLeft: 17 }}
              />
            </div>
            <div className="collapsible-body">
              <ul>
                <li>
                  <span className="waves-effect">Automotriz</span>
                </li>
                <li>
                  <span className="waves-effect">Confitura</span>
                </li>
                <li>
                  <span className="waves-effect">Electrodomésticos</span>
                </li>
                <li>
                  <span className="waves-effect">Taller</span>
                </li>
                <li>
                  <span className="waves-effect">Confitura</span>
                </li>
                <li>
                  <span className="waves-effect">Medicamento</span>
                </li>
                <li>
                  <span className="waves-effect">Ropa</span>
                </li>
                <li>
                  <span className="waves-effect">Zapato</span>
                </li>
                <li>
                  <span className="waves-effect">Tecnologia</span>
                </li>
                <li>
                  <span className="waves-effect">Micelaneas</span>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <UserCircleIcon
                className="svg-MenuItemsMax"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
              Usuarios
              <ChevronRightIcon
                className="grey-text text-darken-2"
                style={{ width: 15, marginLeft: 5 }}
              />
            </div>
            <div className="collapsible-body">
              <ul>
                <li>
                  <span className="waves-effect">
                    <UsersIcon className="svg-MenuItemsMinSubMenu" />
                    Admins
                  </span>
                </li>
                <li>
                  <span className="waves-effect">
                    <UserGroupIcon className="svg-MenuItemsMinSubMenu" />
                    Usuarios
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

function MenuItemsMin() {
  return (
    <>
      <div className="div-MenuItemsMin">
        <div
          className="tooltipped"
          data-position="right"
          data-tooltip="Dashboard"
        >
          <HomeIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay1" />
        </div>

        <div
          className="tooltipped"
          data-position="right"
          data-tooltip="Remesas"
        >
          <CreditCardIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay1" />
        </div>

        <div className="tooltipped" data-position="right" data-tooltip="Visas">
          <NewspaperIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay1" />
        </div>

        <div className="tooltipped" data-position="right" data-tooltip="Ventas">
          <PresentationChartLineIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay1" />
        </div>

        <div
          className="tooltipped"
          data-position="right"
          data-tooltip="Paquetes"
        >
          <CubeIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay1" />
        </div>

        <div
          className="tooltipped"
          data-position="right"
          data-tooltip="Pedidos"
        >
          <SwatchIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay1" />
        </div>

        <div className="sidenav-menuitems-min">
          <a
            className="dropdown-menuitems-min"
            href="#"
            data-target="dropdow-storeadministrator"
          >
            <BuildingStorefrontIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay" />
            <ChevronRightIcon
              className="grey-text text-darken-2"
              style={{ width: 15, position: "absolute", marginTop: 17 }}
            />
          </a>

          <div id="dropdow-storeadministrator" className="dropdown-content">
            <div className="menuitems-min" style={{ display: "flex" }}>
              <ul>
                <li>
                  <span>Automotriz</span>
                </li>
                <li>
                  <span>Confitura</span>
                </li>
                <li>
                  <span>Electrodomésticos</span>
                </li>
                <li>
                  <span>Taller</span>
                </li>
                <li>
                  <span>Confitura</span>
                </li>
              </ul>

              <ul>
                <li>
                  <span>Medicamento</span>
                </li>
                <li>
                  <span>Ropa</span>
                </li>
                <li>
                  <span>Zapato</span>
                </li>
                <li>
                  <span>Tecnologia</span>
                </li>
                <li>
                  <span>Micelaneas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sidenav-menuitems-min">
          <a
            className="dropdown-menuitems-min"
            href="#"
            data-target="dropdow-usuarios"
          >
            <UserCircleIcon className="svg-MenuItemsMin fadeInMenuItemsMin delay" />
            <ChevronRightIcon
              className="grey-text text-darken-2"
              style={{ width: 15, position: "absolute", marginTop: 16 }}
            />
          </a>

          <div id="dropdow-usuarios" className="dropdown-content">
            <ul className="menuitems-min" style={{ width: 260 }}>
              <li>
                <span>
                  <UsersIcon className="svg-MenuItemsMinSubMenu" />
                  Cuentas de Administrador
                </span>
              </li>
              <li>
                <span>
                  <UserGroupIcon className="svg-MenuItemsMinSubMenu" />
                  Cuentas de Usuarios
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
