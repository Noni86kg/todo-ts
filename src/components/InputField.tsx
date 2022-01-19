import React from "react";
import "./InputField.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form
      className="input-todo"
      onSubmit={(e) => {
        handleAdd(e);
      }}
    >
      <button type="submit" className="input_submit"></button>
      <input
        type="text"
        className="inputField"
        placeholder="Create a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </form>
  );
};

export default InputField;
