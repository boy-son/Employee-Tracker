const express = require('express');
const mySQL = require('mysql2');
const inquirer = require('inquirer');
const { createConnection } = require('net');
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
switch (task) {
case "All Employees":
allEmployees();
break;

case "Employees By Department":
byDepartment();
break;

case "Add Employee":
addEmployee();
break;

case "Remove Employee":
removeEmployee();
break;

case "Update Employee Role":
updateEmployee();
break;

case "Add Role":
addRole();
break;

case "End":
connection.end();
break;


}

});

}



