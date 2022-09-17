import React, { useState, useEffect, useContext, FormEvent } from "react";
import axios from "axios";
import TodoList from "@/components/TodoList";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GlobalContext } from "@/context";
import { ITodo } from "@/helpers";

const App: React.FC = () => {
  const { todos, setTodos, apiUrl } = useContext(GlobalContext);
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  // TODO - setup
  const [todosUpdating, setTodosUpdating] = useState<boolean>(false);

  const setInitialTodos = async (): Promise<void> => {
    const { data } = await axios.get(`${apiUrl}/getTodos`);
    setTodos(data);
  };

  useEffect(() => {
    setLoading(true);
    (async () => await setInitialTodos())().then(() => setLoading(false));
  }, []);

  const addTodoHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await axios
      .post(`${apiUrl}/addTodo`, {
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
      {loading ? (
        <section style={{ height: "100vh", width: "100vw", display: "flex" }}>
          <LoadingSpinner />
        </section>
      ) : (
        <>
          <TodoInput
            title="Todo List"
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
            addTodoHandler={addTodoHandler}
          />

          <TodoList
            title="Pending Tasks"
            todos={todos.filter((todo: ITodo) => todo.status === "pending")}
            loading={todosUpdating}
          />

          <TodoList
            title="Completed Tasks"
            todos={todos.filter((todo: ITodo) => todo.status === "completed")}
            loading={todosUpdating}
          />
        </>
      )}
    </main>
  );
};

export default App;
