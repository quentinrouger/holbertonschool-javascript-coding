const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const { totalStudents, fieldsCount } = await countStudents(process.argv[2]);
      res.write('This is the list of our students\n');
      res.write(`Number of students: ${totalStudents}\n`);
      for (const field in fieldsCount) {
        if (field !== 'field') {
          const fieldStudents = fieldsCount[field].length;
          const firstNameList = fieldsCount[field].join(', ');
          res.write(`Number of students in ${field}: ${fieldStudents}. List: ${firstNameList}\n`);
        }
      }
      res.end();
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.end();
  }
});

app.listen(1245);
module.exports = app;
