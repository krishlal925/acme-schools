const pg = require('pg')

const client = new pg.Client('postgres://localhost/acme-schools')

client.connect();
const sync = async()=>{

  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS students;
    DROP TABLE IF EXISTS schools;

    CREATE TABLE schools(
      ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(20) NOT NULL UNIQUE,
      CHECK (char_length(name)>0)
    );

    CREATE TABLE students(
      ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(20) NOT NULL UNIQUE,
      CHECK (char_length(name)>0),
      school_id UUID REFERENCES schools(id)
    );
  `
  client.query(SQL);

  createSchool("CalPoly");
  createSchool("Fresno State");
  createSchool("Standford");
  createStudent("Samantha");
  createStudent("Dennis");
  createStudent("Shanil");
}

//read schools


//add schools
const createSchool = async(name)=>{
  const SQL ='INSERT INTO schools(name) VALUES($1) returning *';
  return(await client.query(SQL, [name]))
}

// add students
const createStudent =  async (name)=>{
  SQL = 'INSERT INTO students(name) VALUES($1) returning *';
  return(await client.query(SQL, [name]))
}

module.exports = {
  sync,
  createSchool,
  createStudent
}
