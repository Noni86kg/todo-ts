import React, { useState } from "react";
import { Todo } from "./models/models";
import Header from "./components/Header";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import EmptyTodoList from "./components/EmptyTodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const filterData = (value: string) => {
    setFilter(value);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let active = todos;
    const [reorderedItem] = active.splice(result.source.index, 1);
    active.splice(destination.index, 0, reorderedItem);
    setTodos(active);

    localStorage.setItem("todos", JSON.stringify(active));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <Header setTodos={setTodos} todos={todos} />
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            setTodos={setTodos}
            filter={filter}
            setFilter={setFilter}
            filterData={filterData}
          />
        ) : (
          <EmptyTodoList />
        )}
      </div>
    </DragDropContext>
  );
};

export default App;
