import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  ReactNode,
  SetStateAction,
} from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeHolder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: HTMLInputTypeAttribute;
};

export default function LoginInput({
  value,
  setValue,
  placeHolder,
  leftIcon,
  rightIcon,
  type,
}: Props) {
  return (
    <div className="mx-3 flex border-b-2 border-white space-x-2 items-center justify-center">
      {leftIcon ? <div className="w-6 h-6 mb-1">{leftIcon}</div> : ""}
      <input
        className="flex-1 bg-gray-blue text-white placeholder:text-white outline-none"
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeHolder}
        type={type ? type : "text"}
      />
      {rightIcon ? <div className="w-6 h-6 mb-1">{rightIcon}</div> : ""}
    </div>
  );
}
