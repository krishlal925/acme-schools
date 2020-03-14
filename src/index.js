import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import CreateSchool from './create_school';
import CreateStudent from './create_student';
import qs from 'qs';
import SchoolCards from './school_cards';
import UnenrolledStudents from './unenrolled_students';

const {useState, useEffect} =React;

const root = document.querySelector('#root');




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

  const deleteStudent = async(id)=>{
    const response = (await Axios.delete(`/api/students/${id}`)).data
    const newArray = students.filter(student => student.id !== response.id)
    setStudents([...newArray])
    console.log(" axios returned response of deleted student: ",response)
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


  // used for routing
  const [ params, setParams ] = useState(qs.parse(window.location.hash.slice(1)));
  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);
  const { view } = params;

  return (
    <div>
      <div><h1>Acme Schools </h1></div>
      <div>{schools.length} Schools </div>
      <div>{students.length} Students</div>
      {
        view === "student" && ( <UpdateStudent/>)
      }
      {
        !view && (
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
                    <SchoolCards school = {school} students ={students.filter(student=> student.school_id === school.id)}
                      deleteStudent= {deleteStudent}/>
                  )
                })
              }
            </div>
          </div>
        )
      }

    </div>
  );
};
ReactDOM.render(<App />, root);
