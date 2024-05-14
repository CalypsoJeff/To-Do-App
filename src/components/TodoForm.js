import React, { useState } from "react";

const TodoForm = ({ addTodo, setErrorMessage }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      addTodo(value);
      setValue("");
    } else {
      setErrorMessage("Please enter a valid task", "red");
    }
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        {" "}
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
