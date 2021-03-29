const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",

    port: 8080,
    user: "root",
    database: "employee_connectionDB",
    
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});
function init(){
inquirer.prompt([{
    type: "list",
    name: "message",
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
}]).then(function(response){
    switch(response.message){
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
        connection.end()
    }

})
}

function viewEmployeesDepartment(){
    connection.query("SELECT * FROM message", function(err, data){
        console.table(data);
        init();
    })
}
function viewEmployeesManager(){
    connection.query("SELECT * FROM message", function(err, data){
        console.table(data);
        init();
    })
}
function addEmployee(){
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is employees first name?"
    }
    }])
}
