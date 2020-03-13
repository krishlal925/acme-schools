import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import CreateSchool from './create_school';
import CreateStudent from './create_student';

const {useState, useEffect} =React;

const root = document.querySelector('#root');

const UnenrolledStudents = ({students})=>{
  console.log("inside UnenrolledStudents component. Students: ",students)
  return(
    <div className = "box2">
      <h2>Unenrolled Students</h2>
      <ul>
        {
          students.map(student =>{
            return(<li key= {student.id}>{student.name} </li>)
          })
        }
      </ul>
    </div>
  )
}

const SchoolCards = ({school, students})=>{
  return(
    <div className="box2">
      <h2> {school.name}</h2>
      <ul>
        {
          students.map(student=>{
            return(
              <li key = {student.id}>{student.name} </li>
            )
          })
        }
      </ul>
    </div>

  )
}


const App = () => {
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  let unenrolledStudents = students.filter(student => student.school_id === null);

  const createSchool = async (name)=>{
    const response = (await Axios.post('/api/schools', {name})).data
    setSchools([...schools, response])

  }

  const createStudent = async(name, id)=>{
    const response = (await Axios.post('/api/students', {name, id})).data
    setStudents([...students, response])
    console.log(" this is the response from the server through axios: ",response)
  }

  useEffect(()=>{

    Promise.all([Axios.get('/api/schools'), Axios.get('/api/students') ])
      .then(responses => {
        setSchools(responses[0].data)
        setStudents(responses[1].data)
      })
      .then(()=>{
        unenrolledStudents = students.filter(student => student.school_id === null);
      })
  },[])

  console.log(schools);
  console.log(students);

  console.log("unenrolled students:", unenrolledStudents)


  return (
    <div>
      <div><h1>Acme Schools </h1></div>
      <div>{schools.length} Schools </div>
      <div>{students.length} Students</div>

      <div className= "container">
        <div className="top">
          <CreateStudent createStudent= {createStudent} schools={schools}/>
          <CreateSchool createSchool = {createSchool}/>
        </div>
        <div className="bottom" >
          <UnenrolledStudents students= {unenrolledStudents}/>
          {
            schools.map(school=>{
              return(
                <SchoolCards school = {school} students ={students.filter(student=> student.school_id === school.id)}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, root);
