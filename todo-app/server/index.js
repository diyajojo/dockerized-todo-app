const express = require('express');

// In-memory todo storage (will reset when the server restarts)
let todos = [];

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 



// Add new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const newTodo = { id: Date.now(), text: text.trim() };
  todos.push(newTodo);
  res.status(201).json({ message: 'Todo added', todo: newTodo });
});

// Update existing todo
app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { text } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }
  todo.text = text.trim();
  res.json({ message: 'Todo updated', todo });
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos.splice(index, 1);
  res.json({ message: 'Todo deleted', id });
});

// No static file serving needed for this test project

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 


