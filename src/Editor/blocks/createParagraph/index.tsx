import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Article } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";
import styled from "styled-components";
import { Row } from "Editor/ui/Structure";
import showdown from "showdown";
import { Textarea } from "Editor/ui/Input";

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
