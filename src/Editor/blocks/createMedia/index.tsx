import React, { memo, useCallback } from "react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import { useDropzone } from "react-dropzone";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import Block from "../../ui/Block";
import { UploadSimple } from "phosphor-react";
import { MediaItem } from "./MediaItem";
import { PendingMediaItem } from "./PendingMediaItem";
const ID = "media";

export function createMedia(options?: BlockOptionsIn): BlockOptions {
  function BlockComponent({ onUpdate, data, contentId }: BlockProps) {
    const [pending, setPending] = React.useState<File[]>([]);
    const onDrop = useCallback(
      async (acceptedFiles) => {
        setPending((prev: any) => [...prev, ...acceptedFiles]);
      },
      [setPending]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <Block padding={10} title="Media">
        <div>
          {pending.map((file, index: number) => (
            <PendingMediaItem
              key={file.name}
              file={file}
              onCompleted={(url) => {
                onUpdate(contentId, (prev: string[]) => [...prev, url]);
                setPending((prev) => prev.filter((f) => f !== file));
              }}
              last={pending.length - 1 === index}
            />
          ))}
          {data.map((url: string, index: number) => (
            <MediaItem
              key={url}
              url={url}
              onRemove={() => {
                onUpdate(contentId, (prev: string[]) =>
                  prev.filter((u) => u !== url)
                );
              }}
              last={data.length - 1 === index}
            />
          ))}
        </div>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #c4c4c4",
            padding: 10,
            borderRadius: 10,
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text weight={600}>Drag 'n' drop some pending here</Text>
          ) : (
            <Button icon={<UploadSimple />}>Drag or click to upload</Button>
          )}
        </div>
      </Block>
    );
  }

  return {
    id: ID,
    name: "Media",
    button: {
      label: options?.button?.label ?? "Add media",
      Icon: options?.button?.Icon ?? UploadSimple,
    },
    Block: memo(BlockComponent),
    initialData: [],
  };
}
