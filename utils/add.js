const inquirer = require("inquirer");

// async function addEmployee() {
    
//     const { firstName, lastName, roles_id } = await inquirer.prompt([
//       { name: "firstName",
//         message: "What is the employees first name?",
//       },
//       { name: "lastName",
//         message: "What is the employees last name?",
//       },
  
//       { name: "roles",
//           type: 'list',
//           message: "What is the employees role?",
//           choices: ["Sales Lead", "Salesperson", "Accountant", "Account Manager", "Software Engineer", "Lead Engineer", "Lawyer", "Legal Team Lead" ]
//       }  
//       ])
//   const result = await connection.query("INSERT INTO auctions SET ?", {
//       firstName: firstName,
//       lastName: lastName,
//       roles: roles_id,
//   })
    
//       console.table(result)
//       // const data = connection.query("SELECT * FROM employee");
//       // console.table(data);
//       init();
//   }
  
//   async function addRole(){
//       const { title, department_id, salary } = await inquirer.prompt ([
//           {
//               type: "input",
//               message: "What is the title of this role?",
//               name: "title"
//           },
//           {
//               type: "list",
//               message: "Which department is this role for?",
//               name: "department",
//               choices: ["Sales", "Finance", "Legal", "Engineering"]
//           },
//           {
//               type: "number",
//               message: "What is the salary for this role?",
//               name: "salary"
//           }
//       ])
//       const result = await connection.query("INSERT INTO auctions SET ?", {
//         title: title,
//         department: department_id,
//         salary: salary,
//     })
//     console.table(result)
//     init()
//   }
module.exports = addEmployee();
module.exports = addRole();