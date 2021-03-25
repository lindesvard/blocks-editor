import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactElement;
  children: string;
};

const Button = styled.button`
  background: #000;
  border: 0;
  border-radius: 5px;
  line-height: 1;
  height: 70px;
  width: 100%;
  max-width: 150px;
  padding: 0 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

function ButtonComponent({ icon, children, ...props }: ButtonProps) {
  return (
    <Button {...props}>
      {icon &&
        React.cloneElement(icon, {
          size: 30,
        })}
      {children}
    </Button>
  );
}

export default ButtonComponent;
