import React from "react";
import { Image as IconImage, CaretCircleDown, Eraser } from "phosphor-react";
import styled from "styled-components";
import { Column, Row } from "Editor/ui/Structure";
import Text from "Editor/ui/Text";
import { ButtonTransparent } from "Editor/ui/ButtonTransparent";

const Item = styled.div<{ last?: boolean }>`
  border-bottom: ${(props) => (props.last ? 0 : 1)}px solid #c4c4c4;
  padding: 10px 10px 20px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
`;

const Action = styled(ButtonTransparent)`
  margin-left: 5px;
  width: 20px;
  height: 20px;
`;

const getNameFromUrl = (str: string) => {
  const splits = str.split("/");
  return splits[splits.length - 1];
};

type MediaItemProps = {
  url: string;
  onRemove?: () => void;
  last?: boolean;
};

export function MediaItem({ url, onRemove, last = false }: MediaItemProps) {
  return (
    <Item last={last}>
      <Row>
        <Row alignItems="center">
          <Column style={{ width: 50 }}>
            {url ? (
              <Image src={url} />
            ) : (
              <IconImage size={40} weight="duotone" />
            )}
          </Column>
          <Column>
            <Text style={{ marginBottom: 3 }}>{getNameFromUrl(url)}</Text>
            <Text size="small">{url}</Text>
          </Column>
        </Row>
        <Row flex={1} />
        <Action onClick={onRemove}>
          <Eraser size={18} />
        </Action>
        <Action onClick={() => alert("Toggle drop down")}>
          <CaretCircleDown size={18} />
        </Action>
      </Row>
    </Item>
  );
}
