import React, { useState, useEffect, useRef } from "react";
import { Image as IconImage, WarningCircle } from "phosphor-react";
import { uploadMedia } from "./upload";
import styled from "styled-components";
import { Column, Row } from "Editor/ui/Structure";
import Text from "Editor/ui/Text";

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

const Progress = styled.div<{ progress: number }>`
  width: 100%;
  height: 5px;
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
  position: relative;

  .progress-bar {
    width: ${(props) => props.progress * 100}%;
    height: 5px;
    background: #595cd8;
    border-radius: 5px;
  }

  .progress-number {
    display: inline-flex;
    height: 20px;
    width: 40px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    top: -8px;
    left: max(calc(${(props) => props.progress * 100}% - 40px), 0px);
    font-size: 10px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding-bottom: 2px;
    border: 1px solid #000;
    opacity: ${(props) => (props.progress === 1 ? 0 : 1)};
    transition: all 0.2s ease-in-out;
  }
`;

const isBase64 = (str: string) => str.startsWith("data:");

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        console.log("file reading was not a string");
      }
    };
    reader.readAsDataURL(file);
  });
}

type MediaItemProps = {
  file: File;
  onCompleted?: (imageUrl: string) => void;
  last?: boolean;
};

const isFileFromInput = (file: any) => file.name;

export function PendingMediaItem({
  file,
  onCompleted,
  last = false,
}: MediaItemProps) {
  const [preview, setPreview] = useState<string>("");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const started = useRef(false);
  useEffect(() => {
    if (isFileFromInput(file) && started.current === false) {
      (async function () {
        started.current = true;
        uploadMedia(file, {
          onProgress: setProgress,
        })
          .then((imageUrl) => {
            onCompleted && onCompleted(imageUrl);
            setPreview(imageUrl);
          })
          .catch(() => {
            setError(true);
          });
        setPreview(await readFile(file));
      })();
    }
  }, [file, onCompleted]);

  // Design: https://dribbble.com/shots/13923816-Add-product-cards/attachments/5533851?mode=media
  return (
    <Item last={last}>
      <Row alignItems="center">
        <Column style={{ width: 50 }}>
          {preview ? (
            <Image src={preview} />
          ) : (
            <IconImage size={40} weight="duotone" />
          )}
        </Column>
        <Column mr="auto">
          <Text mb={3}>{file.name}</Text>
          {!isBase64(preview) && <Text size="small">{preview}</Text>}
          {error && <Text size="small">Failed upload your asset</Text>}
        </Column>
        {error && <WarningCircle size={20} color="#ff5757" weight="duotone" />}
      </Row>
      {progress !== null && (
        <Progress progress={progress}>
          <div className="progress-bar" />
          <div className="progress-number">{progress * 100}%</div>
        </Progress>
      )}
    </Item>
  );
}
