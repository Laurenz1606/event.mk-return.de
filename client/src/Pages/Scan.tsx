import { useFetch } from "@authfunctions/react";
import React, { useState } from "react";
import QRreader from "react-qr-reader";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const navigate = useNavigate();
  //get the fetcher
  const fetcher = useFetch(navigate);

  //get state var
  const [codeData, setCodeData] = useState("");

  //handle a scan
  const handleScan = async (data: string | null) => {
    //check if data is null
    if (!data) return;

    //fetch the backend
    let [err, body, navigator] = await fetcher(
      "/scanCode",
      "POST",
      {},
      {
        code: data,
      },
    );

    //ckeck for errors
    if (err || body === null) {
      return navigator();
    }

    //set code data accordin to body
    if ((body as { code: number }).code === 0) return navigate("/");
    if ((body as { code: number }).code === 1)
      return setCodeData("Du hast diesen Code bereits gefunden!");
    if ((body as { code: number }).code === 2)
      return setCodeData("Dieser QR-Code gehört nicht zu dem mk:return event!");
    if ((body as { code: number }).code === 4)
      return setCodeData("Dein Bnutzer existiert nicht!");
    if ((body as { code: number }).code === 5)
      return setCodeData(
        "Es gab einen Fehler mit dem Server, versuch es später nochmal!",
      );
  };

  const handleError = (err: string) => {
    setCodeData(
      "Es gab einen Fehler mit dem Server, versuch es später nochmal!",
    );
  };
  return (
    <div>
      <h1 className="text-4xl p-4 text-center text-white font-semibold">
        Scan Code
      </h1>
      <QRreader
        style={{ width: "100%" }}
        showViewFinder={false}
        onScan={handleScan}
        onError={handleError}
      />
      <p className="p-2 text-red-600">{codeData}</p>
    </div>
  );
}
