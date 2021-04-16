import styled from "styled-components";

type StructureProps = {
  alignItems?: string;
  justifyContent?: string;
  flex?: number | string;
  p?: number;
  m?: number;
};

export const Row = styled.div<StructureProps>`
  display: flex;
  flex-direction: row;
  flex: ${(props) => props.flex};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.p || 0}px;
  margin: ${(props) => props.m || 0}px;
`;

export const Column = styled.div<StructureProps>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.p || 0}px;
  margin: ${(props) => props.m || 0}px;
`;
