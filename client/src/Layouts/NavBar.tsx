import { useLogout } from "@authfunctions/react";
import { CameraIcon, HomeIcon, LogoutIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavIcon from "../Components/NavIcon";

export default function NavBar() {
  //use logout hook
  const logoutFunction = useLogout(useNavigate());

  async function onLogout() {
    //logout the user
    const [, , navigator] = await logoutFunction();

    //navigate
    return navigator();
  }
  return (
    <>
      <div className="mt-20" />
      <div className="flex w-full p-2 justify-between items-center px-6 bg-gray-blue fixed bottom-0 shadow-ld rounded-t-3xl text-white">
        <NavIcon to="/">
          <HomeIcon className="w-10 h-10" />
        </NavIcon>
        <NavIcon to="/scan">
          <CameraIcon className="w-12 h-12" />
        </NavIcon>
        <NavIcon to="#" onClick={onLogout}>
          <LogoutIcon className="w-10 h-10 text-red-600" />
        </NavIcon>
      </div>
    </>
  );
}
