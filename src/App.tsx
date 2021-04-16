import React, { useState } from "react";
import Editor, { useEditorState } from "./Editor";

import { createParagraph } from "Editor/blocks/createParagraph";
import { createEmbed } from "Editor/blocks/createEmbed";
import { createMedia } from "Editor/blocks/createMedia";
import { createRanking } from "Editor/blocks/createRanking";
import { createEditor } from "Editor/blocks/createEditor";

const blocks = [
  createEditor(),
  createParagraph({
    // bold: true,
    // preview: true,
    // italic: true,
    // heading: true,
    // list: true,
    // advanced: true
  }),
  createMedia({
    // async upload(file: File): Promise<string> => {}
    // async remove(url: string) Promise<boolean> => {}
    // async library(url: string) Promise<Array<string>> => {}
  }),
  createEmbed({}),
  createRanking({
    button: {
      label: "Add player ranking",
    },
    // StarIcon: ({ color, size, weight }) => <img src={} />
    fields: [
      {
        id: "player",
        placeholder: "Player",
        type: "select",
        async options() {
          return new Promise((resolve) => {
            setTimeout(
              () =>
                resolve([
                  { key: "1", value: "Haris Radetinac" },
                  { key: "2", value: "Magnus Eriksson" },
                ]),
              2000
            );
          });
        },
      },
      {
        id: "description",
        placeholder: "Description",
        type: "textarea",
      },
    ],
  }),
];

export default function App() {
  const [state, setState] = useEditorState([
    // {
    //   contentId: "123",
    //   blockId: "paragraph",
    //   data: "Hello world",
    // },
    // {
    //   blockId: "media",
    //   contentId: "dmujrc3td",
    //   data: [
    //     "http://localhost:3000/uploads/media-1618603150060-437531441.png",
    //     "http://localhost:3000/uploads/media-1618603153530-435359799.jpeg",
    //   ],
    // },
    // {
    //   blockId: "embed",
    //   contentId: "pq3aryzac",
    //   data: "https://twitter.com/mansomheterOve/status/1382917959925043201",
    // },
    // {
    //   blockId: "playerCard",
    //   contentId: "zxhmbjgwq",
    //   data: {
    //     star: 4,
    //     fields: {
    //       name: "a",
    //       description: "b",
    //       player: "",
    //     },
    //   },
    // },
  ]);
  const [counter, setCounter] = useState(0);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      {/* <button onClick={() => setCounter((prev) => prev + 1)}>
        Counter: {counter}
      </button>
      <button
        onClick={() =>
          setState((prev) => {
            prev[0].data = "Yalla";
            return [...prev];
          })
        }
      >
        Update random
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Editor blocks={blocks} state={state} setState={setState} />
    </div>
  );
}
