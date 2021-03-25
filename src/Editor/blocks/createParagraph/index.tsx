import React, { memo } from "react";
import { Article } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";

const ID = "paragraph";

/**
 * TODO:
 * - Add options for serialize and parse data
 * - Fix real editor
 */

export function createParagraph(options?: BlockOptionsIn): BlockOptions {
  function BlockComponent({ onUpdate, data, contentId }: BlockProps) {
    return (
      <Block title="Text">
        <textarea
          style={{
            border: 0,
            outline: 0,
            width: "100%",
            resize: "none",
            padding: 20,
          }}
          value={String(data ?? "")}
          onChange={(event) => onUpdate(contentId, event.target.value)}
          placeholder="Hey, add some text!"
        />
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
  };
}
