import React from "react";
import "../index.css";

const EmptyTodoList = () => {
  return (
    <div className="empty-todo-list">
      <h2>No Todos Yet!</h2>
      <p>Your todos will appear here</p>
    </div>
  );
};

export default EmptyTodoList;
