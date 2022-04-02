const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zerodown',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySql Connected!');
});


module.exports = connection;