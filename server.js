const express = require('express');
const mySQL = require('mysql2');
const inquirer = require('inquirer');
const { createConnection } = require('net');
const { allowedNodeEnvironmentFlags } = require('process');
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

