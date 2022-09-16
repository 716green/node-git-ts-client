import React, { useState, useEffect, FormEvent } from "react";
import TodoList from "./TodoList";
import axios from "axios";
import { ITodo } from "./types";
import TodoInput from "./TodoInput";

const App: React.FC = () => {
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/getTodos").then(({ data }) => {
      console.log(data);
      setTodos(data);
    });
  }, []);

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log({ currentTodo });
    await axios
      .post("http://localhost:3000/addTodo", {
        task: currentTodo,
      })
      .then((_res) => {
        setCurrentTodo("");
        axios
          .get("http://localhost:3000/getTodos")
          .then(({ data }) => {
            setTodos(data);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <h1 style={{ width: "100%", textAlign: "center" }}>Todo List</h1>
      <TodoInput
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
        addTodoHandler={addTodoHandler}
      />

      <h2>Pending Tasks</h2>
      <TodoList
        setTodos={setTodos}
        todos={todos.filter(({ status }) => status === "pending")}
      />

      <h2>Completed Tasks</h2>
      <TodoList
        setTodos={setTodos}
        todos={todos.filter(({ status }) => status !== "pending")}
      />
    </main>
  );
};

export default App;
