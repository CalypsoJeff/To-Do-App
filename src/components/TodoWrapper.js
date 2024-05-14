import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
uuidv4();

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');


  
  const addTodo = (todo) => {
    const newTodoToUppercase = todo.toLowerCase();
    const isTaskExist = todos.some(item=>item.task.toLowerCase() === newTodoToUppercase)

    if(isTaskExist){
      setErrorMessage('Task already exists');
    }else{
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    setErrorMessage('');
  };
}

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setErrorMessage('');
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setErrorMessage('');
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setErrorMessage('');
    const editTodoToLowercase = task.toLowerCase();
      const taskExist = todos.some(item=>item.task.toLowerCase() === editTodoToLowercase & item.id !== id)

      if(taskExist){
        setErrorMessage('Task already exist!')
      }else{
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
    setErrorMessage('')
  };
}

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo}  setErrorMessage={setErrorMessage} />
      {todos.map((todo, index) =>(
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} setErrorMessage={setErrorMessage}/>) : (  
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo} />
          )))}
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  ) 
};

export default TodoWrapper;
