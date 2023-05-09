import { Button } from "@tremor/react";
import type { ButtonHTMLAttributes } from "react";

export const BlueButton = ({
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button {...props} disabled={disabled} color={disabled ? "gray" : "blue"}>
      {children}
    </Button>
  );
};
