// var mysql =require("mysql");
// var con=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"Vehicle Care"
// });
// con.connect(function(error){
//     if(error)throw error;
//     console.log("connected");
//     con.query("select * from user",function(error,result){
//         if(error)throw error;
//         console.log(result[0]);
//     });

// });
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle care'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Care API');
});

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single user by UserID
app.get('/users/:UserID', (req, res) => {
    const sql = 'SELECT * FROM user WHERE UserID = ?';
    db.query(sql, [req.params.UserID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add a new user

app.post('/users', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO user (UserID, `User Name`, Email, Password) VALUES (?, ?, ?, ?)';
    db.query(sql, [newUser.UserID, newUser['User Name'], newUser.Email, newUser.Password], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// Update a user by UserID
app.put('/users/:UserID', (req, res) => {
    const updatedUser = req.body;
    const sql = 'UPDATE user SET `User Name` = ?, Email = ?, Password = ? WHERE UserID = ?';
    db.query(sql, [updatedUser['User Name'], updatedUser.Email, updatedUser.Password, req.params.UserID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Delete a user by UserID
app.delete('/users/:UserID', (req, res) => {
    const sql = 'DELETE FROM user WHERE UserID = ?';
    db.query(sql, [req.params.UserID], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(port,"0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});

module.exports = db;



