import React, { memo, Suspense } from "react";
import { Article } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";

const Editor = React.lazy(() => import("rich-markdown-editor"));

const ID = "editor";

export function createEditor(options?: BlockOptionsIn): BlockOptions {
  function BlockComponent({ onUpdate, data, contentId }: BlockProps) {
    return (
      <Block title="Editor" padding={40}>
        <Suspense fallback={<p>Loading...</p>}>
          <Editor
            defaultValue={data}
            onChange={(value) => onUpdate(contentId, value)}
          />
        </Suspense>
      </Block>
    );
  }

  return {
    id: ID,
    name: "Editor",
    button: {
      label: options?.button?.label ?? "Add editor",
      Icon: options?.button?.Icon ?? Article,
    },
    Block: memo(BlockComponent),
    initialData: "",
  };
}
