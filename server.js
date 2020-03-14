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
  console.log(req.body)
  db.createStudent(req.body)
  .then(response => res.send(response))
})

app.delete('/api/students/:id', (req,res,next)=>{
  db.deleteStudent(req.params.id)
  .then(response => res.send(response))
});

//Set port and start server
const PORT = process.env.port || 3000;


db.sync()
  .then(()=>{
    console.log( "synced!");
    app.listen(PORT, ()=> console.log(`listening on port ${PORT} `))
});
