import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITodo } from "./types";
import { buttonStyle, listStyle, taskStyle } from "./styles";

interface IProps {
  todos: ITodo[];
  setTodos: any; //React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList: React.FC<IProps> = ({ todos, setTodos }) => {
  const changeStatusHandler = (todo: ITodo) => {
    axios
      .put("http://localhost:3000/updateTodo", {
        ...todo,
        status: "completed",
      })
      .then((_res) => {
        axios
          .get("http://localhost:3000/getTodos")
          .then(({ data }) => setTodos(data));
      });
  };

  const deleteTodoHandler = (id: number) => {
    axios.delete(`http://localhost:3000/deleteTodo/${id}`).then((_res) => {
      axios
        .get("http://localhost:3000/getTodos")
        .then(({ data }) => setTodos(data));
    });
  };

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li style={listStyle} key={todo.id}>
          <span style={taskStyle}>{todo.task}</span>
          {todo.status === "pending" ? (
            <button
              onClick={() => changeStatusHandler(todo)}
              style={buttonStyle}
            >
              ✅
            </button>
          ) : (
            <button
              onClick={() => deleteTodoHandler(todo.id)}
              style={buttonStyle}
            >
              ❌
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
