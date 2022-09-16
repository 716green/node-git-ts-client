import React, { FormEvent, useState } from "react";
import TodoList from "./TodoList";
import axios from "axios";
import "./App.css";

// Type annotations are optional, but recommended, FC stands for Function Component

const App: React.FC = () => {
  const [currentTodo, setCurrentTodo] = useState<string>("");

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log({ currentTodo });
    await axios
      .post("http://localhost:3000/addTodo", {
        todo: currentTodo,
      })
      .then(({ data }) => {
        console.log(data.message);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <h1>Todo List</h1>

      <form action="" style={{ display: "flex" }}>
        <input
          onChange={(e) => setCurrentTodo(e.target.value)}
          type="text"
          placeholder="Add a todo"
          style={{ width: "100%" }}
        />
        <button onClick={addTodoHandler} type="submit">
          +
        </button>
      </form>

      <TodoList />
    </main>
  );
};

export default App;
