const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', todoSchema);

// model is like the table name inside the database  , here the name is Todo
// schema defines the structure of the data inside the table ,like colums and their types
// by convention for mongodb and nodejs we do this inside models folder 
// id the defualt column for every table in mongodb 
