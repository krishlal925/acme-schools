import React, {useState} from 'react';

const SchoolCards = ({school, students, unenrollStudent, unenrolledStudents, enrollStudent})=>{
  const [studentID, setStudentID] = useState('')

  const onChange= (ev)=>{
    setStudentID(ev.target.value)
    console.log('ev.target.value: ', ev.target.value)
    console.log('school.id inside onChange function in schoolcard: ', school.id)
    enrollStudent(ev.target.value, school.id)
  }

  return(
    <div className="box2">
      <h2> {school.name}</h2>
      <select onChange= {(ev)=>onChange(ev)}>
        <option>--enroll a student--</option>
        {
          unenrolledStudents.map(unenrolledStudent => {
            return(
              <option value={unenrolledStudent.id} key={unenrolledStudent.id}>{unenrolledStudent.name}</option>
            )
          })
        }
      </select>
      <ul>
        {
          students.map(student=>{
            return(
              <li key = {student.id}> <a href={`#view=student&id=${student.id}`} >{student.name} </a>
                <button onClick= {()=>unenrollStudent(student.id)}>Unenroll</button>
               </li>
            )
          })
        }
      </ul>
    </div>

  )
}

export default SchoolCards;
