import React, {useState} from 'react';


const CreateSchool = ({createSchool})=>{

  const [name,setName] = useState('');

  const onSubmit = (ev)=>{
    ev.preventDefault();
    createSchool(name);

  }

  return (
    <div className = "box">
      <form onSubmit={onSubmit} >
        <h2>Create School</h2>
        <input value = {name} onChange = {(ev)=>setName(ev.target.value)} className="input"></input>
        <button className="input">Create</button>
      </form>
    </div>
  );
}

export default CreateSchool;
