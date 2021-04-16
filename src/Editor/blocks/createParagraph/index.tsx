import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Article } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";
import styled from "styled-components";
import { Row } from "Editor/ui/Structure";
import showdown from "showdown";

const converter = new showdown.Converter();

const Preview = styled.div`
  padding: 20px;
`;

const Modes = styled(Row).attrs({
  alignItems: "center",
})`
  padding: 0 5px;
`;

const ModeButton = styled.button<{ active?: boolean }>`
  background: none;
  border: 0;
  outline: 0;
  padding: 5px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  font-size: 12px;
  cursor: pointer;
`;
const ModeSeparator = styled.div`
  display: inline-block;
  margin: 0 5px;
  height: 12px;
  width: 1px;
  background: #c4c4c4;
  top: 1px;
  position: relative;
`;

type TextareaProps = {
  onChange: (event: any) => void;
  value: any;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
};

function Textarea({
  value = "",
  minRows = 3,
  maxRows = 20,
  onChange,
}: TextareaProps) {
  const lineHeight = 20;
  const padding = 20;
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
      onChange(event);
      calculateRows();
    },
    [calculateRows, onChange]
  );

  useEffect(() => {
    calculateRows();
  }, [calculateRows, value]);

  return (
    <textarea
      rows={rows}
      ref={input}
      placeholder={"Enter your text here..."}
      className={"textarea"}
      onChange={handleChange}
      style={{
        lineHeight: `${lineHeight}px`,
        minHeight: lineHeight * minRows,
        width: "100%",
        resize: "none",
        border: 0,
        outline: "none",
        padding,
      }}
      value={value}
    />
  );
}

const ID = "paragraph";

/**
 * TODO:
 * - Add options for serialize and parse data
 * - Fix real editor
 */

export function createParagraph(options?: BlockOptionsIn): BlockOptions {
  function BlockComponent({ onUpdate, data, contentId }: BlockProps) {
    const [mode, setMode] = useState(0);
    const text = String(data ?? "");
    const append = (str: string) => onUpdate(contentId, text + str);

    return (
      <Block title="Text">
        {mode === 0 ? (
          <Textarea
            value={text}
            onChange={(event) => onUpdate(contentId, event.target.value)}
            placeholder="Hey, add some text!"
          />
        ) : (
          <Preview
            className="block-editior__preview"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(text),
            }}
          />
        )}
        <Modes>
          <ModeButton active={mode === 0} onClick={() => setMode(0)}>
            Edit
          </ModeButton>
          <ModeSeparator />
          <ModeButton active={mode === 1} onClick={() => setMode(1)}>
            Preview
          </ModeButton>
          <div style={{ flex: 1 }} />
          <ModeButton onClick={() => append("## Heading\n\n")}>
            Heading
          </ModeButton>
          <ModeSeparator />
          <ModeButton onClick={() => append(" [text](link)")}>Link</ModeButton>
          <ModeSeparator />
          <ModeButton onClick={() => append(" **bold**")}>Bold</ModeButton>
          <ModeSeparator />
          <ModeButton onClick={() => append(" _italic_")}>Italic</ModeButton>
          <ModeSeparator />
          <ModeButton onClick={() => append("- List 1\n- List 2\n- List 3\n")}>
            List
          </ModeButton>
        </Modes>
      </Block>
    );
  }

  return {
    id: ID,
    name: "Paragraph",
    button: {
      label: options?.button?.label ?? "Add paragraph",
      Icon: options?.button?.Icon ?? Article,
    },
    Block: memo(BlockComponent),
    initialData: "",
  };
}
