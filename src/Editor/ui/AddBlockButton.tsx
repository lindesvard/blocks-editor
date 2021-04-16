import React, { useState } from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactElement;
  children: string;
};

const Button = styled.button`
  background: linear-gradient(31deg, #000, #4e4f71);
  border: 0;
  border-radius: 10px;
  line-height: 1;
  height: 80px;
  width: 100%;
  max-width: 180px;
  padding: 0 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin: 5px;
  font-size: 12px;

  &:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0px 9px 20px 0px rgba(0, 0, 0, 0.1);
  }

  svg {
    margin-bottom: 8px;
    transition: all 0.2s ease-in-out;
  }
`;

function ButtonComponent({ icon, children, ...props }: ButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon &&
        React.cloneElement(icon, {
          size: 25,
          weight: hover ? "duotone" : "light",
        })}
      {children}
    </Button>
  );
}

export default ButtonComponent;
