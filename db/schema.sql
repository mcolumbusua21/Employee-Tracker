DROP DATABASE IF EXISTS employee_connectionDB;

CREATE DATABASE employee_connectionDB;

USE employee_connectionDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  names VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  salary INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roles_id) REFERENCES roles(roles_id)
);

SELECT * FROM  department;
SELECT * FROM  roles;
SELECT * FROM  employee;

SELECT names, firstName, lastName, title, department_id, salary, roles_id
FROM employee JOIN roles ON employee.role_id=roles.id JOIN department ON roles.department_id=department.id;
