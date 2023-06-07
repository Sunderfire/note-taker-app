const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(db)
);

app.post('/api/notes', (req, res) => {
  //const title = req.body.title;
  //const text = req.body.text;
  const {title, text} = req.body;
  const newNote = {title, text};
  db.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db))
  res.json(db);
})
  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
