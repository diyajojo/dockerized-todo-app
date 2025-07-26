const express = require('express');

// No in-memory storage needed; frontend retains the source of truth

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Add new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const newTodo = { id: Date.now(), text: text.trim() };
  // Return the created todo without persisting
  res.status(201).json({ message: 'Todo added', todo: newTodo });
});

// Update existing todo
app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const updated = { id, text: text.trim() };
  res.json({ message: 'Todo updated', todo: updated });
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  // Simply acknowledge deletion; no server-side list to modify
  res.json({ message: 'Todo deleted', id });
});

// No static file serving needed for this test project

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 


