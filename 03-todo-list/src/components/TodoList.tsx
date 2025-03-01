import { ITodoList, useTodoListContext } from "../contexts/TodoListContext";
import "./TodoList.css";

const TodoList = ({ list }: { list: ITodoList[] }) => {
  const { markDone, removeFromList } = useTodoListContext();
  return (
    list?.length > 0 && (
      <div className="list-container">
        {list.map((todoItem) => (
          <div
            key={todoItem.id}
            className={`todo-item ${todoItem.status ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={todoItem.status}
              id={todoItem.id.toString()}
              onChange={() => markDone({ id: todoItem.id })}
            />
            <label htmlFor={todoItem.id.toString()}>{todoItem.name}</label>
            <button
              className="remove-button"
              onClick={() => removeFromList({ id: todoItem.id })}
            >
              Remove
            </button>
            {todoItem.children && todoItem.children.length > 0 && (
              <div className="nested-list">
                <TodoList list={todoItem.children} />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
};

export default TodoList;
