import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import TreeViewData from "./../assets/data.json";

export interface ITreeViewDataItem {
  name: string;
  id: number;
  isFolder: boolean;
  children?: ITreeViewDataItem[];
}

export const FileExplorerContext = createContext<{
  treeViewData: ITreeViewDataItem[];
  addNode: (id: number, type: "file" | "directory") => void;
  deleteNode: (id: number, item: ITreeViewDataItem) => void;
}>({
  treeViewData: TreeViewData,
  addNode: () => {},
  deleteNode: () => {},
});

interface FileExplorerContextProviderProps {
  children: ReactNode;
}

export const FileExplorerContextProvider = ({
  children,
}: FileExplorerContextProviderProps) => {
  const [treeViewData, setTreeViewData] =
    useState<ITreeViewDataItem[]>(TreeViewData);

  const addNode = (id: number, type = "file") => {
    const fileName = prompt(`Enter the name of the ${type}.`);

    if (!fileName) {
      alert(`${type} name is mandatory.`);
      return;
    }

    const updateTree = (
      treeViewData: ITreeViewDataItem[]
    ): ITreeViewDataItem[] => {
      return treeViewData.map((treeItem) => {
        if (treeItem.id === id) {
          return {
            ...treeItem,
            children: [
              ...(treeItem.children || []),
              {
                id: new Date().getTime(),
                name: fileName,
                isFolder: type === "file" ? false : true,
              },
            ],
          };
        } else if (treeItem.children) {
          return {
            ...treeItem,
            children: updateTree(treeItem.children),
          };
        }
        return treeItem;
      });
    };
    setTreeViewData((prev) => updateTree(prev));
  };

  const deleteNode = (id: number, item: ITreeViewDataItem) => {
    // find the node using id
    // check if it is folder and has child,
    // if yes then show warning or prompt
    // recursive to find the id.

    let confirmation;
    if (item?.isFolder && item?.children && item?.children?.length > 0) {
      confirmation = confirm(
        "Are you sure you want to delete the Directory and its contents?"
      );
    } else if (!item?.isFolder) {
      confirmation = confirm("Are you sure you want to delete the File?");
    }
    if (!confirmation) {
      return;
    }

    const updateTree = (
      treeViewData: ITreeViewDataItem[]
    ): ITreeViewDataItem[] => {
      return treeViewData
        .filter((item) => item.id !== id) // Remove the node at the current level if it matches.
        .map((item) => {
          // If the item has children, recursively filter its children.
          if (item.children) {
            return {
              ...item,
              children: updateTree(item.children),
            };
          }
          return item;
        });
    };

    setTreeViewData((prev) => updateTree(prev));
  };

  return (
    <FileExplorerContext.Provider value={{ treeViewData, addNode, deleteNode }}>
      {children}
    </FileExplorerContext.Provider>
  );
};

export const useFileExplorerContext = () => {
  let context = useContext(FileExplorerContext);
  if (!context) throw new Error("Use inside Context");
  return context;
};
