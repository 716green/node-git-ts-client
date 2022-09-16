import React from "react";

interface IProps {
  currentTodo: string;
  setCurrentTodo: any;
  addTodoHandler: any;
}

const TodoInput: React.FC<IProps> = ({
  currentTodo,
  setCurrentTodo,
  addTodoHandler,
}) => {
  return (
    <form style={{ display: "flex" }}>
      <input
        onChange={(e) => setCurrentTodo(e.target.value)}
        type="text"
        style={{ width: "100%" }}
        value={currentTodo}
      />
      <button onClick={addTodoHandler}>+</button>
    </form>
  );
};

export default TodoInput;
