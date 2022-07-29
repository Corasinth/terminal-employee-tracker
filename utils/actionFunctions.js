const inquirer = require('inquirer')
const {viewDepartments, viewRoles, viewEmployees, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewTotalBudget, getEmployeeList, getManagers} = require ('./query')


const actionFunctions = {
  'View All Departments': viewDepartments,
  'View All Roles': viewRoles,
  'View Employees': viewEmployees,
  'View Employees by Manager': async () => {
    let choicesArr = await getManagers();
    let response = await inquirer.prompt([
    {
        type: 'list',
        message: 'Please choose a manager:',
        choices: choicesArr,
        name: 'managerList'
    }
  ])
  console.log(choicesArr[response.managerList])
  viewEmployeesByManager(choicesArr[response.managerList])
},
  //code
  'View Employees By Department': viewEmployeesByDepartment,
  //code
  'View Employee Budget for a Department': viewTotalBudget,
  //code
  'Add a Department': addDepartment,
  //code
  'Add a Role': addRole,
  //code
  'Add an Employee': addEmployee,
  //code
  "Change an employee's role": updateEmployeeRole,
  //code
  "Change an employee's manager": updateEmployeeManager,
  //code 
}


module.exports = actionFunctions