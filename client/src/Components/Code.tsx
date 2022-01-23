import { QrcodeIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  date: number;
  idx: number;
};

function formatDate(date: number) {
  return new Date(date).toLocaleDateString();
}

export default function Code({ date, idx }: Props) {
  const scanned = date !== -1;
  const scannedAt = scanned ? formatDate(date) : "-";
  return (
    <div>
      <Link to="/scan">
        <div className="flex bg-gray-blue shadow-2xl rounded-xl p-3 space-x-4">
          <div className="shadow-xl rounded-xl p-2 text-white">
            <QrcodeIcon
              className={
                "w-16 h-16 " +
                (scanned
                  ? idx < 8
                    ? "text-blue-600"
                    : "text-green-500"
                  : "text-white")
              }
            />
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">#Code {idx + 1}</h3>
            <p className="font-medium">
              <span className="text-gray-400">Status: </span>
              <span
                className={
                  scanned
                    ? idx < 8
                      ? "text-blue-500"
                      : "text-green-500"
                    : "text-gray-500"
                }
              >
                {scanned ? "Gefunden!" : "Nicht Gefunden!"}
              </span>
            </p>
            <p className="font-medium">
              <span className="text-gray-400">Datum: </span>
              <span
                className={
                  scanned
                    ? idx < 8
                      ? "text-blue-500"
                      : "text-green-500"
                    : "text-gray-500"
                }
              >
                {scannedAt}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
