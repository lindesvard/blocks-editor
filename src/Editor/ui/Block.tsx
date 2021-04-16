import React from "react";
import styled from "styled-components";

type BlockProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  padding?: number;
};

const Block = styled.div<{ padding?: number }>`
  margin-bottom: 20px;
  padding: ${(props) => props.padding || 0}px;
  background: #fff;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 9px 20px 0px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  &:focus-within {
    box-shadow: 0px 9px 20px 0px rgba(0, 0, 0, 0.1), 0 0 0 1px #51327d;
  }
`;

const BlockTitle = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
`;

function BlockComponent({ children, padding, title, ...props }: BlockProps) {
  return (
    <>
      <BlockTitle>{title}</BlockTitle>
      <Block padding={padding} {...props}>
        {children}
      </Block>
    </>
  );
}

export default BlockComponent;
