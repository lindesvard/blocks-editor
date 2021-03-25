import React, { memo, useCallback } from "react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import { useDropzone } from "react-dropzone";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import Block from "../../ui/Block";
import { UploadSimple, Image, CaretCircleDown, Eraser } from "phosphor-react";

const ID = "media";

/**
 * TODO:
 * 1. Select files
 * 2. Get thumbnails for all image
 * 3. For each file -> Upload -> Return url
 */

// Upload url
// Delete url

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export function createMedia(options?: BlockOptionsIn): BlockOptions {
  function BlockComponent({ onUpdate, data, contentId }: BlockProps) {
    const onDrop = useCallback(
      async (acceptedFiles) => {
        // 1. Get preview
        // 2.
        const previews = await Promise.all(acceptedFiles.map(readFile));
        onUpdate(contentId, [...((data || []) as []), ...previews]);
      },
      [data, onUpdate, contentId]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });
    // Design: https://dribbble.com/shots/13923816-Add-product-cards/attachments/5533851?mode=media
    return (
      <Block padding={20} title="Media">
        <div>
          {((data || []) as []).map((src) => (
            <div
              style={{
                marginBottom: 10,
                borderRadius: 5,
                background: "#272885",
                color: "#fff",
                padding: 20,
                lineHeight: 1,
                backgroundImage: `linear-gradient(0deg, #272885, rgba(39, 40 ,133, 0.5)),url(${src})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image />
                <Text>Filename pefwepf mpwf.jpg</Text>
                <div style={{ flex: 1 }} />
                <Eraser />
                <CaretCircleDown />
              </div>
              <div
                style={{
                  width: "100%",
                  height: 5,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    width: "68%",
                    height: 5,
                    backgroundColor: "#595cd8",
                    borderRadius: 5,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text weight={600}>Drag 'n' drop some files here</Text>
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
  };
}
