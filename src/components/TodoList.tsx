import React, { useContext } from "react";
import axios from "axios";
import { ITodo, buttonStyle, listStyle, taskStyle } from "../helpers";
import { GlobalContext } from "../context";

interface IProps {
  todos: ITodo[];
  title: string;
}

const TodoList: React.FC<IProps> = ({ todos, title }) => {
  const { setTodos } = useContext(GlobalContext);
  const completeTaskHandler = (todo: ITodo) => {
    const updatedTodo = { ...todo, status: "completed" };

    axios
      .put("http://localhost:3000/updateTodo", updatedTodo)
      .then(({ data }) => setTodos(data))
      .catch((err: Error) => console.error(err));
  };

  const deleteTodoHandler = (id: number) => {
    axios
      .delete(`http://localhost:3000/deleteTodo/${id}`)
      .then(({ data }) => setTodos(data))
      .catch((err: Error) => console.error(err));
  };

  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {todos.map((todo: ITodo) => (
          <li style={listStyle} key={todo.id}>
            <span style={taskStyle}>{todo.task}</span>
            {todo.status === "pending" ? (
              <button
                onClick={() => completeTaskHandler(todo)}
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
    </section>
  );
};

export default TodoList;
