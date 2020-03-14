import React, {useState} from 'react'

const CreateStudent = ({createStudent, schools})=>{
  const [name, setName] = useState('');
  const [school_id, setSchool]= useState('')

  const onSubmit = (ev)=>{
    ev.preventDefault()
    createStudent(name, school_id)
    console.log(`create student form sending name: ${name} and school id: ${school_id}`)
  }
  return(
    <div className= "box">
      <form onSubmit={onSubmit}>
        <h2>Create Student</h2>
        <input value= {name} onChange={ev=> setName(ev.target.value)} className="input"></input>
        <select value={school_id} onChange= {ev=>setSchool(ev.target.value) } className="input">
          <option>Pick a school</option>
          <option value ={null}>Unenrolled</option>
          {
            schools.map(school=>{
              return(
              <option value={school.id} key={school.id}> {school.name}</option>
              )
            })
          }
        </select>
        <button className="input">Create</button>
      </form>

    </div>
  )
}

export default CreateStudent
