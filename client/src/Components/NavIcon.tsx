import React, { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  to: string;
  children: ReactNode;
};

export default function NavIcon({ onClick, to, children }: Props) {
  return (
    <div onClick={onClick}>
      <Link to={to}>{children}</Link>
    </div>
  );
}
