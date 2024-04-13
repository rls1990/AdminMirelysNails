/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();
//*******************************************************************************/
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deberia estar dentro de un provider.");
  return context;
};
//*******************************************************************************/
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registerUser, setRegisterUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      setRegisterUser(res.data);
      //setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        setErrors(error.response.data.error);
      } else if (error.response.data.message) {
        setErrors(error.response.data.message);
      }
    }
  };

  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
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

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        singup,
        singin,
        logout,
        user,
        registerUser,
        setRegisterUser,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        errors,
        setErrors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//*******************************************************************************/
