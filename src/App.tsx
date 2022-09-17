import React, { useState, useEffect, useContext, FormEvent } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { GlobalContext } from "./context";
import { ITodo } from "./helpers";

const App: React.FC = () => {
  const { todos, setTodos } = useContext(GlobalContext);
  const [currentTodo, setCurrentTodo] = useState<string>("");

  const setInitialTodos = async () => {
    const response = await axios.get("http://localhost:3000/getTodos");
    setTodos(response.data);
  };

  useEffect(() => {
    (async () => await setInitialTodos())();
  }, []);

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/addTodo", {
        task: currentTodo,
      })
      .then(({ data }) => {
        setCurrentTodo("");
        setTodos(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <TodoInput
        title="Todo List"
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
        addTodoHandler={addTodoHandler}
      />

      <TodoList
        title="Pending Tasks"
        todos={todos.filter((todo: ITodo) => todo.status === "pending")}
      />

      <TodoList
        title="Completed Tasks"
        todos={todos.filter((todo: ITodo) => todo.status === "completed")}
      />
    </main>
  );
};

export default App;
