import styled from "styled-components";

export const ButtonTransparent = styled.button`
  border: 0;
  background: none;
  outline: 0;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translate3d(0, -2px, 0);
  }
`;
