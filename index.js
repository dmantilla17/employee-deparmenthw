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

//FUNCTIONS

//USER INTERACTION
const { choice } = await inquirer.prompt(options);
switch (choice) {
  case "See departmant list":
    return displayQuestions();
}
//INITIZALITATION
init();
