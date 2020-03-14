import React from 'react';

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

export default UnenrolledStudents;
