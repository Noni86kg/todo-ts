import React, { useEffect, useState } from "react";
import { Todo } from "../models/models";
import "./TodoList.css";
import close from "../assets/images/icon-cross.svg";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
}> = ({ todo, todos, setTodos, filter, index }) => {
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          className={
            (filter === "Completed" && !todo.isDone) ||
            (filter === "Active" && todo.isDone)
              ? "display-none"
              : "single-todo"
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <button
            className="input-single-todo"
            onClick={() => handleDone(todo.id)}
          >
            {todo.isDone && <div className="input-circle"></div>}
          </button>
          <p className={todo.isDone ? "complate-p" : ""}>{todo.todo}</p>
          <button className="delite-btn" onClick={() => handleDelete(todo.id)}>
            <img src={close} alt="close" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
