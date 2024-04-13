/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "materialize-css/dist/css/materialize.min.css";
import "./pages/css/Animated.css";
import "./components/css/InputText.css";
import "./components/css/InputPassword.css";
import { GlobalProvider } from "./context/GlobalContext";
import "./App.css";
import M from "materialize-css";
import { useEffect } from "react";

// import Admin from "./pages/Admin";
// import Home from "./pages/Home";
// import { AuthProvider } from "./context/AuthContext";
import Prueba from "./pages/Prueba";
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </GlobalProvider>

      {/* <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/prueba" element={<Prueba />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider> */}
    </>
  );
}

export default App;
