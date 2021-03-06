const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');


//body parser
app.use(express.json());


// loads the front end
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname,'index.html'))
});

//Read students
app.get('/api/students', (req,res,next)=>{
  db.readStudents()
  .then(response => res.send(response))
})

//Read schools
app.get('/api/schools', (req,res,next)=>{
  db.readSchools()
  .then(response => res.send(response))
})

//Create Schools
app.post('/api/schools', (req,res,next)=>{
  db.createSchool(req.body)
  .then(response => res.send(response))
})

//Create Students
app.post('/api/students', (req,res,next)=>{
  db.createStudent(req.body)
  .then(response => res.send(response))
})

//Delete Student
app.delete('/api/students/:id', (req,res,next)=>{
  db.deleteStudent(req.params.id)
  .then(response => res.send(response))
});

//Delete School
app.delete('/api/schools/:id', (req,res,next)=>{
  db.deleteSchool(req.params.id)
  .then(response => res.send(response))
});

//Update enrollment of student
app.put('/api/students/unenroll/:student_id', (req,res,next)=>{
  db.unenrollStudent(req.params.student_id)
  .then(response => res.send(response))
  .catch(next =>console.log(next))
})

//Update student
app.put('/api/students/update/:id', (req,res,next)=>{
  console.log("student id recieved by server: ", req.params.id)
  console.log('req.body: ', req.body)
  db.updateStudent(req.params.id, req.body.name, req.body.school_id)
  .then(response => res.send(response))
})

//Update school
app.put('/api/schools/update/:id', (req,res,next)=>{
  console.log("school id recieved by server: ", req.params.id)
  console.log('req.body: ', req.body)
  db.updateSchool(req.params.id, req.body.name)
  .then(response => res.send(response))
})

//enroll student from school card
app.put('/api/students/enroll/:id', (req,res,next)=>{
  console.log('req.body recieved at server',req.body)
  db.enrollStudent(req.params.id, req.body.schoolID)
  .then(response =>res.send(response))
})
//Set port and start server
const PORT = process.env.port || 3000;


db.sync()
  .then(()=>{
    console.log( "synced!");
    app.listen(PORT, ()=> console.log(`listening on port ${PORT} `))
});
