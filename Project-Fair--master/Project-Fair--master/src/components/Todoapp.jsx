import React, { useState } from 'react';
// import Todo from '../components/Todo';

const Todoapp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: 'Complete React project',
      status: 'pending',
      createdDate: new Date(),
      updatedDate: new Date()
    },
    {
      id: 2,
      description: 'Learn Redux',
      status: 'completed',
      createdDate: new Date(),
      updatedDate: new Date()
    }
  ]);

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending', updatedDate: new Date() }
        : todo
    );
    setTodos(updatedTodos);
  };

  const pendingTodos = todos.filter(todo => todo.status === 'pending');
  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <div>
      <h1>Todo App</h1>
      <h2>Pending Todos</h2>
      {pendingTodos.map(todo => (
        <Todo key={todo.id} todo={todo} onToggle={toggleTodo} />
      ))}
      <h2>Completed Todos</h2>
      {completedTodos.map(todo => (
        <Todo key={todo.id} todo={todo} onToggle={toggleTodo} />
      ))}
    </div>
  );
};

export default Todoapp;
