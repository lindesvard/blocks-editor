import React from "react";
import styled from "styled-components";

type BlockProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  padding?: number;
};

const Block = styled.div<{ padding?: number }>`
  border: 1px dashed rgb(158, 158, 158);
  margin-bottom: 20px;
  padding: ${(props) => props.padding}px;
  background: #fff;
  width: 100%;

  &:focus-within {
    border-color: blue;
  }
`;

function BlockComponent({ children, padding, title, ...props }: BlockProps) {
  return (
    <>
      {title}
      <Block padding={padding} {...props}>
        {children}
      </Block>
    </>
  );
}

export default BlockComponent;
