/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";

export default function ImageLoader({ url, style }) {
  const [res, setRes] = useState();

  useEffect(() => {
    fetch(url).then((res) => {
      setRes(res);
    });
  }, []);

  return (
    <>
      <LazyLoad
        width={"100%"}
        debounce={false}
        offsetVertical={100}
        threshold={0.95}
      >
        <img style={style} src={res && res.url ? res.url : ""} />
      </LazyLoad>
    </>
  );
}
