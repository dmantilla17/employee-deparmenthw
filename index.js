require('dotenv').config()
const inquirer = require('inquirer');
const mysql2= require('mysql2');


//DB CONNECTION
const db= mysql.createConnection({
    host:'',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
    


//FUNCTIONS 
const displayTodos=()=> {
    //get any todos from the database and display them in the console
    db.query(`SELECT * FROM`, (Err, todos)=> {
        todos.forEach(({description})=> console.log(description))
        return init();
            
        });
    }
    //show the intial menu
    //npm package
const init = ()=> {
    const options= {
        type:"list",
        message:"hi",


        choices:[
            "See todo list",
            //add a todo
    //complete a todo
    //catergorize
    //add a category
    "exit"
        ]
    }
    

inquirer.prompt(options)
.then(({ choice })=>{
    console.log(choice);
    switch(choice){
        case "see to do list":
        return displayTodos();
        case "exit"
        return process.kill();
    }
})
}

//USER INTERACTION

//INITIZALITATION 