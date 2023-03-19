require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

//DB CONNECTION
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const displayQuestions = async () => {
  try {
    const [departments] = await db.promise().query(`SELECT * FROM departments`);
    console.log("returned by promise", departments);
    questions.forEach(({ description, complete }) =>
      complete
        ? console.log(`[x] ${description}`)
        : console.log(`[ ] ${description}`)
    );
  } catch (err) {
    console.log(err);
  }
  return init();
};
const questions = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Select options",
      name: "menu",
      choices: [
        "Departments",
        "Employees",
        "Roles",
        "Add a Department",
        "Add a Role",
        "Add a Employee",
        "Update an Employee Role",
      ],
    })
    .then(({ menu }) => {
      db.query(`SELECT * FROM departments`, menu, (err, result) => {
        return init();
      });
    });
};
const displayRoles = async () => {
  try {
    const [roles] = await db.promise().query(`SELECT * FROM roles`);
    console.log("returned by promise", roles);
    chooseRole.forEach(({ description, complete }) =>
      complete
        ? console.log(`[x] ${description}`)
        : console.log(`[ ] ${description}`)
    );
  } catch (err) {
    console.log(err);
  }
  return init();
};
const chooseRole = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Role Section",
      name: "roles",
      choice: [
        "Job Title",
        "Role ID",
        "Department of Role",
        "Salary of the Role",
      ],
    })
    .then(({ roles }) => {
      db.query(`SELECT * FROM roles`, roles, (err, result) => {
        return init();
      });
    });
};
const displayEmployee = async () => {
  try {
    const [employees] = await db.promise().query(`SELECT * FROM employees`);
    console.log("returned by promise", employees);
    findEmployee.forEach(({ description, complete }) =>
      complete
        ? console.log(`[x] ${description}`)
        : console.log(`[ ] ${description}`)
    );
  } catch (err) {
    console.log(err);
  }
  return init();
};
const findEmployee = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Employee Section",
      name: "employees",
      choice: ["First Name", "Last Name", "Employee Role", "Manager"],
    })
    .then(({ employee }) => {
      db.query(`SELECT * FROM employee`, employee, (err, result) => {
        return init();
      });
    });
};
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "enter Department",
      name: "department",
    })
    .then(({ department }) => {
      db.query(
        `INSERT INTO department (description) VALUES (?)`,
        department,
        (err, result) => {
          return init();
        }
      );
    });
};
const addEmployee = () => {
  inquirer
    .prompt({
      type: "input",
      message: "enter Employee",
      name: "employee",
    })
    .then(({ employee }) => {
      db.query(
        `INSERT INTO employee (description) VALUES (?)`,
        employee,
        (err, result) => {
          return init();
        }
      );
    });
};
const addRoles = () => {
  inquirer
    .prompt({
      type: "input",
      message: "enter Roles",
      name: "roles",
    })
    .then(({ roles }) => {
      db.query(
        `INSERT INTO roles (description) VALUES (?)`,
        roles,
        (err, result) => {
          return init();
        }
      );
    });
};
const init = async () => {
  const options = {
    type: "list",
    message: "What do you want to do?",
    name: "choice",
    choices: [
      "See department list",
      "See Roles",
      "See Employee",
      "Add Department",
      "Add Employee",
      "Add Role",
      "exit",
    ],
  };

  //FUNCTIONS

  //USER INTERACTION
  const { choice } = await inquirer.prompt(options);
  switch (choice) {
    case "See departmant list":
      return displayQuestions();
    case "See Roles":
      return displayRoles();
    case "See Employee":
      return displayEmployee();
    case "Add Department":
      return addDepartment();
    case "Add Employee":
      return addEmployee();
    case "Add Role":
    case addRoles():
    case "exit":
      return process.exit();
  }
};
//INITIZALITATION
init();
