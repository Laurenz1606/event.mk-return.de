import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function StatContainer({ children }: Props) {
  return (
    <div className="aspect-square flex-1 bg-blue-600 shadow-xl shadow-blue-900 rounded-2xl p-3 flex justify-center items-center">
      {children}
    </div>
  );
}
