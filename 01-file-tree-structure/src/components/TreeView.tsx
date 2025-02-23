import { ITreeViewDataItem } from "../contexts/FileExplorerContext";
import RenderItem from "./RenderItem";

const TreeView = ({ tree }: { tree: ITreeViewDataItem[] }) => {
  return (
    <div className="container">
      {tree?.map((item: any, index: number) => (
        <RenderItem key={index} item={item} />
      ))}
    </div>
  );
};

export default TreeView;
