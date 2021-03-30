USE employee_connectionDB;

INSERT INTO department (names)
VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 60000, 1), ("Salesperson", 40000, 1),
 ("Accountant", 60000, 2), ("Account Manager", 85000, 2),
 ("Software Engineer", 50000, 3), ("Lead Engineer", 80000, 3),
 ("Legal Team Lead", 90000, 4), ("Lawyer", 75000, 4);

INSERT INTO employee (firstName, lastName, roles_id)
VALUES ("Mark", "Columbus", 3), ("Tyler", "Moore", 3),
("Lauren", "Graner", 2), ("Todd", "Phillips", 2),
("Megan", "George", 1), ("Kate", "Kirwan", 4);