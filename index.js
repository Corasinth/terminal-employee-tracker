const actionFunctions = require ('./utils/actionFunctions.js');
const inquirer = require('inquirer');

const initialQuestions = [
    {
        type:'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View Employees', 'View Employees by Manager', 'View Employees By Department', 'View Employee Budget for a Department', 'Add a Department', 'Add a Role', 'Add an Employee', "Change an employee's role", "Change an Employee's Manager", 'Exit'],
        name: 'actionType'
    }
];

async function questions() {
    let response = await inquirer.prompt(initialQuestions);
    await actionFunctions[response.actionType]();
    questions();
}

questions()

