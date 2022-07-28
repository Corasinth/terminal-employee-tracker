INSERT INTO departments (department_name)
VALUES
('Administration'),
('Finance'),
('Legal'),
('Human Resources'),
('Research & Development'),
('Maintenance'),
('Marketing'),
('Information Technology'),
('Quality'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 80000, 1), 
('Engineer', 100000, 5), 
('Vice President', 150000, 1),
('Intern',30000, NULL),
('Secretary', 40000, 1),
('Janitor', 40000, 6),
('Accountant', 60000, 2),
('HR Representative', 60000, 4),
('Researcher', 70000, 5),
('Customer Service',60000, 7),
('IT Professional', 50000, 8),
('Inspector', 90000, 9),
('Software Engineer', 100000, 5),
('Salesperson', 60000, 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
Values
('Michael', 'Scott', 100, 1011),
('Dwight', 'Schrute', 113, 1000),
('Jim', 'Halpert', 113, 1000),
('Pam', 'Beasely', 104, 1000),
('Angela', 'Martin', 106, 1000),
('Creed', 'Bratton', 111, 1000),
('Toby', 'Flenderson', 107, 1000),
('Ryan', 'Howard', 103, 1000),
('Stanley', 'Hudson', 113, 1000),
('Mose', 'Schrute', 101, 1000),
('Kelly', 'Kapoor', 109, 1000),
('Jan', 'Levinson-Gould', 109, 1012),
('David', 'Wallace', 100, NULL);

-- SELECT employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.department_name
-- FROM employees
-- LEFT JOIN roles ON employees.role_id = roles.id
-- LEFT JOIN departments ON departments.id = department_id
-- ORDER BY roles.title;