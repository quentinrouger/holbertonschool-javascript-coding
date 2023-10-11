const express = require('express');

const app = express();
const port = 1245;

// Import the countStudents function from 3-read_file_async.js
const countStudents = require('./3-read_file_async');

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('This is the list of our students\n');
  try {
    // Pass the name of the database as an argument to countStudents
    const data = await countStudents('database.csv');
    // Join the array elements into a single string
    res.end(data.join('\n'));
  } catch (error) {
    res.end(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
