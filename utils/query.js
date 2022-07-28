const sql = require('mysql2')

const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'

    },
    console.log('Connected to employee_db!')
);

