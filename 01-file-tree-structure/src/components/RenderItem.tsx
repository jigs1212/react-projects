import { useState } from "react";
import TreeView from "./TreeView";
import DirectoryActions from "./DirectoryActions";

const RenderItem = ({ item }: { item: any }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="item">
      {item?.isFolder ? (
        <>
          <span
            className="pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? " - " : " + "}
          </span>
          <span>{item?.name}</span>{" "}
          <DirectoryActions id={item.id} item={item} type="directory" />
          {isExpanded && item?.children.length > 0 && (
            <TreeView tree={item?.children} />
          )}
        </>
      ) : (
        <>
          <span>{item.name}</span>
          <DirectoryActions id={item.id} item={item} type="file" />
        </>
      )}
    </div>
  );
};

export default RenderItem;
