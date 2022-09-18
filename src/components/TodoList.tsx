import React, { useContext } from "react";
import axios from "axios";
import { ITodo, buttonStyle, listStyle, taskStyle } from "@/helpers";
import { GlobalContext } from "@/context";
import LoadingSpinner from "@/components/LoadingSpinner";

interface IProps {
  todos: ITodo[];
  title: string;
  loading: boolean;
  setLoading: any;
}

const TodoList: React.FC<IProps> = ({ todos, title, loading, setLoading }) => {
  const { setTodos, apiUrl } = useContext(GlobalContext);
  const completeTaskHandler = (todo: ITodo) => {
    setLoading(true);
    const updatedTodo = { ...todo, status: "completed" };

    axios
      .put(`${apiUrl}/updateTodo`, updatedTodo)
      .then(({ data }) => setTodos(data))
      .finally(() => setLoading(false))
      .catch((err: Error) => console.error(err));
  };

  const deleteTodoHandler = (id: number) => {
    setLoading(true);
    axios
      .delete(`${apiUrl}/deleteTodo/${id}`)
      .then(({ data }) => setTodos(data))
      .finally(() => setLoading(false))
      .catch((err: Error) => console.error(err));
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <h2>{title}</h2>
        {loading && (
          <LoadingSpinner
            additionalStyles={{ width: "10px", height: "10px" }}
          />
        )}
      </div>
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
