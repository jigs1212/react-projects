import {
  ITreeViewDataItem,
  useFileExplorerContext,
} from "../contexts/FileExplorerContext";
import { MdDelete } from "react-icons/md";
import { FaFolderPlus } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";

const DirectoryActions = ({
  id,
  item,
  type,
}: {
  id: number;
  item: ITreeViewDataItem;
  type: "directory" | "file";
}) => {
  const { addNode, deleteNode } = useFileExplorerContext();
  return (
    <>
      {type === "directory" && (
        <>
          <VscNewFile className="pointer" onClick={() => addNode(id, "file")} />
          &nbsp;&nbsp;&nbsp;
          <FaFolderPlus
            className="pointer"
            onClick={() => addNode(id, "directory")}
          />
        </>
      )}
      &nbsp;&nbsp;&nbsp;
      <MdDelete className="pointer" onClick={() => deleteNode(id, item)} />
    </>
  );
};

export default DirectoryActions;
