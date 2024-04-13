/* eslint-disable react/prop-types */

import "./css/Avatar.css";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";

export default function Avatar({ foto = "/img/avatar.jpg" }) {
  return (
    <>
      <span className="span-avatar">
        <div className="content-image">
          {foto ? (
            <img className="avatar-img" draggable="false" src={foto}></img>
          ) : (
            <UserCircleIcon style={{ height: 35, width: 35 }} />
          )}
        </div>
        <span className="connect-signal pulse-ripple"></span>
      </span>
    </>
  );
}
