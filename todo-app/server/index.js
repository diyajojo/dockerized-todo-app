const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/tododb';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));




const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Add new todo
app.post('/api/todos', (req, res) => {
  console.log('Received request to add todo',req.body);
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
  console.log('Received request to update todo',req.body);
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
  console.log('Received request to delete todo',req.params.id);
  const id = Number(req.params.id);
  // Simply acknowledge deletion; no server-side list to modify
  res.json({ message: 'Todo deleted', id });
});

// No static file serving needed for this test project

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 


