import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LockClosedIcon,
  QrcodeIcon,
  UserIcon,
} from "@heroicons/react/outline";
// @ts-ignore
import Wave from "../Assets/wave_dark.svg";
import LoginInput from "../Components/LoginInput";
import LoginButton from "../Components/LoginButton";
import { Link } from "react-router-dom";

export interface Error {
  err: boolean;
  code: number | null;
}

type Props = {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  footerText: string;
  footerLink: string;
  footerTo: string;
  buttonText: string;
  headerMessage: string;
};

export default function LoginScreens({
  email,
  password,
  setEmail,
  setPassword,
  onClick,
  footerText,
  footerLink,
  footerTo,
  buttonText,
  headerMessage,
}: Props) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="full">
      <div className="grid grid-rows-6 bg-gradient-to-br from-blue-700 to-blue-500 full">
        <div className="grid grid-rows-3 row-span-3">
          <div className="flex flex-col space-y-5 items-center justify-center row-span-2">
            <QrcodeIcon className="w-32 h-32 text-white" />
            <h2 className="text-white font-semibold text-3xl">{buttonText}</h2>
          </div>
          <p className="flex justify-center text-white pt-10 text-sm text-center">
            {headerMessage}
          </p>
        </div>
        <div className="row-span-3 grid grid-rows-5">
          <div className="flex">
            <img src={Wave} alt="" className="w-full" />
          </div>
          <div className="bg-gray-blue row-span-2">
            <div className="grid grid-rows-5 h-full">
              <div className=""></div>
              <div className="row-span-2">
                <LoginInput
                  leftIcon={<UserIcon className="text-white" />}
                  placeHolder="E-Mail"
                  setValue={setEmail}
                  value={email}
                />
              </div>
              <div className="row-span-2">
                <LoginInput
                  leftIcon={<LockClosedIcon className="text-white" />}
                  placeHolder="Passwort"
                  setValue={setPassword}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? (
                      <EyeIcon
                        className="text-white"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    ) : (
                      <EyeOffIcon
                        className="text-white"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-blue flex p-3">
            <LoginButton onClick={onClick} text={buttonText} />
          </div>
          <div className="bg-gray-blue flex justify-center items-center flex-col">
            <div className="flex space-x-2 mb-1">
              <p className="text-white">{footerText}</p>
              <Link className="text-[#00CC99]" to={footerTo}>
                {footerLink}
              </Link>
            </div>
            <div className="flex space-x-2 text-sm">
              <p className="text-white">Fragen zum Datenschutz?</p>
              <Link className="text-[#00CC99]" to="/datenschutz">
                Siehe Hier!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
