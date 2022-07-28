const {viewDepartments, viewRoles, viewEmployeesByTitle, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole} = require ('./utils/query.js');
const inquirer = require('inquirer')

// viewDepartments();
// viewRoles();
// viewEmployeesByTitle();
// viewEmployeesByManager();
// viewEmployeesByDepartment();

// viewDepartments();
// addDepartment('Spell Development')
// viewDepartments();
// viewRoles();
// addRole(['Wizard', 1000000, 11])
// viewRoles();
addEmployee(['Zertex', 'Sand', '114', 1011])
viewEmployeesByTitle();
// viewEmployeesByTitle();
// updateEmployeeRole()
// viewEmployeesByTitle();