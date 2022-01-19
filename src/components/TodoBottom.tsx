import React from "react";

interface props {
  clearCompleted: () => void;
  filter: string;
  filterData: (e: string) => void;
  itemsLeftLenght: number;
}

const TodoBottom: React.FC<props> = ({
  clearCompleted,
  filterData,
  itemsLeftLenght,
  filter,
}) => {
  return (
    <div className="todos-bottom todo-bottom-full">
      <div className="left-todos-bottom">
        <p>{itemsLeftLenght} items left</p>
      </div>
      <div className="center-todos-bottom">
        <button
          className={filter === "All" ? "filter-btn active" : "filter-btn"}
          value="All"
          onClick={() => filterData("All")}
        >
          All
        </button>
        <button
          className={filter === "Active" ? "filter-btn active" : "filter-btn"}
          onClick={() => filterData("Active")}
        >
          Active
        </button>
        <button
          className={
            filter === "Completed" ? "filter-btn active" : "filter-btn"
          }
          onClick={() => filterData("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="right-todos-bottom">
        <button className="clear-btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoBottom;
