import { useLogin, useRegister } from "@authfunctions/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginScreens from "../Layouts/LoginScreens";
import { LoginCodes } from "./Login";

const RegisterCodes: {
  [key: number]: string;
} = {
  ...LoginCodes,
  11: LoginCodes[21],
  12: "Die eingegebene E-Mail hat ein falschen Format!",
  13: "Das Passwort ist zu schwach (mind. 1 Großbuchstabe, mind. 1 Kleinbuchstabe, mind. 1 Zahl und mind. 8 Zeichen)!",
  14: "Die eingegebene E-Mail wird bereits benutzt!",
};

export default function Register() {
  //register states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //register hook
  const registerFunction = useRegister(useNavigate());

  //register hook
  const loginFunction = useLogin(useNavigate());

  //register callback
  const onRegister = async () => {
    //log the user in
    const [err, code] = await registerFunction(
      email,
      "FAKE_USERNAME",
      password,
    );

    //check for errors
    if (err) {
      return setError(RegisterCodes[code]);
    }

    //log the user in
    const [err2, code2, navigator2] = await loginFunction(email, password);

    //check for errors
    if (err2) {
      return setError(RegisterCodes[code2]);
    }

    //navigate the user
    return navigator2();
  };
  return (
    <LoginScreens
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onClick={onRegister}
      headerMessage={error}
      footerTo="/login"
      footerLink="Hier Anmelden!"
      footerText="Schon einen Account?"
      buttonText="Registrieren!"
    />
  );
}
