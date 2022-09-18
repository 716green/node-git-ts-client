import React from "react";

interface IProps {
  currentTodo: string;
  setCurrentTodo: any;
  addTodoHandler: any;
  title: string;
}

const TodoInput: React.FC<IProps> = ({
  currentTodo,
  setCurrentTodo,
  addTodoHandler,
  title,
}) => {
  return (
    <section>
      <h1 style={{ width: "100%", textAlign: "center" }}>{title}</h1>
      <form style={{ display: "flex" }}>
        <input
          onChange={(e) => setCurrentTodo(e.target.value)}
          type="text"
          style={{ width: "100%" }}
          value={currentTodo}
        />
        <button onClick={addTodoHandler}>+</button>
      </form>
    </section>
  );
};

export default TodoInput;
