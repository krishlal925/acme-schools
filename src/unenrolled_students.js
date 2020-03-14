import React from 'react';

const UnenrolledStudents = ({students, UpdateStudent})=>{
  console.log("inside UnenrolledStudents component. Students: ",students)
  return(
    <div className = "box2">
      <h2>Unenrolled Students</h2>
      <ul>
        {
          students.map(student =>{
            return(<li key= {student.id}> <a href={`#view=student&id=${student.id}`}>{student.name} </a></li>)
          })
        }
      </ul>
    </div>
  )
}

export default UnenrolledStudents;
