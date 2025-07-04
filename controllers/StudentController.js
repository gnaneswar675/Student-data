const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    await Student.create({ name, email, age });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving student');
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    let studentHTML = `
      <html>
        <head><title>Students</title></head>
        <body>
          <h2>All Students</h2>
          <ul>
            ${students.map(s => `<li>${s.name} - ${s.email} - ${s.age}</li>`).join('')}
          </ul>
          <br><a href="/">Back</a>
        </body>
      </html>
    `;
    res.send(studentHTML);
  } catch (err) {
    res.status(500).send('Error fetching students');
  }
};
