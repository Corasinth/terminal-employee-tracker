const {viewDepartments, viewRoles, viewEmployeesByTitle, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole} = require ('./utils/query.js');
const inquirer = require('inquirer')

viewDepartments();
viewRoles();
viewEmployeesByTitle();
viewEmployeesByManager();
viewEmployeesByDepartment();

// addDepartment()
// addRole()
// addEmployee()
// updateEmployeeRole()