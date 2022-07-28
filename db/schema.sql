DROP DATABASE If EXISTS employee_db;
CREATE DATABASE ;    

USE employee_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30), 
    last_name VARCHAR (30),
    role_id INT NOT NULL,
    manager_id INT
    FOREIGN KEY role_id
    REFERENCES roles(id)
    ON DELETE SET NULL
);
ALTER TABLE employees AUTO_INCREMENT = 1000;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY department_id
    REFERENCES departments(id)
    ON DELETE SET NULL
);
ALTER TABLE roles AUTO_INCREMENT = 10; 

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR (30),
);
ALTER TABLE departments AUTO_INCREMENT = 1;

