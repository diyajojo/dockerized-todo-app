import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';



function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('/api/todos');
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };
  
    fetchTodos();
  }, []);
  
  // Add a new todo via backend
  const addTodo = async (text) => {
    try {
      const res = await fetch(`/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const { todo: newTodo } = await res.json();
        setTodos((prev) => [...prev, newTodo]);
      }
    } catch (err) {
      console.error('Add todo failed', err);
    }
  };

  // Delete a todo via backend
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error('Delete todo failed', err);
    }
  };

  // Edit a todo via backend
  const editTodo = async (id, newText) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });
      if (res.ok) {
        const { todo: updated } = await res.json();
        setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      }
    } catch (err) {
      console.error('Edit todo failed', err);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}

export default App; 