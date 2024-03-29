const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const { title } = require("process");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_connectionDB",
});
connection.query = util.promisify(connection.query);

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
    case "Remove employee":
      removeEmployee();
      break;
    case "Update employee role":
      updateRole();
      break;
    case "Update employee by manager":
      updateEmployee();
      break;
    case "View all roles":
      viewAllRoles();
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
  const data = await connection.query("SELECT * FROM employee");
  console.table(data);
  init();
}

async function viewDepartments() {
  const data = await connection.query("SELECT * FROM department");
  console.table(data);
  init();
}
async function viewAllRoles() {
  const data = await connection.query("SELECT * FROM roles");
  console.table(data);
  init();
}

async function addEmployee() {
  const rolesArr = await connection.query("SELECT title, id FROM roles");
  // console.log(rolesArr);
  const { firstName, lastName, roles_id } = await inquirer.prompt([
    { name: "firstName", message: "What is the employees first name?" },
    { name: "lastName", message: "What is the employees last name?" },

    {
      name: "roles_id",
      type: "list",
      message: "What is the employees role?",
      choices: rolesArr.map((role) => role.title),
    },
  ]);
  await connection.query("INSERT INTO employee SET ?", {
    firstName: firstName,
    lastName: lastName,
    roles_id: rolesArr.filter((role) => roles_id === role.title)[0].id,
  });

  viewEmployeesDepartment();
  // const data = connection.query("SELECT * FROM employee");
  // console.table(data);
}

async function addRole() {
  const departmentArr = await connection.query(
    "SELECT names, id FROM department"
  );
  const { title, department_id, salary } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the title of this role?",
      name: "title",
    },
    {
      type: "list",
      message: "Which department is this role for?",
      name: "department_id",
      choices: departmentArr.map((department) => department.names),
    },
    {
      type: "number",
      message: "What is the salary for this role?",
      name: "salary",
    },
  ]);
  await connection.query("INSERT INTO roles SET ?", {
    title: title,
    department_id: departmentArr.filter(
      (department) => department_id === department.names
    )[0].id,
    salary: salary,
  });

  viewAllRoles();
}
async function addDepartment() {
  const { names } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of this department?",
      name: "names",
    },
  ]);
  await connection.query("INSERT INTO department SET ?", {
    names: names,
  });

  viewDepartments();
}

const removeEmployee = async () => {
  // request the data from that table
  const data = await connection.query("SELECT * FROM employee");
  // build your inquirer prompt based off the data and table passed in
  const { id } = await inquirer.prompt({
    name: "id",
    type: "list",
    message: "What would you like to remove?",
    choices: data.map((employee) => ({
      name: employee.firstName + " " + employee.lastName,
      value: employee.id,
    })),
  });
  await connection.query("DELETE FROM employee WHERE ?", {
    id,
  });
  viewEmployeesDepartment();

  // removeEmployee();
};
const removeRole = async () => {
  // request the data from that table
  const data = await connection.query("SELECT * FROM roles");
  // build your inquirer prompt based off the data and table passed in
  const { title } = await inquirer.prompt({
    name: "title",
    type: "list",
    message: "What would you like to remove?",
    choices: data.map((roles_id) => ({
      value: roles_id.title,
    })),
  });
  await connection.query("DELETE FROM roles WHERE ?", {
    title,
  });
  viewAllRoles();
};
const removeDepartment = async () => {
  // request the data from that table
  const data = await connection.query("SELECT * FROM department");
  // build your inquirer prompt based off the data and table passed in
  const { names } = await inquirer.prompt({
    name: "id",
    type: "list",
    message: "What would you like to remove?",
    choices: data.map((department_id) => ({
      value: department_id.names,
    })),
  });
  await connection.query("DELETE FROM department WHERE ?", {
    names,
  });
  viewDepartments();
};

async function updateRole() {
  const nameArr = await connection.query(
    "SELECT firstName, lastName, id FROM employee"
  );
  const rolesArr = await connection.query("SELECT title, id FROM roles");

  const { employee, newRole } = await inquirer.prompt([
    {
      name: "employee",
      type: "list",
      message: "Which employee would you like to change?",
      choices: nameArr.map((employee) => ({
        name: employee.firstName + " " + employee.lastName,
        value: employee.id,
      })),
    },
    {
      name: "newRole",
      type: "list",
      message: "What is the employees role?",
      choices: rolesArr.map((role) => ({ name: role.title, value: role.id })),
    },
  ]);
  await connection.query("UPDATE employee SET ? WHERE ?", [
    {
      roles_id: newRole,
    },
    {
      id: employee,
    },
  ]);
  viewEmployeesDepartment();
  // updateRole();
  // updateEmployee();
}

// remove the item based off id
