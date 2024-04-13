/* eslint-disable react/prop-types */
import { useState } from "react";

import "./css/ImgZoomy.css";

const img = {
  url: "/img/medium1.jpg",
  alt: "Imagen de prueba para lupa",
  width: 600,
  height: 500,
};

const initImg = (url, alt, width, height) => {
  if (url) img.url = url;
  if (alt) img.alt = alt;
  if (width) img.width = width;
  if (height) img.height = height;
};

export default function ImgZoomy({ url, alt, width, height }) {
  const [lupaStyle, setLupaStyle] = useState({
    backgroundImage: `url(${img.url})`,
  });

  initImg(url, alt, width, height);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPersentage = (offsetX / offsetWidth) * 100;
    const yPersentage = (offsetY / offsetHeight) * 100;

    setLupaStyle((prev) => ({
      ...prev,
      display: "block",
      top: `${offsetY - 100}px`,
      left: `${offsetX - 100}px`,
      backgroundPosition: `${xPersentage}% ${yPersentage}%`,
    }));
  };

  const handleMouseLeave = () => {
    setLupaStyle((prev) => ({ ...prev, display: "none" }));
  };

  return (
    <>
      <div
        className="row hoverable z-depth-2"
        style={{ width: img.width, height: img.height }}
      >
        <div className="contaimer-zoom">
          <img
            src={img.url}
            alt={img.alt}
            width={img.width}
            height={img.height}
            draggable={false}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          <div className="lupa" style={lupaStyle}></div>
        </div>
      </div>
    </>
  );
}
