import React from "react";
import { LoggedInOnly, LoggedOutOnly, setConfig } from "@authfunctions/react";
import {
  BrowserRouter as Router,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NavBar from "./Layouts/NavBar";
import Scan from "./Pages/Scan";

setConfig(
  process.env.REACT_APP_API_URL || "",
  process.env.REACT_APP_AUTH_URL || "",
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="login"
          element={
            <LoggedOutOnly>
              <Login />
            </LoggedOutOnly>
          }
        />
        <Route
          path="register"
          element={
            <LoggedOutOnly>
              <Register />
            </LoggedOutOnly>
          }
        />
        <Route
          path="/"
          element={
            <LoggedInOnly>
              <>
                <Outlet />
                <NavBar />
              </>
            </LoggedInOnly>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<Scan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
