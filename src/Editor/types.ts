export type BlockOptionsIn = {
  button?: {
    label?: string;
    Icon?: React.ElementType;
  };
};

export type Data = unknown;

export type BlockOptions = {
  id: string;
  name: string;
  button: {
    label: string;
    Icon: React.ElementType;
  };
  Block: React.ElementType<BlockProps>;
};

export type BlockProps = {
  contentId: string;
  onUpdate: (contentId: string, data: Data) => void;
  data: Data;
};

export type EditorProps = {
  blocks: Array<BlockOptions>;
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
};

export type EditorState = Array<{
  contentId: string;
  blockId: string;
  data: Data;
}>;
