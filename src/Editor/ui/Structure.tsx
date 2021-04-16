import styled from "styled-components";

type StructureProps = {
  alignItems?: string;
  justifyContent?: string;
  flex?: number | string;
  p?: number;
  m?: number;
  mr?: number | string;
  ml?: number | string;
};

export const Row = styled.div<StructureProps>`
  display: flex;
  flex-direction: row;
  flex: ${(props) => props.flex};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.p || 0}px;
  margin: ${(props) => props.m || 0}px;
  margin-right: ${(props) => px(props.mr)};
  margin-left: ${(props) => px(props.ml)};
`;

const px = (str?: string | number) =>
  typeof str === "number" ? `${str}px` : str;

export const Column = styled.div<StructureProps>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.p || 0}px;
  margin: ${(props) => props.m || 0}px;
  margin-right: ${(props) => px(props.mr)};
  margin-left: ${(props) => px(props.ml)};
`;
