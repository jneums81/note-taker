const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Your routes will go here
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
