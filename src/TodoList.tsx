import React from "react";
import "./App.css";

const TodoList: React.FC = () => {
  return (
    <div className="container">
      <h3>Your Todos</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default TodoList;
