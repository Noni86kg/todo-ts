import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import "./TodoList.css";
import TodoBottom from "./TodoBottom";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  filter: string;
  setFilter: (e: string) => void;
  filterData: (e: string) => void;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,

  filter,
  setFilter,
  filterData,
}) => {
  let itemsLeftLenght: number = 0;
  {
    todos?.map((item) => {
      if (!item.isDone) {
        itemsLeftLenght += 1;
      }
    });
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isDone));
    if (filter === "Completed") setFilter("All");
  };

  return (
    <>
      <div className="todos">
        <Droppable droppableId="TodosList">
          {(provided) => (
            <div
              className="todo-droppable"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                  filter={filter}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <TodoBottom
          clearCompleted={clearCompleted}
          itemsLeftLenght={itemsLeftLenght}
          filter={filter}
          filterData={filterData}
        />
      </div>
      <p className="drag-text">Drag and drop to reorder list</p>
    </>
  );
};

export default TodoList;
