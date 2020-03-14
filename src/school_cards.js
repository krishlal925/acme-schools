import React from 'react';

const SchoolCards = ({school, students, deleteStudent})=>{
  return(
    <div className="box2">
      <h2> {school.name}</h2>
      <ul>
        {
          students.map(student=>{
            return(
              <li key = {student.id}> <a href={`#view=student&id=${student.id}`} >{student.name} </a>
                <button onClick= {()=>deleteStudent(student.id)}>x</button>
               </li>
            )
          })
        }
      </ul>
    </div>

  )
}

export default SchoolCards;
