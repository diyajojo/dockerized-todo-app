// server.js
const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Express server!');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
