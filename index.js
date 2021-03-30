const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "employee_connectionDB",
  password: "",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});
async function init() {
  const { action }= await inquirer.prompt([
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
        "Quit"
      ]
    }
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
    
    const { firstName, lastName, roles_id } = await inquirer.prompt([
      { name: "firstName",
        message: "What is the employees first name?",
      },
      { name: "lastName",
        message: "What is the employees last name?",
      },
  
      { name: "roles",
          type: 'list',
          message: "What is the employees role?",
          choices: ["Sales Lead", "Salesperson", "Accountant", "Account Manager", "Software Engineer", "Lead Engineer", "Lawyer", "Legal Team Lead" ]
      }  
      ])
  const result = await connection.query("INSERT INTO employee SET ?", {
      firstName: firstName,
      lastName: lastName,
      roles_id: roles_id,
  })
    
      console.table(result)
      // const data = connection.query("SELECT * FROM employee");
      // console.table(data);
      init();
  }
  
  async function addRole(){
      const { title, department_id, salary } = await inquirer.prompt ([
          {
              type: "input",
              message: "What is the title of this role?",
              name: "title"
          },
          {
              type: "list",
              message: "Which department is this role for?",
              name: "department",
              choices: ["Sales", "Finance", "Legal", "Engineering"]
          },
          {
              type: "number",
              message: "What is the salary for this role?",
              name: "salary"
          }
      ])
      const result = await connection.query("INSERT INTO roles SET ?", {
        title: title,
        department: department_id,
        salary: salary,
    })
    console.table(result)
    init()
  }   

