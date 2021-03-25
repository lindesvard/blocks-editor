import React, { useState } from "react";
import Editor, { createParagraph, createMedia, useEditorState } from "./Editor";

const blocks = [createParagraph({}), createMedia({})];

export default function App() {
  const [state, setState] = useEditorState([
    {
      contentId: "123",
      blockId: "paragraph",
      data: "Hello world",
    },
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
      <button onClick={() => setCounter((prev) => prev + 1)}>
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
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Editor blocks={blocks} state={state} setState={setState} />
    </div>
  );
}
