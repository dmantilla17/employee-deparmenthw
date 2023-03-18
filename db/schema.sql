DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE role(
    id INT NOT NULL,
    title VARCHAR(100),
    salary DECIMAL,
    FOREIGN KEY(department),
    REFERENCES department(id)
    ON DELETE SET NULL
);
CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY(role),
    REFERENCES role(id)
    ON DELETE SET NULL
);