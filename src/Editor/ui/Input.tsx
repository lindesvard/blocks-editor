import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  height: 45px;
  min-height: 45px;
  padding: 0 15px;
  outline: 0;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 0 0 0 1px #51327d;
    border-color: #51327d;
  }
`;

export const Select = styled.select`
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  height: 45px;
  min-height: 45px;
  padding: 0 15px;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 10px;
  outline: 0;

  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 0 0 0 1px #51327d;
    border-color: #51327d;
  }
`;

type TextareaProps = {
  minRows?: number;
  maxRows?: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: any;
  placeholder?: string;
  border?: boolean;
};

const STextarea = styled.textarea<{
  padding: number;
  lineHeight: number;
  minHeight: number;
  border?: boolean;
}>`
  width: 100%;
  resize: none;
  border: ${(props) => (props.border ? 1 : 0)}px solid #c4c4c4;
  outline: none;
  padding: ${(props) => props.padding}px;
  line-height: ${(props) => props.lineHeight}px;
  min-height: ${(props) => props.minHeight}px;
  border-radius: 5px;

  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 0 0 0 ${(props) => (props.border ? 1 : 0)}px #51327d;
    border-color: #51327d;
  }
`;

export function Textarea({
  value = "",
  minRows = 3,
  maxRows = 20,
  onChange,
  placeholder,
  border,
}: TextareaProps) {
  const lineHeight = 20;
  const padding = 13;
  const [rows, setRows] = useState(minRows);
  const input = useRef<HTMLTextAreaElement>(null);

  const calculateRows = useCallback(() => {
    if (!input.current) {
      return minRows;
    }

    const previousRows = input.current.rows;
    input.current.rows = minRows;

    const currentRows = ~~(
      (input.current.scrollHeight - padding * 2) /
      lineHeight
    );

    if (currentRows === previousRows) {
      input.current.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      input.current.rows = maxRows;
      input.current.scrollTop = input.current.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  }, [minRows, maxRows]);

  const handleChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      }
      calculateRows();
    },
    [calculateRows, onChange]
  );

  useEffect(() => {
    calculateRows();
  }, [calculateRows, value]);

  return (
    <STextarea
      rows={rows}
      ref={input}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      // css
      lineHeight={lineHeight}
      padding={padding}
      minHeight={lineHeight * minRows}
      border={border}
    />
  );
}
