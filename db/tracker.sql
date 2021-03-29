DROP DATABASE IF EXISTS employee_connetionDB;

CREATE DATABASE employee_connetionDB;

USE employee_connetionDB;

CREATE TABLE tracker (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  roles VARCHAR(30) NULL,
  employee VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);