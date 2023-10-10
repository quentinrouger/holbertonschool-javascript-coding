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

module.exports = countStudents;
