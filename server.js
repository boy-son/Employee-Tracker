const express = require('express');
const mySQL = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const app = express();

const db = mySQL.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect(function(err) {
if (err) throw err
console.log("Connected as " + db.threadID)
Prompt1();   
})

function Prompt1() {
inquirer
.prompt({
type: "list",
name: "choice",
message: "Please navigate to the menu of your choosing.",
choices: [
"All Employees",
"Add Employee",
"Employees By Department",
"Update Employee Role",
"View All Roles",
"Add Role",
"Add Department",
"End"]     
})

.then(function(val) {
switch (val.choice) {

case "All Employees":
allEmployees();
break;

case "Add Employee":
addEmployee();
break;

case "Employees By Department":
byDepartment();
break;

case "Update Employee Role":
updateEmployee();
break;

case "View All Roles":
allRoles();
break;

case "Add Role":
addRole();
break;

case "Add Department":
addDepartment();
break;

case "End":
db.end();
break;

}

});

}

function allEmployees() {
console.log('Viewing Employees');
db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id`,
function(err, res) {
if (err) throw err
console.table(res)
Prompt1();
})
}

function byDepartment() {
console.log('Viewing Employees By Department');
db.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id',
function(err, res) {
if (err) throw err
console.table(res)
Prompt1();    
}
)    
}

function allRoles() {
console.log('Viewing Employees By Role');
db.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role on employee.role_id = role.id;',
function (err,res) {
if (err) throw err
console.table(res)
Prompt1();    
}
)    
}

const roleArray = [];
function roleSelection() {
db.query('SELECT * FROM role', function(err, res) {
for (let i = 0; i < res.length; i++) {
    roleArray.push(res[i].title);   
}    
})
return roleArray;
}


const managerArray = [];
function managerSelection() {
db.query('Select first_name, last_name FROM employee WHERE manager_id is NULL', function(err, res){
if(err) throw err
for (let i = 0; i < res.length; i++) {
    managerArray.push(res[i].first_name);
    
}    
})  
return managerArray;  
}

async function addEmployee() {
await inquirer.prompt([
{
name: 'firstname',
type: 'input',
message: "Enter your first name",
},
{
name: 'lastname',
type: "input",
message: "Enter your last name",    
},
{
name: "role",
type: "list",
message: "Please choose a role: ",
choices: roleSelection(),    
},
{
name: "manager",
type: "rawlist",
message: "What's the manager's name?",
choices: managerSelection(),
},

]).then(function(val) {
console.log(val);
const roleID = roleSelection().indexOf(val.role) + 1
const managerID = managerSelection().indexOf(val.manager) + 1
db.query("INSERT INTO employee SET ?",
{
first_name: val.firstname,
last_name: val.lastname,
manager_id : managerID,
role_id : roleID    
}, function(err) {
if (err) throw err;
console.table(val);
console.log("Added Successfully!");
Prompt1();    
})
})    
}

function updateEmployee() {
db.query('SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;', 
function(err,res) {
if(err) throw err
console.log(res)
inquirer.prompt([
{
    name:'lastName',
    type: "rawlist",
    choices: function() {
    const lastName = [];
    for (let i = 0; i < res.length; i++) {
        lastName.push(res[i].last_name);      
    }
    return lastName    
    },
 message: 'What is the employees last name?'   
},
{
name:'role',
type: 'rawlist',
message: "What is the employees new title?",
choices: roleSelection(),    
},  
]).then(function(val) {
const roleID = roleSelection().indexOf(val.role) + 1;
db.query('UPDATE employee SET role_id = ? WHERE last_name = ?',
[roleID, val.lastName],
function(err, val){
    if (err) throw err;
    console.table(val);
    console.log("Employee Updated!");
    Prompt1()   
});    
});
});   
}

function addRole() {
db.query('SELECT department.id, department.name FROM Department', function(err,res) {
inquirer.prompt([
{
 name: "Title",
 type: "input",
 message: "What is the role's title?"   
},
{
 name: "Salary",
 type: "input",
 message: "What is the role's salary?"
},
{
  name: "Department",
  type: "rawlist",
  message: "What is the department's name?",
  choices: function() {
    const department = [];
    for (let i = 0; i < res.length; i++) {
        department.push(res[i].name);
    }
    return department;
  }
}    
]).then(function(res) {
const departmentID = res.Department.indexOf(res.Department) + 1;
db.query("INSERT INTO role SET ?",
{
  title: res.Title,
  salary: res.Salary,
  department_id: departmentID,
},
function(err) {
if(err) throw err
console.table(res);
Prompt1();
}
)    
})   
})    
}


function addDepartment() {
inquirer.prompt ([
{
  name: 'Department',
  type: 'input',
  message: "What department would you like to add?"
},

]).then(function(res) {
db.query("INSERT INTO department SET ?",
{
  name: res.Department,
},
function(err) {
if(err) throw err
console.table(res);
Prompt1();    
}
)
})
}

