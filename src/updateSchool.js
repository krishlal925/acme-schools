import React, {useState} from "react";

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

export default UpdateSchool;
