import React, { memo } from "react";
import { BlockOptions } from "./types";
import AddBlockButton from "./ui/AddBlockButton";

type ActionsProps = {
  blocks: Array<BlockOptions>;
  addContent: (block: BlockOptions) => void;
};

function Actions({ blocks, addContent }: ActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "-5px",
      }}
    >
      {blocks.map((block) => {
        const {
          button: { label, Icon },
        } = block;
        return (
          <AddBlockButton
            icon={<Icon color="#fff" />}
            onClick={() => addContent(block)}
          >
            {label}
          </AddBlockButton>
        );
      })}
    </div>
  );
}

export default memo(Actions);
