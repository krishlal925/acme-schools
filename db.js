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

  const [CalPoly, FresnoState, Standford] = await Promise.all([
    createSchool("CalPoly"),
    createSchool("Fresno State"),
    createSchool("Standford")
  ])


  Promise.all([
    createStudent("Samantha", Standford.id),
    createStudent("Dennis", CalPoly.id),
    createStudent("Shanil", FresnoState.id)
  ])


  console.log(await readStudents())
}

//read schools
const readSchools = async()=>{
  SQL = 'SELECT * FROM schools';
  return(await client.query(SQL)).rows
}
//read students
const readStudents = async()=>{
  SQL = 'SELECT * FROM students';
  return(await client.query(SQL)).rows
}

//create schools
const createSchool = async(name)=>{
  const SQL ='INSERT INTO schools(name) VALUES($1) returning *';
  return(await client.query(SQL, [name])).rows[0]
}

//create students
const createStudent = async (name, id)=>{
  SQL = 'INSERT INTO students(name, school_id) VALUES($1, $2) returning *';
  return(await client.query(SQL, [name, id])).rows[0]
}

module.exports = {
  sync,
  createSchool,
  createStudent,
  readSchools,
  readStudents
}
