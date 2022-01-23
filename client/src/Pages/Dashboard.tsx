import { useFetch } from "@authfunctions/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Code from "../Components/Code";
import InstaButton from "../Components/InstaButton";
import StatContainer from "../Components/StatContainer";

export default function Dashboard() {
  const mapperWrapper = new Array(12).fill(null);
  const [codes, setCodes] = useState<number[]>([]);
  const [today, setToday] = useState(0);
  const fetcher = useFetch(useNavigate());

  useEffect(() => {
    let cToday = 0;
    codes.forEach((code) => {
      if (
        new Date().toLocaleDateString() === new Date(code).toLocaleDateString()
      )
        cToday++;
    });
    setToday(cToday);
  }, [codes]);

  useEffect(() => {
    (async () => {
      //get codes
      const [err, body, fn] = await fetcher("/getCodes", "GET", {}, {});

      if (err) {
        return fn();
      }

      setCodes((body as { codes: number[] }).codes);
    })();
  }, [fetcher]);

  return (
    <div className="min-h-screen bg-gray-blue">
      <h1 className="text-4xl p-4 text-center text-white font-semibold">
        Statistiken
      </h1>
      <div className="flex space-x-6 p-4 mb-5">
        <StatContainer>
          <div className="flex justify-center items-center flex-col text-white text-xl font-semibold">
            <h4>{codes.length.toString() + " / 12 Codes"}</h4>
            <h4>
              {(codes.length - 8 < 0 ? 0 : codes.length - 8).toString() +
                " / 4 Tickets"}
            </h4>
          </div>
        </StatContainer>
        <StatContainer>
          <div className="flex justify-center items-center flex-col text-white">
            <h2 className="text-xl font-semibold">Heute gescannt</h2>
            <h4 className="text-3xl font-bold">{today} Codes</h4>
          </div>
        </StatContainer>
      </div>
      <h1 className="text-4xl p-4 text-center text-white font-semibold mb-4">
        Deine Codes
      </h1>
      <div className="flex flex-col space-y-8 px-4 pb-4">
        {mapperWrapper.map((_, idx) => {
          return (
            <div className="space-y-8" key={idx}>
              {idx === 8 || idx === 0 ? (
                <div className="flex items-center">
                  <div className="border-b border-gray-300 flex-1" />
                  <p className="mx-2 text-gray-300 font-semibold">
                    {idx === 0 ? "Pflichtcodes" : "Tickets"}
                  </p>
                  <div className="border-b border-gray-300 flex-1" />
                </div>
              ) : (
                ""
              )}
              {idx === 5 ? <InstaButton /> : ""}
              <Code date={codes[idx] ? codes[idx] : -1} idx={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
