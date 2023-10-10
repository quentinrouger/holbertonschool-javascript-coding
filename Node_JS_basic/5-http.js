const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const studentsData = [];
      const fieldsCount = {};

      for (const line of lines) {
        const [firstName, lastName, age, field] = line.split(',');

        if (firstName && lastName && age && field) {
          studentsData.push(
            {
              firstName, lastName, age, field,
            },
          );

          if (!fieldsCount[field]) {
            fieldsCount[field] = [];
          }

          fieldsCount[field].push(firstName);
        }
      }

      const totalStudents = studentsData.length - 1;
      console.log(`Number of students: ${totalStudents}`);

      for (const field in fieldsCount) {
        if (field !== 'field') {
          const fieldStudents = fieldsCount[field].length;
          const firstNameList = fieldsCount[field].join(', ');
          console.log(`Number of students in ${field}: ${fieldStudents}. List: ${firstNameList}`);
        }
      }

      resolve(`Number of students: ${totalStudents}`);
    });
  });
}

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    try {
      const studentsCount = await countStudents(process.argv[2]);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${studentsCount}`);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${error.message}\n`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

app.listen(1245);

module.exports = app;
