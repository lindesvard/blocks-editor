import React from "react";
import styled from "styled-components";

type ButtonVariant = "primary";
type ButtonSize = "small" | "default";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: null | React.ReactElement;
  children?: null | React.ReactNode;
  size?: ButtonSize;
};

const Button = styled.button<{
  variant?: ButtonVariant;
  icon: boolean;
  size: number;
}>`
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
      default:
        return "linear-gradient(31deg, #000, #4e4f71);";
    }
  }};
  border: 0;
  border-radius: 5px;
  line-height: 1;
  height: ${(props) => props.size}px;
  width: ${(props) => (props.icon ? `${props.size}px` : "auto")};
  padding: 0 ${(props) => (props.icon ? "0" : `${props.size * 0.3}px`)};
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg  {
    font-size: 20px;
    margin-right: ${(props) => (props.icon ? "0" : "10px")};
  }
`;

function getSize(size: ButtonSize): number {
  switch (size) {
    case "small":
      return 25;
    case "default":
      return 45;
  }
}

function getIconSize(size: ButtonSize): number {
  switch (size) {
    case "small":
      return 14;
    case "default":
      return 20;
  }
}

function ButtonComponent({
  variant,
  icon = null,
  children,
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      icon={!!icon && !children}
      size={getSize(size)}
      {...props}
    >
      {icon &&
        React.cloneElement(icon, {
          size: getIconSize(size),
        })}
      {children}
    </Button>
  );
}

export default ButtonComponent;
