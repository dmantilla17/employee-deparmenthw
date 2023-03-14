//DEPENDENCIES
const express = require("express");
const mysql = require("mysql2");
//DATA

//DB CONNECTIONS

//APP PORT
const app = express();
const PORT = process.env.PORT || 4000;

//MIDDLEWARE
app.use(express.jsonZ());
app.use(express.urlencoded({ extended }));

//ROUTES

//START THE SERVER
app.listen(PORT, () =>
  console.log(`The server is running @ http;//localhost:${PORT}`)
);
console.log(`server is running`);
