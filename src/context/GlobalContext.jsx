/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

//*******************************************************************************/

export const GlobalContext = createContext();

//*******************************************************************************/

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobal deberia estar dentro de un provider.");
  return context;
};

//*******************************************************************************/

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const [idServicio, setIdServicio] = useState("");
  const [servicios, setServicios] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [idPrecio, setIdPrecio] = useState("");
  const [idHorario, setIdHorario] = useState("");
  const [idGaleria, setIdGaleria] = useState("");
  const [idCarrusel, setIdCarrusel] = useState("");
  const [idEquipo, setIdEquipo] = useState("");
  const [idTestimonios, setIdTestimonios] = useState("");
  const [idContacto, setIdContacto] = useState("");
  const [idPreguntas, setIdPreguntas] = useState("");
  const [idDiploma, setIdDiploma] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  /** Para reseterar los errores */
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  /** Verificar las cookies para establecer si hay un usuario autenticado */
  useEffect(() => {
    const checkLogin = async () => {
      const { token } = Cookies.get();

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);

        console.log(res);

        if (!res.data) {
          setIsAuthenticated(false);
          return;
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkLogin();
  }, []);

  /** Login */
  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      
      if(res){
        const { token } = Cookies.get();
        console.log(token);

      }

      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        setErrors(error.response.data.error);
      } else if (error.response.data.message) {
        setErrors(error.response.data.message);
      }
    }
  };

  /** Cerrar cesion */
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        singin,
        user,
        errors,
        isAuthenticated,
        logout,
        idServicio,
        setIdServicio,
        servicios,
        setServicios,
        idPrecio,
        setIdPrecio,
        idHorario,
        setIdHorario,
        idGaleria,
        setIdGaleria,
        idCarrusel,
        setIdCarrusel,
        idEquipo,
        setIdEquipo,
        idTestimonios,
        setIdTestimonios,
        idContacto,
        setIdContacto,
        idPreguntas,
        setIdPreguntas,
        idDiploma,
        setIdDiploma,
        miembros,
        setMiembros,
        idUsuario,
        setIdUsuario,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//*******************************************************************************/
