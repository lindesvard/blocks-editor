import { Eraser, ArrowDown, ArrowUp, ArrowsOutCardinal } from "phosphor-react";
import React, { memo } from "react";
import Button from "./ui/Button";
import styled from "styled-components";
export { createParagraph } from "./blocks/createParagraph";

const Wrapper = styled.div`
  position: relative;

  & div.actions {
    position: absolute;
    top: -10px;
    right: 0;
    display: flex;
    flex-direction: row;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    padding-left: 10px;

    button {
      margin-left: 5px;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: translate3d(0, -2px, 0);
      }
    }
  }

  &:hover div.actions {
    /* transform: translate3d(0, 0, 0); */
    opacity: 1;
    transition: all 0.2s ease-in-out 0.1s;
  }
`;

type BlockActionsProps = {
  contentId: string;
  onRemove: (contentId: string) => void;
  onMoveUp: (contentId: string) => void;
  onMoveDown: (contentId: string) => void;
  children: React.ReactNode;
};

function BlockActions({
  children,
  onRemove,
  onMoveUp,
  onMoveDown,
  contentId,
}: BlockActionsProps) {
  return (
    <Wrapper>
      <div className="actions">
        <Button
          size={"small"}
          icon={<Eraser />}
          onClick={() => onRemove(contentId)}
        />
        <Button
          size={"small"}
          icon={<ArrowUp />}
          onClick={() => onMoveUp(contentId)}
        />
        <Button
          size={"small"}
          icon={<ArrowDown />}
          onClick={() => onMoveDown(contentId)}
        />
      </div>
      {children}
    </Wrapper>
  );
}

export default memo(BlockActions);
