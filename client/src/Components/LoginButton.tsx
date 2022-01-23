import React, { MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function LoginButton({ onClick, text }: Props) {
  return (
    <button
      className="bg-gradient-to-br from-blue-700 to-blue-600 flex-1 rounded-full text-white font-semibold"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
