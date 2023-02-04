const express = require('express');
const mySQL = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const app = express();

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Vlad6088!!!!',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect(function(err) {
if (err) throw err
console.log("Connected as " + connection.threadID)
Prompt1();   
})

function Prompt1() {
inquirer
.prompt({
type: "list",
name: "opener",
message: "Please navigate to the menu of your choosing.",
choices: [
"All Employees",
"Employees By Department",
"Add Employee",
"Remove Employee",
"Update Employee Role",
"Add Role",
"End"]     
})

.then(function({task}) {
switch (task.choice) {
case "All Employees":
allEmployees();
break;

case "Employees By Department":
byDepartment();
break;

case "View All Roles":
allRoles();
break;

case "Add Employee":
addEmployee();
break;

case "Update Employee Role":
updateEmployee();
break;

case "Add Role":
addRole();
break;

case "Add Department":
addDepartment();
break;

case "End":
connection.end();
break;

}

});

}

function allEmployees() {
console.log('Viewing Employees');
db.query(`SELECT employees.first_name, employees.last_name, role.title, role.salary, department.name, CONCAT(employees.first_name, ' ' , employees.last_name), AS Manager FROM employees INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id;`,
function(err, res) {
if (err) throw err
console.table(res)
Prompt1();
})
}

function byDepartment() {
console.log('Viewing Employees By Department');
db.query('SELECT employees.first_name, employees.last_name, department.name AS Department FROM employee JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id',
function(err, res) {
if (err) throw err
console.table(res)
Prompt1();    
}
)    
}

function allRoles() {
db.query('SELECT employees.first_name, employees.last_name, role.title AS Title FROM employees JOIN role on employee.role_id = role.id;',
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
    roleArray.push(array[i].title);   
}    
})
return roleArray;
}


const managerArray = [];
function managerSelection() {
db.query('Select first_name, last_name FROM employees WHERE manager_id is NULL', function(err, res){
if(err) throw err
for (let i = 0; i < res.length; i++) {
    managerArray.push(array[i].first_name);
    
}    
})  
return managerArray;  
}

function addEmployee() {
inquirer.prompt([
{
name: 'firstname',
type: 'input',
message: "Enter your first name"
},
{
name: 'lastname',
type: "input",
message: "Enter your last name"    
},
{
name: "role",
type: "list",
message: "Please choose a role: ",
choices: roleSelection()    
},
{
name: "manager",
type: "rawlist",
message: "What's the manager's name?",
choices: managerSelection()
},

]) .then(function(val) {
const roleID = roleSelection().indexOf(val.role) + 1
const managerID = managerSelection().indexOf(val.manager) + 1
db.query("INSERT INTO employee SET ?",
{
first_name: val.firstname,
last_name: val.lastname,
manager_id = managerID,
role_id = roleID    
}, function(err) {
if (err) throw err
console.table(val)
Prompt1();    
})
})    
}

function updateEmployee() {
db.query('SELECT employees.last_name, role.title FROM employees JOIN role ON employees.role_id = role.id;', 
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
choices: roleSelection()    
},  
]).then(function(val) {
const roleID = roleSelection().indexOf(val.role) + 1
db.query("UPDATE employees SET WHERE ?"),
{
  last_name: val.lastName  
},
{
role_id: roleID    
},
function(err){
    if (err) throw err
    console.table(val)
    Prompt1()   
}    
})
})    
}

function addRole() {
db.query('SELECT role.title AS Title, role.salary AS Salary FROM Role', function(err,res) {
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
}    
]).then(function(res) {
db.query("INSERT INTO role SET ?",
{
  title: res.Title,
  salary: res.Salary,
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
  name: res.name  
},
function(err) {
if(err) throw err
console.table(res);
Prompt1();    
}
)
})
}

