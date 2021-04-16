export type BlockOptionsIn = {
  button?: {
    label?: string;
    Icon?: React.ElementType;
  };
};

export type Data = any;

export type BlockOptions<T = Data> = {
  id: string;
  name: string;
  button: {
    label: string;
    Icon: React.ElementType;
  };
  Block: React.ElementType<BlockProps<T>>;
  initialData: T;
};

export type BlockProps<T = Data> = {
  contentId: string;
  onUpdate: (contentId: string, data: React.SetStateAction<T>) => void;
  data: T;
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
