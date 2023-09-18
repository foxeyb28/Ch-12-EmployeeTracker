const mysql = require('mysql2');
const inquirer = require("inquirer")
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'abc1234',
      database: 'employees_db'
    },
    console.log(`Connected to the books_db database.`)
  );

  function start(){
    inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"],
      }
    ])
    .then(answer => {
      console.log(answer)
      if(answer.start == "View Departments"){
        viewDepartments()
      }
      if(answer.start == "View Roles"){
        viewRoles()
      }
      if(answer.start == "View Employees"){
        viewEmployees()
      }
      if(answer.start == "Add Department"){
        addDepartment()
      }
      if(answer.start == "Add Role"){
        addRole()
      }
      if(answer.start == "Add Employee"){
        addEmployee()
      }
      if(answer.start == "Update Employee Role"){
        updateEmployeeRole()
      }
  })

  }

  function viewDepartments(){
    db.query("select * from department", (err, res) =>{
      if (err) console.log(err)
      console.table(res)
    start()
    })
  }
  function viewRoles(){
    db.query("select * from role", (err, res) =>{
      if (err) console.log(err)
      console.table(res)
    start()
    })
  }
  function viewEmployees(){
    db.query("select * from employee", (err, res) =>{
      if (err) console.log(err)
      console.table(res)
    start()
    })
  }
  function addDepartment(){
    inquirer.prompt({
      type: "input",
      name: "dep",
      message: "What is the department name?"
    })
    .then(answer => {
      db.query(`insert into department (name) values ("${answer.dep}")`, (err, res) =>{
        if (err) console.log(err)
        console.table(res)
      start()
      })
    })
  }
  function addRole(){
    inquirer.prompt([
      {
      type: "input",
      name: "title",
      message: "What is the title?"
    },
      {
      type: "input",
      name: "salary",
      message: "What is the salary?"
    },
      {
      type: "input",
      name: "depid",
      message: "What is the department id?"
    },
  ])
    .then(answers => {
      db.query(`insert into role (title, salary, depid) values ("${answers.title}", ${answers.salary}, ${answers.depid})`, (err, res) =>{
        if (err) console.log(err)
        console.table(res)
      start()
      })
    })
  }
  function addEmployee(){
    inquirer.prompt([
      {
      type: "input",
      name: "firstname",
      message: "What is the first name?"
    },
      {
      type: "input",
      name: "lastname",
      message: "What is the last name?"
    },
      {
      type: "input",
      name: "roleid",
      message: "What is the role id?",

    },
      {
      type: "input",
      name: "managerid",
      message: "What is the manager id?"
    },
  ])
    .then(answers => {
      
      db.query(`insert into employee (first_name, last_name, role_id, manager_id) values ("${answers.firstname}", "${answers.lastname}", ${answers.roleid}, null)`, (err, res) =>{
        if (err) console.log(err)
        console.table(res)
      start()
      })
    })
  }
  function updateEmployeeRole(){

  }
  start()