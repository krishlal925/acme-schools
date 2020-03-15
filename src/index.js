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

const UpdateStudent = ({deleteStudent, student, updateStudent, schools })=>{

  console.log("printing student that was passed into UpdateStudent component: ",student)
  const [name, setName]= useState(student.name)
  const [schoolID, setSchoolID] = useState((schools.filter(school=>school.id ===student.school_id)).id)

  const onSubmit=(ev)=>{
    ev.preventDefault();
    console.log(`sending student.id: ${student.id}, name: ${name}, schoolID: ${schoolID} `)
    updateStudent(student.id, name, schoolID);
  }

  return(
    <div>
      <div className = "updateStudentBox">
        <form onSubmit= {onSubmit}>
          <h2>Update {student.name}</h2>
          <input value={name} onChange= {(ev)=>setName(ev.target.value)}></input>
          <select value ={schoolID} onChange={(ev)=>setSchoolID(ev.target.value)}>
            <option>--Pick a school--</option>
            {
              schools.map(school =>{
                return(
                  <option value= {school.id} key = {school.id}> {school.name}</option>
                )
              })
            }
          </select>
          <button> Update</button>
        </form>
        <button className="DeleteButton" onClick={()=>deleteStudent(student.id)}>Delete Student</button>

      </div>
    </div>
  )
}

const UpdateSchool = ({deleteSchool, school, updateSchool })=>{
  console.log("printing School that was passed into UpdateStudent component: ",school)
  const [name, setName]= useState(school.name)

  const onSubmit=(ev)=>{
    ev.preventDefault();
    console.log(`sending name: ${name}, schoolID: ${school.id} `)
    updateSchool(school.id, name);
  }

  return(
    <div>
      <div className = "updateStudentBox">
        <form onSubmit= {onSubmit}>
          <h2>Update {school.name}</h2>
          <input value={name} onChange= {(ev)=>setName(ev.target.value)}></input>
          <button> Update</button>
        </form>
        <button className="DeleteButton" onClick={()=>deleteSchool(school.id)}>Delete School</button>

      </div>
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
  }

  const deleteStudent = async(id)=>{
        //sends user back to homepage after deleting student
        window.location.hash = '#';

    const response = (await Axios.delete(`/api/students/${id}`)).data
    console.log("response from axios delete command:  ",response)

    const newArray = students.filter(student => student.id !== response.id)
    setStudents([...newArray])
  }

  const deleteSchool = async(id)=>{
    //sends user back to homepage after deleting student
    window.location.hash = '#';

    const response = (await Axios.delete(`/api/schools/${id}`)).data
    console.log("response from axios delete command:  ",response)

    const newArray = schools.filter(school => school.id !== response.id)
    setSchools([...newArray])
  }

  const unenrollStudent = async(id)=>{
    console.log("working on unenrolling student...")
    const response = (await Axios.put(`/api/students/unenroll/${id}`, {school_id: null})).data
    const newArray = students.filter(student=> student.id !== id)
    setStudents([...newArray, response])
  }

  const updateStudent = async(id , name, school_id )=>{
    console.log("working on updating student....")
    const response = (await Axios.put(`/api/students/update/${id}`, {name, school_id })).data
    console.log("response from axios after sending update request", response);
    const newArray = students.filter(student => student.id !== id);
    setStudents([...newArray, response])

    //sends user back to homepage after updating student
    window.location.hash = '#';
  }

  const updateSchool = async(id , name )=>{
    console.log("working on updating school....")
    const response = (await Axios.put(`/api/schools/update/${id}`, {name})).data
    console.log("response from axios after sending update request", response);
    const newArray = schools.filter(school => school.id !== id);
    setSchools([...newArray, response])

    //sends user back to homepage after updating student
    window.location.hash = '#';
  }

  const enrollStudent = async(studentID, schoolID)=>{
    console.log('studentID given to axios: ', studentID)
    const response = (await Axios.put(`/api/students/enroll/${studentID}`, {schoolID})).data
    console.log(response);
    const newArray = students.filter(student => student.id !== studentID)
    setStudents([...newArray, response])

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
  console.log('params: ', params)
  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);
  const { view } = params;

  return (
    <div>
      <div><h1> <a href='#' > Acme Schools </a></h1></div>
      <div>{schools.length} Schools </div>
      <div>{students.length} Students</div>
      {
        view=== 'school' && (<UpdateSchool deleteSchool = {deleteSchool} school={(schools.filter(school=>school.id === params.id))[0]} updateSchool= {updateSchool}/>)
      }
      {
        view === "student" && ( <UpdateStudent deleteStudent={deleteStudent} student = {(students.filter(student => student.id ===params.id))[0]} updateStudent= {updateStudent} schools = {schools}/>)
      }
      {
        !view && (
          <div className= "container">
            <div className="top">
              <CreateStudent createStudent= {createStudent} schools={schools}/>
              <CreateSchool createSchool = {createSchool}/>
            </div>
            <div className="bottom" >
              <UnenrolledStudents students= {unenrolledStudents} UpdateStudent={UpdateStudent} />
              {
                schools.map(school=>{
                  return(
                    <SchoolCards school = {school} students ={students.filter(student=> student.school_id === school.id)}
                      unenrollStudent= {unenrollStudent} unenrolledStudents = {unenrolledStudents} enrollStudent= {enrollStudent}/>
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
