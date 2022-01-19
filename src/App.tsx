import React, { useState } from "react";
import { Todo } from "./models/models";
import Header from "./components/Header";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import EmptyTodoList from "./components/EmptyTodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [data, setData] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const filterData = (value: string) => {
    setFilter(value);
    if (value === "All") {
      setTodos(data);
    } else if (value === "Active") {
      setTodos(data.filter((todo) => !todo.isDone));
    } else if (value === "Completed") {
      setTodos(data.filter((todo) => todo.isDone));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setData([...data, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
      if (filter === "Completed") {
        return;
      } else {
        setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

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
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <Header setTodos={setTodos} data={data} setData={setData} />
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        {data.length > 0 ? (
          <TodoList
            todos={todos}
            setTodos={setTodos}
            data={data}
            setData={setData}
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
