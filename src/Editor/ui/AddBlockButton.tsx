import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactElement;
  children: string;
};

const Button = styled.button`
  background: linear-gradient(45deg, #51327d, #7e86ff);
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

  &:hover {
    transform: translate3d(0, -2px, 0);
  }

  svg {
    margin-bottom: 5px;
  }
`;

function ButtonComponent({ icon, children, ...props }: ButtonProps) {
  return (
    <Button {...props}>
      {icon &&
        React.cloneElement(icon, {
          size: 25,
        })}
      {children}
    </Button>
  );
}

export default ButtonComponent;
