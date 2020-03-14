import React from 'react';

const SchoolCards = ({school, students, unenrollStudent})=>{
  return(
    <div className="box2">
      <h2> {school.name}</h2>
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
