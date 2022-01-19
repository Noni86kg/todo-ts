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
  data: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
}> = ({ todo, todos, setTodos, data, setData, filter, index }) => {
  const handleDone = (id: number) => {
    setData(
      data.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    if (filter === "All") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setData(data.filter((todo) => todo.id !== id));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          className="single-todo"
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
