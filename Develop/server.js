const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package

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

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./develop/db/db.json', 'utf8')) || [];
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID using uuid
  
  const notes = JSON.parse(fs.readFileSync('./develop/db/db.json', 'utf8')) || [];
  notes.push(newNote);
  
  fs.writeFileSync('./develop/db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  let notes = JSON.parse(fs.readFileSync('./develop/db/db.json', 'utf8')) || [];
  notes = notes.filter(note => note.id !== noteId);

  fs.writeFileSync('./develop/db/db.json', JSON.stringify(notes));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

