/* eslint-disable react-hooks/exhaustive-deps */
import "./css/Login.css";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import { useForm } from "react-hook-form";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const { singin, isAuthenticated, errors: loginErrors } = useGlobal();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    singin(values);
  });
  return (
    <>
      <div className="div-login fadeIn">
        <img src="/img/zoom.jpg" draggable={false} className="img-login" />

        <div className="card-login z-depth-1 hoverable">
          <h3 className="title-card-login">Login</h3>

          {loginErrors.length > 0 && (
            <div
              className="red darken-4 white-text"
              style={{ padding: 5, margin: 10 }}
            >
              {loginErrors.map((err, i) => (
                <div key={i}>{err}</div>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div
              className="row s12"
              style={{ paddingRight: 30, paddingLeft: 30, paddingTop: 5 }}
            >
              <InputText
                id="nombre"
                register={register}
                required={true}
                icon={UserIcon}
              />

              <InputPassword
                id="password"
                register={register}
                required={true}
              />

              <button
                className="btn waves-effect waves-light btn-large"
                style={{
                  width: "100%",
                  marginBottom: 20,
                  marginTop: 40,
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
