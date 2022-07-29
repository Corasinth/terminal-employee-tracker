//=============== Imports ===============
const actionFunctions = require ('./utils/actionFunctions.js');
const inquirer = require('inquirer');

//=============== Core Questions ===============
const initialQuestions = [
    {
        type:'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View Employees', 'View Employees by Manager', 'View Employees By Department', 'View Employee Budget for a Department', 'Add a Department', 'Add a Role', 'Add an Employee', "Change an employee's role", "Change an Employee's Manager", 'Exit'],
        name: 'actionType'
    }
];

//=============== Controller Function ===============
async function questions() {
    let response = await inquirer.prompt(initialQuestions);
    //Each of the queries in query.js are called via a property of an objet in actionFunctions. This is done so that a large series of if statements or conditionals can be avoided. Instead, each function has a key named after one of the objects above, allowing the users response to server double duty for calling the associated function. While that object is quite large, the logic for each action is at least self contained, and the function call below is extremely flexible if one wishes to add more options. Async await also allows the core questions to be looped at the appropriate time. 
    await actionFunctions[response.actionType]();
    questions();
}

questions()

