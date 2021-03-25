import React, { useCallback, memo } from "react";
import { BlockOptions, EditorProps } from "./types";
import Actions from "./Actions";
import BlockActions from "./BlockActions";
import { swap } from "./utils/swap";
import { id } from "./utils/id";
import "./styles.css";
export { createParagraph } from "./blocks/createParagraph";
export { createMedia } from "./blocks/createMedia";
export { useEditorState } from "./useEditorState";

function Editor({ blocks, state, setState }: EditorProps) {
  const addContent = useCallback(
    (block: BlockOptions) => {
      setState((prev) => [
        ...prev,
        {
          blockId: block.id,
          contentId: id(),
          data: null,
        },
      ]);
    },
    [setState]
  );

  const handleUpdate = useCallback(
    (contentId: string, data: any) => {
      setState((prev) =>
        prev.map((map) => {
          if (map.contentId === contentId) {
            return {
              ...map,
              data,
            };
          }

          return map;
        })
      );
    },
    [setState]
  );

  const handleRemove = useCallback(
    (contentId: string) => {
      setState((prev) =>
        prev.filter((map) => {
          if (map.contentId === contentId) {
            return false;
          }

          return true;
        })
      );
    },
    [setState]
  );

  const handleMoveUp = useCallback(
    (contentId) => {
      setState((prev) => {
        const index = prev.findIndex((map) => map.contentId === contentId);
        if (index === 0) {
          return prev;
        }
        return swap(index, index - 1, prev);
      });
    },
    [setState]
  );

  const handleMoveDown = useCallback(
    (contentId) => {
      setState((prev) => {
        const index = prev.findIndex((map) => map.contentId === contentId);
        if (index === prev.length - 1) {
          return prev;
        }
        return swap(index, index + 1, prev);
      });
    },
    [setState]
  );

  return (
    <div className="editor">
      {state.map(({ blockId, contentId, data }) => {
        const block = blocks.find((block) => block.id === blockId);
        if (!block) {
          return null;
        }

        const { Block } = block;

        return (
          <BlockActions
            onRemove={handleRemove}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            contentId={contentId}
            key={contentId}
          >
            <Block onUpdate={handleUpdate} contentId={contentId} data={data} />
          </BlockActions>
        );
      })}
      <Actions blocks={blocks} addContent={addContent} />
    </div>
  );
}

export default memo(Editor);
