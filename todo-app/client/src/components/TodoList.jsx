import React, { useState } from 'react';

function TodoList({ todos, deleteTodo, editTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState('');

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setNewText(currentText);
  };

  const handleEdit = (id) => {
    if (newText.trim() === '') return;
    editTodo(id, newText.trim());
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button onClick={() => handleEdit(todo.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList; 