import { useState } from "react";
import "./App.css";
import {
  TodoListContextProvider,
  useTodoListContext,
} from "./contexts/TodoListContext";
import TodoList from "./components/TodoList";

function AppContent() {
  const [todoName, setTodoName] = useState("");
  const { addToList, todoList } = useTodoListContext();

  const submitForm = () => {
    addToList({ name: todoName });
    setTodoName("");
  };

  return (
    <div className="main-container">
      <h1>Todo List</h1>

      <input
        className="todo-input-name"
        type="text"
        name="todo-name"
        value={todoName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoName((_prev) => e.target.value)
        }
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            submitForm();
          }
        }}
      />
      <TodoList list={todoList} />
    </div>
  );
}

function App() {
  return (
    <TodoListContextProvider>
      <AppContent />
    </TodoListContextProvider>
  );
}

export default App;
