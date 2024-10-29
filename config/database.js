// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('test_schema','test','riyadradoan',{
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mysql'
// });

// module.exports.connect = sequelize;


const mysql = require('mysql2/promise');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your database host
  user: 'test',       // Replace with your MySQL username
  password: 'riyadradoan', // Replace with your MySQL password
  database: 'test_schema'  // Replace with your database name
});

// Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database: ', err.stack);
//     return;
//   }
//   console.log('Connected to the MySQL database as id ' + connection.threadId);
// });

module.exports = connection;