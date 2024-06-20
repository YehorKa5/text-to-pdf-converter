import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonClasses: string;
  children: ReactNode;
  onClick: () => void;
};

const Button = ({
  children,
  buttonClasses,
  onClick,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={`text-white font-bold py-2 px-4 rounded ${buttonClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
