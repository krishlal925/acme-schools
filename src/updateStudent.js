import React, {useState} from "react"

const UpdateStudent = ({deleteStudent, student, updateStudent, schools })=>{

  console.log("printing student that was passed into UpdateStudent component: ",student)
  const [name, setName]= useState(student.name)
  const [schoolID, setSchoolID] = useState((schools.filter(school=>school.id ===student.school_id))[0].id)

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

export default UpdateStudent;
