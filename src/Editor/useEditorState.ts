import { useState } from "react";
import { EditorState } from "./types";

export function useEditorState(state?: EditorState) {
  return useState<EditorState>(state ?? []);
}
