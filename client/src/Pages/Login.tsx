import { useLogin } from "@authfunctions/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginScreens from "../Layouts/LoginScreens";

export const LoginCodes: {
  [key: number]: string
} = {
  5: "Es gab ein Fehler mit dem Server!",
  21: "Es fehlt die E-Mail oder das Passwort!",
  22: "Der Nutzer existiert nicht oder das Passwort ist Falsch!",
  23: "Der Nutzer existiert nicht oder das Passwort ist Falsch!"
}

export default function Login() {
  //login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //login hook
  const loginFunction = useLogin(useNavigate());

  //login callback
  const onLogin = async () => {
    //log the user in
    const [err, code, navigator] = await loginFunction(email, password);

    //check for errors
    if (err) {
      return setError(LoginCodes[code]);
    }

    //navigate to the Dashboard
    return navigator();
  };
  return (
    <LoginScreens
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onClick={onLogin}
      headerMessage={error}
      footerTo="/register"
      footerLink="Hier Registrieren!"
      footerText="Noch keinen Account?"
      buttonText="Anmelden!"
    />
  );
}
