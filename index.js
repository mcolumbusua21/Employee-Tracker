const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "employee_connectionDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});
async function init() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee by manager",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "Quit",
      ],
    },
  ]);

  switch (action) {
    case "View all employees by department":
      viewEmployeesDepartment();
      break;
    case "View all employees by manager":
      viewEmployeesManager();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Remove Employee":
      removeEmployee();
      break;
    case "Update employee role":
      updateRole();
      break;
    case "Update employee by manager":
      updateEmployee();
      break;
    case "Add role":
      addRole();
      break;
    case "Remove role":
      removeRole();
      break;
    case "View all departments":
      viewDepartments();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Remove department":
      removeDepartment();
      break;
    case "Remove department":
      removeDepartment();
      break;
    default:
      connection.end();
  }
}

async function viewEmployeesDepartment() {
  const data = await connection.query("SELECT * FROM employee");
  console.table(data);
  init();
}

async function viewEmployeesManager() {
  const data = connection.query("SELECT * FROM employee");
  console.table(data)
    init();
  };

async function addEmployee() {
  const data = await inquirer.prompt([
    {
      name: "first name",
      message: "What is the employees first name?",
    },
    {
      name: "last name",
      message: "What is the employees last name?",
    },

    {
      name: "role",
      message: "What is the employees role?",
    },
  ]);
}
