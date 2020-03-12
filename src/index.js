import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import CreateSchool from './create_school';
import CreateStudent from './create_student';

const {useState, useEffect} =React;

const root = document.querySelector('#root');

const App = () => {
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(()=>{

    Promise.all([Axios.get('/api/schools'), Axios.get('/api/students') ])
      .then(responses => {
        setSchools(responses[0].data)
        setStudents(responses[1].data)
      })
  },[])

  console.log(schools);
  console.log(students);

  return (
    <div>
      <div><h1>Acme Schools </h1></div>
      <div>{schools.length} Schools </div>
      <div>{students.length} Students</div>

      <div className= "container">
        <div className="top">
          <CreateStudent/>
          <CreateSchool />
        </div>
        <div className="bottom" >

        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, root);
