const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Todo = require('./models/Todo');


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

app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const newTodo = await Todo.create({ text: text.trim() });
    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text.trim() },
      { new: true }
    );
    res.json({ message: 'Todo updated', todo: updated });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 


