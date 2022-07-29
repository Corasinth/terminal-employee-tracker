const inquirer = require('inquirer')
const {viewDepartments, viewRoles, viewEmployees, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewTotalBudget, getEmployeeList, getManagers} = require ('./query')


const actionFunctions = {
  'View All Departments': async () => await viewDepartments(),
  'View All Roles': async () => await viewRoles(),
  'View Employees': async () => await viewEmployees(),
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
  await viewEmployeesByManager(choicesArr[response.managerList])
},
//   'View Employees By Department': viewEmployeesByDepartment,
    'View Employee Budget for a Department': async () => {
    let departmentList = await viewDepartments(true)
    let response = await inquirer.prompt([
        {
            type: 'list',
            message: 'Please select an department:',
            name: 'department',
            choices: departmentList
        }
    ]);
    await viewTotalBudget([departmentList[response.department]]);
},
    'Add a Department': async () => {
        let response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new department:',
                name: 'name'
            },
        ])
        await addDepartment([response.name])
    },
    'Add a Role': async () => {
        let departments = await viewDepartments(true)
        let response = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the title of the new role:',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Please enter the salary of the new role:',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Please select the department the new role falls under:',
                choices: departments,
                name: 'department'
            }
        ])
        await addRole([response.title, response.salary, departments[response.department]])
    },
    'Add an Employee': async () => {
        let roleList = await viewRoles(true);
        let managerList = await getManagers()
        let response = await inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: roleList
            },
            {
                type: 'list',
                message: "Who is the empployee's manager?",
                name: 'manager',
                choices: managerList
            },
        ])
        await addEmployee([response.firstName, response.lastName, roleList[response.role], managerList[response.manager]])
    },
    "Change an employee's role": async () => {
        let employeeList = await getEmployeeList()
        let roleList = await viewRoles(true)
        let response = await inquirer.prompt([
            {
                type: 'list',
                message: 'Please select an employee to update:',
                name: 'employeeList',
                choices: employeeList
            },
            {
                type: 'list',
                message: 'Please select their new role:',
                name: 'newRole',
                choices: roleList
            },
        ])
        await updateEmployeeRole([roleList[response.newRole], employeeList[response.employeeList]])
    },
    "Change an Employee's Manager": async () => {
        let employeeList = await getEmployeeList()
        let managerList = await getManagers()
        let response = await inquirer.prompt([
            {
                type: 'list',
                message: 'Please select an employee to update:',
                name: 'employeeList',
                choices: employeeList
            },
            {
                type: 'list',
                message: 'Please select their new manager:',
                name: 'manager',
                choices: managerList
            },
        ])
        await updateEmployeeManager([managerList[response.manager], employeeList[response.employeeList]])
    }
}

module.exports = actionFunctions