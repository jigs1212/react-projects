import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export interface ITodoList {
  name: string;
  id: number;
  parentId: number | null;
  children?: ITodoList[];
  status: boolean;
}
interface ITodoListContext {
  todoList: ITodoList[];
  addToList: ({
    name,
    parentId,
  }: {
    name: string;
    parentId?: number | null;
  }) => void;
  removeFromList: ({ id }: { id: number }) => void;
  markDone: ({ id }: { id: number }) => void;
}

export const TodoListContext = createContext<ITodoListContext>({
  todoList: [] as ITodoList[],
  addToList: () => {},
  removeFromList: () => {},
  markDone: () => {},
});

export const TodoListContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [errors, setErrors] = useState("");

  const addToList = ({
    name,
    parentId = null,
  }: {
    name: string;
    parentId?: number | null;
  }) => {
    if (!name) {
      setErrors("Name is mandatory.");
      return;
    }

    const updateList = (list: ITodoList[]): ITodoList[] => {
      const newItem: ITodoList = {
        id: Date.now(),
        name,
        parentId,
        status: false,
        children: [],
      };

      if (!parentId) {
        return [...list, newItem];
      }

      const updateChildren = (items: ITodoList[]): ITodoList[] =>
        items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newItem],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateChildren(item.children),
            };
          }
          return item;
        });

      return updateChildren(list);
    };

    setTodoList((prev) => updateList(prev));
  };

  const removeFromList = ({ id }: { id: number }) => {
    const removeItem = (items: ITodoList[]): ITodoList[] => {
      return items.reduce((acc: ITodoList[], item) => {
        if (item.id === id) {
          return acc;
        }
        if (item.children && item.children.length > 0) {
          return [...acc, { ...item, children: removeItem(item.children) }];
        }
        return [...acc, item];
      }, []);
    };

    setTodoList((prevList) => removeItem(prevList));
  };

  const markDone = ({ id }: { id: number }) => {
    const toggleStatus = (items: ITodoList[]): ITodoList[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, status: !item.status };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: toggleStatus(item.children) };
        }
        return item;
      });
    };

    setTodoList((prevList) => toggleStatus(prevList));
  };

  return (
    <TodoListContext.Provider
      value={{ todoList, addToList, removeFromList, markDone }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoListContext = () => {
  let context = useContext(TodoListContext);
  if (!context) {
    throw new Error("Context should be used inside the provider");
  }
  return context;
};
