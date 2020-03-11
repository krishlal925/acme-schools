const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');


//body parser
app.use(express.json());


// loads the front end
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname,'index.html'))
});

//get students
app.get('/api/students', (req,res,next)=>{
  db.readStudents()
  .then(response => res.send(response))
})

//get schools
app.get('/api/schools', (req,res,next)=>{
  db.readSchools()
  .then(response => res.send(response))
})

//Set port and start server
const PORT = process.env.port || 3000;


db.sync()
  .then(()=>{
    console.log( "synced!");
    app.listen(PORT, ()=> console.log(`listening on port ${PORT} `))
});
