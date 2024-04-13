/* eslint-disable react/prop-types */
import "./css/Badge.css";

export default function Badge({ value = 0, iconDefault, iconAler, effect }) {
  const Icon = value > 0 ? iconAler : iconDefault;

  return (
    <>
      <span
        className={
          effect && value > 0
            ? `div-badge content-badge ${effect}`
            : "div-badge content-badge "
        }
      >
        <Icon
          className="grey-text text-lighten-2 fadeIn"
          style={{
            height: 30,
            width: 30,
            display: "inline-block",
          }}
        />
        <span className={value > 0 ? "badge1 pulse" : "badge1"}>
          {value ? value : 0}
        </span>
      </span>
    </>
  );
}
