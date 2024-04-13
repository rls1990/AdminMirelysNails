import "./css/Loading.css";

export default function Loading() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="text-loading">Cargando...</h1>
      </div>
    </>
  );
}
