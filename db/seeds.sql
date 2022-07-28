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
('Attorney', 150000, 3),
('Intern',30000, NULL),
('Secretary', 40000, 1),
('Janitor', 40000, 6),
('Accountant', 60000, 2),
('HR Representative', 60000, 4),
('Researcher', 70000, 5),
('Advertiser',60000, 7),
('IT Professional', 50000, 8),
('Inspector', 90000, 9),
('Software Engineer', 100000, 5),
('Salesperson', 60000, 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
Values
('Sheev', 'Palpatine', 100, NULL);
