import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

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

    <div>Acme Schools </div>

  );
};
ReactDOM.render(<App />, root);
